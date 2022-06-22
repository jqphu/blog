---
title: How Uniswap Leverages Atomicity in the EVM 
date: 2022-06-21 16:33 
layout: PostLayout
tags: ['ethereum', 'uniswap', 'evm']
summary: "Exploring the atomic nature of transactions in the EVM and how Uniswap leverages this in their designs"
---

The EVM has a unique property that transactions are completely atomic.
They either complete their execution entirely or fail with no side-effects.

This simplistic programming model was quite refreshing when compared to working on an operating system where there are threads running everywhere touching data left and right!

[UniswapV2](https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol) leverages this atomic nature of transactions to produce an interesting design pattern.
The pattern boils down to ignoring how funds enter the contract, i.e. the start condition, but just ensure the invariants of the contract is upheld.

Let's understand this by exploring `mint` and `swap` in UniswapV2.

# A Short Primer
Uniswap is a decentralized exchange.
That is, you can swap `token0`  for `token1` at a certain rate.
To facilitate this functionality, there needs to be liquidity in the form of `token0` and `token1` stored in the contract.

## Mint
Liquidity can be added through `mint` which takes the deposited tokens and returns some liquidity tokens representing proportional ownership of the pool.
All we need to understand at this point is you put in `token0` and `token1` then some math happens and you get out some liquidity tokens.
The invariant that needs to be upheld is the ratio of `token0:token1` must remain the same.

## Swap
The `swap` function allows you to convert between `token0` and `token1`.
It needs to always uphold the invariant that `token0 * token1 = k` where `k` is some constant.

However, we are more interested in another piece of functionality `swap` provides which are flash loans.
Flash loans are a type of loan where you don't need to put up **any collateral**. This is possible since they expect you to return the funds by the end of a transaction.

# Mint
We'll start by exploring how `mint` works.

## Naive Approach

Let's build up a simple approach.

Starting with a simple function signature that takes the amount `token0` and `token1` we want to deposit.

```solidity
function mint(uint token0, uint token1) external {
}
```

The deposited tokens must maintain the ratio of `token0`:`token1`.
Let's check the proportions are correct.[^1]

```solidity
/// @notice Storage variable tracking the recorded amount of token0/token1
///   currently in the contract.
uint token0Reserve;
uint token1Reserve;

function mint(uint token0, uint token1) external {
  require(token0Reserve / token1Reserve == token0 / token1);
}
```

Wait... there's a problem.
Between the time I submitted this transaction and it being executed, the proportions could have changed!

Let's just use up as much of `token0` as we can even if that means we don't use up all of `token0` or `token1`.
We define a function `getValidProportion` which will do exactly that.
After it runs `token0ToDepost <= token0` and `token1ToDeposit <= token1`.

```solidity
function mint(uint token0, uint token1) external {
  (uint token0ToDeposit, uint token1ToDeposit) =
    getValidProportion(token0, token1);
}
```

Great, now we need to actually bring in the funds.

```solidity
function mint(uint token0, uint token1) external {
  (uint token0ToDeposit, uint token1ToDeposit) =
    getValidProportion(token0, token1);

  IERC20(addrToken0).safeTransfer(msg.sender, addr(this), token0ToDeposit);
  IERC20(addrToken1).safeTransfer(msg.sender, addr(this), token1ToDeposit);
}
```

Hmm, what happens if someone directly deposited their token into this contract without calling `mint`.

Let's not let those funds go to waste and treat it as if it came from this lucky minter!

```solidity
/// @notice Storage variable tracking the recorded amount of token0 deposited.
uint token0Reserve;
uint token1Reserve;

function mint(uint token0, uint token1) external {
  uint currentBalance0 = IERC20(addrToken0).balanceOf(address(this))
  uint currentBalance1 = IERC20(addrToken1).balanceOf(address(this))

  uint additionalToken0 = currentBalance0 - token0Reserve;
  uint additionalToken1 = currentBalance1 - token1Reserve;
  
  uint token0ToDeposit, uint token1ToDeposit) =
   getValidProportion(token0 + additionalToken0, token1 + additionalToken1);

  IERC20(addrToken0).safeTransfer(msg.sender, address(this), token0ToDeposit);
  IERC20(addrToken1).safeTransfer(msg.sender, address(this), token1ToDeposit);
  
  _computeAndMintLiquidity(msg.sender, token0ToDeposit, token1ToDeposit);
}
```

