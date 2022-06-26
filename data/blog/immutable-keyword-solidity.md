---
title: Why `immutable` variables don't take up storage space
date: 2022-06-26 12:24
layout: PostLayout
tags: ['ethereum', 'solidity', 'evm']
summary: "Explaining why `immutable` does not take up any storage space and is just as cheap as a constant during deployment. We'll dig into the bytecode."
---

`immutable` is the keyword for variables in Solidity that are assigned during construction time once and are never changed afterwards.

When I first saw this keyword, I just assumed it was equivalent to a `const` member in C++.
That is, it's just syntactic sugar to ensure I don't accidentally write to this variable.

```cpp
class A {
    const int _member;
    A(int member) : _member(member) {}

};

// Still takes up space in the ABI
static_assert(sizeof(A) == sizeof(int));
```

I guessed that it would just be stored as a regular storage variable in memory.
However, I was wrong!
Variables assigned to `immutable` in Solidity do not take up storage space.

This is important due to how expensive reading storage is in the EVM.

To understand how `immutable` keyword avoids using storage we'll be looking at two smart contracts with the only difference being a member variable with the `immutable` keyword.

```solidity
contract NotImmutable {
  uint value;

  constructor(uint _value) {
    value = _value;
  }

  function getValue() public view returns (uint) {
    return value;
  }
}
```

```diff
-contract NotImmutable {
+contract Immutable {
-  uint value;
+  uint immutable value;

  constructor(uint _value) {
    value = _value;
  }

  function getValue() public view returns (uint) {
    return value;
  }
}
```

# Conceptual Understanding

Before we dig into the bytecode, let's understand at a high level how this is possible.

When compiling Solidity code, the output you get isn't exactly the bytecode that will deployed on chain.
Instead, the output is bytecode that will be run and the return value is the actual contract.

