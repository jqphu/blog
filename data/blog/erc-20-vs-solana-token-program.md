---
title: ERC-20 vs Solana Token Program
date: 2022-01-17 12:25:30
layout: PostLayout
tags: ['solana', 'ethereum', 'token', 'fungible']
summary: "Exploring the differences between the approaches of implementing fungible tokens in Ethereum and
Solana"
---

<TOCInline toc={props.toc} asDisclosure />

# ERC-20 vs Solana Token Program

Ethereum and Solana both allow you to create your own fungible tokens, however, they are implemented
in different ways. Ethereum fungible tokens follow the typically follow the [ERC-20
standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) whereas Solana tokens
interact with the [Solana Token Program](https://spl.solana.com/token). So, what's the difference?

## ERC-20

### Outline

ERC-20 is a **standard[^1]**. This means it's an agreed upon set of APIs that smart contracts should
implement in order to quality as a "token". There's a set of methods and events that need to be
implemented and a specification on what needs to be done. However, it is completely up to the
developer to implement this specification.

### Developer Perspective

In order to create a token, you need to deploy a smart contract following the standard. In order to
prevent errors doing this manually, the recommended approach is using a library such as
[OpenZeppelin](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) that implements most of
the boilerplate logic for you.

OpenZeppelin is the most popular choice but different implementations can be used with different
trade-offs between gas efficiency and security. Alternatively, you can hand write the implementation
if you need to do something special.

### Decentralized Application (DAPP) Perspective

From a decentralized application perspective the application can interact with smart contracts that
implement the ERC-20 standard. For example, [uniswap](https://uniswap.org/) is a decentralized
exchange which allows you to trade one token from another. It accepts all tokens that support the
ERC-20 standard. It understands the APIs such as `transfer` so can work entirely using the
interface.

## Solana

### Outline

Solana Token Program is a **specific deployed smart contract**. The code is open source and
maintained by Solana Labs. In Solana, only accounts have data. Therefore, the token program is
simply code to be executed.

### Developer Perspective

In order to create a token, a developer simply needs to interact with the Solana Token Program
contract. The developer first creates a Mint account owned by the smart contract. This account's
address is the unique identifier for the token. In order to mint tokens the developer provides the
account and calls into the Token Program to execute the minting. Doing things like transferring is
simply providing the unique token addresses, the corresponding accounts and calling the contract
code.

### Decentralized Application (DAPP) Perspective

Since using the Solana Token Program is *the* way to create tokens. Decentralised applications
simply communicate with the contract. For example, a decentralised exchange would take an address
representing the Mint account owned by the Solana Token Program. It would then call into the solana
token program to transfer on behalf of the caller.

## Comparison

The primary difference between the approaches are using a standard versus a concrete contract and
implementation.

### Security

The Solana Token Program has one single source of truth. This means auditors only need to read
through a single contract. Any errors in this smart contract will affect *every* token.

Ethereum uses a standards approach. Therefore, each smart contract deployed may be separate and has
to be audited manually. However, a majority of contract use pre-audited libraries such as
OpenZepplin to ensure their validity. However, as a user you don't easily know if a piece of code
has used OpenZepplin or manually written the implementation. It can be checked if the code has been
uploaded and verified but this is tricky for an everyday consumer.

In terms of security of a critical component, the Solana approach wins. Users can trust it's
validity without being worried about a developer not implementing the contract correctly resulting
in
[vulnerabilities](https://www.theblockcrypto.com/post/112339/creative-attacker-steals-76000-in-rune-by-giving-out-free-tokens).

### Flexibility

The Solana Token Program cannot be easily modified by an individual developer. If I thought of a
more gas efficient mechanism to do a transfer, or I wanted to do some unique logic I would not be
able to do so. In theory, nothing stops a developer from writing their own version of the Solana
Token Program. However, this will prohibit them from leveraging the wider ecosystem such as
decentralized exchanges. These DEX's assume the Solana Token Program is the source of truth.

Ethereum on the other had is simply a standard. In programming terms, it's an interface whereas
Solana Token Program is a concrete implementation. It allows you to play with the implementation
(say to increase security, or improve gas efficiency) but still being able to participate in the
ecosystem. Furthermore, since it's simply an interface a smart contract can extend the interface.
The OpenZepplin implementation has a varity of
[extensions](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#extensions) such as capping
the supply.

In terms of flexibility for the developer, the Ethereum approach wins. It allows developers to tweak
the contract in ways that suits them best but still participate in the ecosystem.

### Deployment and Iteration Speed

For the Solana Token Program, developers can quickly address critical vulnerabilities or add new
APIs. In Ethereum, OpenZepplin can patch a critical vulnerability but it is up to contract owners to
ensure they deploy a new contract (assuming they used the [proxy upgrade
pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies) to allow upgrades of their
contract). Furthermore, ERC-20 is a standard and it requires a majority of individuals to agree on a
direction and all uniformly upgrade their contracts. This is usually near impossible so instead new
proposals are born such as [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) and DAPPs are the
ones that choose which proposals they support (potentially being both).

A downside to Solana Token Program is since they are the source of truth they *must* maintain
backwards compatibility at all times. Unlike in Ethereum where a single smart contract can
experiment with its implementation the Solana Token Program cannot. It is an all or nothing
approach.

## Why do they differ?

Solana could have simply deployed the Solana Token Program as a library and provided a set of
interfaces. Ethereum *could*, although very unnatural, have deployed a Token Program contract that
was purely code execution and took other smart contracts to provide data.

I could rationalize this by saying Solana and Ethereum took different approach due to their
separation of data and execution models. I could also say they differ due to their philosophy as
Ethereum's approach is more decentralized.

However, I think the simplest explanation is Ethereum came first and individuals wrote the smart
contract in a natural way (storing state in the contract, and exposing a set of APIs). There was a
desire to standardize and thus ERC-20 was born. With Solana, it would have been known from the
get-go that a token program was needed so the Solana Token Program popped up right form the start.
Providing it as a standard and a library would provide unnecessary complexity in a space where
moving fast was critical.

There are subtle differences in the two approaches that are practically invisible to an end user.
However, to a developer deciding something more complex than a simple token on Ethereum or Solana,
the differences are important to note.

[^1]: The original [standardized contract proposal also contained standards for exchanges,
  registries and data feeds. Only the token standard has seemed to catch on.