Done!

## UniswapV2 Mint (abridged version)

In Uniswap the function signature is simply:

```solidity
function mint() external {

}
```

Looking at this the first time would have been alarming!
There is no protection against the `mint` call.
Anyone can mint liquidity tokens.

Uniswap expects tokens to be transferred into the contract **before** the `mint` function is called.
It then uses these funds to `mint` the liquidity.

```solidity
function mint() external {
  uint token0 = IERC20(addrToken0).balanceOf(address(this)) - token0Reserve;
  uint token1 = IERC20(addrToken1).balanceOf(address(this)) - token1Reserve;
}
```

Let's make sure the ratio is correct and mint the liquidity.

```solidity
function mint() external {
  uint token0 = IERC20(addrToken0).balanceOf(address(this)) - token0Reserve;
  uint token1 = IERC20(addrToken1).balanceOf(address(this)) - token1Reserve;
  
  (uint token0ToDeposit, uint token1ToDeposit) = getValidProportion(token0, token1);
  
  _computeAndMintLiquidity(msg.sender, token0ToDeposit, token1ToDeposit);
}
```

The additional tokens left over are kept in the contract as a donation :).

## Why is this safe?

Uniswap relies on the depositing of funds and calling `mint` to happen atomically.
If transactions weren't atomic, someone could call `mint` in-between us depositing funds and calling `mint` ourselves!

## Why do this?

This simplifies the logic.
Uniswap no longer cares who transfers the tokens.
It could come from many different contracts in the same transaction!
As long as it's in the contract, it will use it to mint liquidity.

This also makes it much easier to audit and check for validity.
There are less cases to handle.

# Swap and Flash Loans

Another nice feature of the EVM that Uniswap leverages is that if the transaction does not succeed, it reverts all the state as if nothing happened.

Uniswap leverages this to provide flash loans.

The signature leverages the pattern seen in `mint` by assuming the tokens have been transferred in before the call.

```solidity
function swap(uint token0Out, uint token1Out, address to, bytes calldata data) external {
}
```

Ignoring basic checks, Uniswap just transfers the tokens out!

```solidity
function swap(uint token0Out, uint token1Out, address to, bytes calldata data)
  external
{
  if (token0Out > 0) _safeTransfer(addrToken0, to, token0Out);
  if (token1Out > 0) _safeTransfer(addrToken1, to, amount1Out);
}
```

These could be millions of tokens!

After transferring the tokens out, it calls into the user code to do something with said tokens.
This could be doing something like an arbitrage.

```solidity
function swap(uint token0Out, uint token1Out, address to, bytes calldata data)
external
{
  if (token0Out > 0) _safeTransfer(addrToken0, to, token0Out);
  if (token1Out > 0) _safeTransfer(addrToken1, to, amount1Out);
  if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, token0Out, token1Out, data);
}
```

Now we've just sent all the tokens out and let the caller use it.

Uniswap checks the invariant to ensure the tokens (or the correct proportion of the tokens) were returned.

```solidity
function swap(uint token0Out, uint token1Out, address to, bytes calldata data)
external
{
  if (token0Out > 0) _safeTransfer(addrToken0, to, token0Out);
  if (token1Out > 0) _safeTransfer(addrToken1, to, amount1Out);
  if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, token0Out, token1Out, data);

  uint newToken0Reserve = IERC20(addrToken0).balanceOf(address(this));
  uint newToken1Reserve = IERC20(addrToken1).balanceOf(address(this));

  // Check the invariant.
  require(newToken0Reserve * newToken1Reserve >= token0Reserve * token1Reserve);
}
```

If the invariant was not upheld, then **everything gets reverted**.
This is why we can be so "careless" with the funds and simply transfer them out.

Atomicity vastly simplifies the programming model of the EVM.
It leads to some design patterns which are not possible in other systems.

[^1]: There are rounding errors here but for ease of readability we'll keep it as is. This will be common throughout the entire post :P.