Gilbert explains this well in his [Eth Global talk](https://www.youtube.com/watch?v=J15hxPRflUg).

In the `NotImmutable` contract this logic is super simple.
We assign the storage variable `value` to the constructor parameter `value` then return the runtime bytecode representing `NotImmutable`.

The trick is in the `Immutable` contract, we can retrieve the constructor parameter `_value` and **modify the runtime bytecode** to either return the value directly, or retrieve it from calldata.

For example, let's say the `_value` given in the constructor is 3.

We can now return the runtime bytecode representing:
```solidity
contract ModifiedContract {
  function getValue() public view returns (uint) {
    return 3;
  }
}
```

To better understand this, let's dig into the bytecode.

# Bytecode

We'll be looking at the bytecode and assmebly of both the contracts to better understand what is going on.

The assembly is generated using  `solc NotImmutable.sol --asm` and `solc Immutable.sol --asm` and bytecode generated with the `--opcode` flag.

## Constructor

The constructor is ran to set up the state of both contracts.
Here's the assembly for both contracts.

### `NotImmutable`
```asm
tag_2:
    /* "NotImmutable.sol":80:86  _value */
  dup1
    /* "NotImmutable.sol":72:77  value */
  0x00
    /* "NotImmutable.sol":72:86  value = _value */
  dup2
  swap1
  sstore
  pop
    /* "NotImmutable.sol":41:91  constructor(uint _value) {... */
  pop
    /* "NotImmutable.sol":0:167  contract NotImmutable {... */
  jump(tag_6)
```

### `Immutable`
```asm
tag_2:
    /* "NotImmutable.sol":87:93  _value */
  dup1
    /* "NotImmutable.sol":79:93  value = _value */
  0x80
  dup2
  dup2
  mstore
  pop
  pop
    /* "NotImmutable.sol":48:98  constructor(uint _value) {... */
  pop
    /* "NotImmutable.sol":0:174  contract Immutable {... */
  jump(tag_6)

```

In `NotImmutable`, we store the constructor input `value` in slot 0 as we can see by the `sstore`.
However, in `Immutable` we store the `value` member variable in memory as denoted by the `mstore`.
We store this at `0x80`.

Keep this in mind as we move to the runtime bytecode for `getValue`.

## `getValue`

Here's the assembly for `getValue`.

## `NotImmutable`
```
tag_5:
    /* "NotImmutable.sol":136:140  uint */
  0x00
    /* "NotImmutable.sol":155:160  value */
  dup1
  sload
    /* "NotImmutable.sol":148:160  return value */
  swap1
  pop
    /* "NotImmutable.sol":95:165  function getValue() public view returns (uint) {... */
  swap1
  jump	// out
    /* "#utility.yul":7:84   */
```
### `Immutable`
```
tag_5:
    /* "NotImmutable.sol":143:147  uint */
  0x00
    /* "NotImmutable.sol":162:167  value */
  immutable("0xad7c5bef027816a800da1736444fb58a807ef4c9603b7848673f7e3a68eb14a5")
    /* "NotImmutable.sol":155:167  return value */
  swap1
  pop
    /* "NotImmutable.sol":102:172  function getValue() public view returns (uint) {... */
  swap1
  jump	// out
    /* "#utility.yul":7:84   */
```

Again, the `NotImmutable` case is fairly simple.
Just read from contract storage calling `sload`.

The `immutable` case is a little more interesting.
It has this special `immutable`  assembly keyword that only the solidity compiler understands.
We can assume the string is just a hash of the member variable that should be here.

If we compare the bytecode between `NotImmutable` and `Immutable` we get.

### Difference between bytecode for `getValue`
```diff
JUMPDEST
PUSH1
0x0
- DUP1
- SLOAD
+ PUSH32
+ 0x0
SWAP1
POP
SWAP1
JUMP
```

The `NotImmutable` case reads from slot 0 of storage as expected.
The `Immutable` scenario just pushes `0x0` onto the stack?
That can't be right!
The value isn't always `0x0`.

Let's dig into the contract returning the runtime bytecode where the secret sauce comes into play.

## Runtime Bytecode Returned

Here's the bytecode for where the runtime bytecode is copied and returned.

## `NotImmutable`
```
tag_6:
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x00
  codecopy
  0x00
  return
```

## `Immutable`
```
tag_6:
  mload(0x80)
  codecopy(0x00, dataOffset(sub_0), dataSize(sub_0))
  0x00
  assignImmutable("0xad7c5bef027816a800da1736444fb58a807ef4c9603b7848673f7e3a68eb14a5")
  return(0x00, dataSize(sub_0))
```

The `NotImmutable` contract simply copies the runtime code `sub_0` into memory and returns it.
`Immutable` on the other hand, copies the code but runs this one line called `assignImmutable`.

Again, this is something only the solidity compiler understands so let's dig into the bytecode.

Here's a diff between `NotImmutable` and `Immutable` bytecode.

The added fields are for the `Immutable` bytecode.
```diff
JUMPDEST
PUSH1
- 0xB6
- DUP1
+ 0x80
+ MLOAD
+ PUSH1
+ 0xD5
PUSH2
-0xB5
+0xC0
PUSH1
0x0
CODECOPY
+ PUSH1
+ 0x0
+ PUSH1
+ 0x4B
+ ADD
+ MSTORE
+ PUSH1
+ 0xD5
PUSH1
0x0
RETURN
```

Before the `codecopy` the difference in numbers are simply due to the different bytecode lengths.
We can just ignore them.
However, the one important thing to note is in the `Immutable` bytecode we load from `0x80`.
This is where we previously stored the `value` in the constructor!

After doing the `codecopy`, `Immutable` has another chunk of bytecode.
It pushes and adds a seemingly random number  `0x0 + 0x4B = 0x4B` then stores the `value` there.
I expect (but have not verified) this to be the offset location where the constant for `PUSH32` was stored in get value.

To put it simply, this is taking the `value` member and directly modifying the bytecode for `getValue` to always return this `value` as a literal.
This eliminates the lookup to storage entirely!

## Summary

The simple takeaway here is use **immutable** whenever you can as it eliminates relatively expensive storage lookups.

How the compiler does this is generating code to modify the runtime code.
Kind of like a just in time compiler!

Pretty cool!

# Appendix  / Additional Remarks

## Optimizations
I wonder if Solidity is allowed to eliminate the `sstore` since it can see that the variable is not being used.
I know the Solidity compiler optimizers are pretty primitive but even then I wonder if the ABI even allows eliminating a storage variable.

# References
* Looking up opcodes - https://www.evm.codes/
* Immutable keyword solidity - https://docs.soliditylang.org/en/latest/contracts.html#immutable
