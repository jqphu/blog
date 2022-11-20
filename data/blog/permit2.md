---
title: Uniswap Permit2
date: 2022-11-19 12:33 
layout: PostLayout
tags: ['ethereum', 'uniswap', 'evm']
summary: "Exploring the rationale behind the Uniswap Permit2 contract"
---

Uniswap just released [Permit2](https://uniswap.org/blog/permit2-and-universal-router#how-permit2-improves-ux) which provides a more unified and featureful way to give applications access to your tokens. In this blog, we'll start with token approvals and why they're needed and end with what Permit2 now allows us to do!
## Token Approvals
Token approvals are used to give smart contracts control over your tokens.

A simple example is say you wanted to buy an NFT with WETH.
The marketplace needs to be able to withdraw your WETH and give you the NFT in return.
You need to give a token approval to the marketplace control such that it can withdraw your WETH.

You can either give the marketplace approval for a certain amount of WETH (e.g. just enough to do the transaction).
However, this requires a transaction and gas everytime you just want to buy anything.
Instead, we typically just give an unlimited allowance.
This means the smart contract has access to **all of your token**.
If something bad were to happen, all of your tokens would be at risk.

Thus, you could either:
* Stay secure but pay additional gas every transaction by doing a limited approval.
* Save gas but lose some security by giving a contract unlimited access to your tokens.

## Permit1 e.g. EIP2612

[EIP-2612](https://eips.ethereum.org/EIPS/eip-2612) was an extension which attempted to solve the downsides listed above.

Specifically, now you could **sign a message** to give a contract access to your tokens.

Thus, in the case of purchasing an NFT.
You could give the marketplace a signature to use the **exact amount** needed to buy the NFT.
This would cost you no gas.
Then, you would initiate a transaction to do the purchase and the contract would use the signature to prove it is allowed to take control of your tokens.

This is now safer, as you only give control for the required amount of tokens, but also doesn't cost any more gas!
As an added benefit, EIP-2612 includes an expiry so gives you time control over your approvals. Nice!

EIP-2612 seems to solve all of our problems but leaves one key thing out - it is a new standard and thus cannot be applied to prior tokens!

## Permit2 Uniswap Contract
Permit2 is not a standard but rather just a smart contract that aims to solve the major problem of compatibility with older ERC20 tokens.

The way it does this is quite simple.
It requires users to give an unlimited allowance to the Permit2 contract.
Then the Permit2 contract controls giving out the allowance to other smart contracts.
This effectively delegates the approval logic from the token contract to the Permit2 contract.

The major benefit here is now old tokens can gain access to an EIP2612 style interface without changing their code!

So what's the catch?
The major catch is you are now giving unlimited approvals to a single contract.
If there is **any** vulnerability in this contract, all your tokens can now be taken.
Compared with the older method where a vulnerability in the implementation would affect only the one token.

That said, the Permit2 contract is completely ownerless and non-upgradable.
The Uniswap team have a fantastic track record of implementing robust smart contracts.
Only time will tell but the contract is fairly straightforward so I suspect there will be a limited amount of vulnerabilities.

## Permit2 Bonus Features
One additional feature with Permit2 is it enables batched approvals/revoking.
If you suspect you gave someone token approvals that you didn't intend to, it requires one transaction to revoke all your token approvals and one transaction to reinstate them once you're sure you're safe.

Permit2 also works well with the current approval mechanism.
The transfer function it provides attempts a regular transfer (using the approvals based in the contract itself).
Only if that transfer fails it falls back to checking the permit approval.
This should make opting into to Permit2 not cost much more gas.

## Summary

Permit2 is a great release by Uniswap Labs which should improve the security and gas efficiency of token approvals. I look forward to seeing them expand this not just for ERC20 tokens but for NFTs too!
