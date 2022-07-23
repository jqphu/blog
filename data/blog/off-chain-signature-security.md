---
title: Off-chain Signature Security
date: 2022-07-23 16:30 
layout: PostLayout
tags: ['ethereum', 'signing', 'off-chain']
summary: "Exploring the different type of off-chain signatures and their attack vectors."
---

Signing data is a fundamental piece of crypto to ensure you've approved a given action.
However, there are some signatures that are safe to call, otherwise which could result in you losing all your assets!

In this post, we're going to dig into off-chain signatures.
Which ones are safe and which ones to never sign.

We'll be focusing on the methods that [MetaMask exposes](https://docs.metamask.io/guide/signing-data.html#signing-data-with-metamask).

# Signatures Primer

Let's look into the flow of a regular transaction.

In order to do something in crypto you need to craft a transaction.
This is just a blob of data that says what you want to do.

To ensure people can't impersonate you, you have to sign this piece of data[^1].

This is what happens when you press `Confirm` in MetaMask.
It will sign the data.

![Regular Metamask Transaction](/static/images/blog/2022-07-23-images/regular_transaction.png)

Once signed, MetaMask will broadcast this so it can get included in a block.
As soon as you confirm, you can't take it back.
Just like a regular signature - signing is binding.

# Off-chain Signing

Off-chain signing (also known as gasless signatures) are signatures that may not be broadcasted immediately or at all. 
This is typically used when you need to sign a message to prove ownership over a address.

![PersonalSign MetaMask](/static/images/blog/2022-07-23-images/personal_sign.png)

MetaMask provides three different methods to sign data that you may encounter.

1. `eth_sign`
2. `personal_sign`
3. `signTypedData.*`

Let's dig into each of these.

## `eth_sign`

Action: **Never ever ever sign this. If you have to (due to legacy reasons) triple check you're interacting with the right contracts and websites.**

Common use case: Draining your wallet :)

Example:
![EthSign MetaMask](/static/images/blog/2022-07-23-images/eth_sign.png)

This is an incredibly dangerous call that is left in due to legacy reasons.
It allows you to sign an arbitrary data.

Going back to the signatures primer, when you press confirm MetaMask asks you to sign the transaction then broadcasts it.
`eth_sign` is a mechanism to get you to sign any transaction.
Once you've signed it, you've approved it and the attack and submit it whenever you want.

The huge issue here is it's just a bunch of garbage hex.
That hex could do anything from drain your wallet, take your NFTs, etc.
Theres no revoking you can do after you've signed the message.
A signature here is binding.

The good news is MetaMask provides a very scary warning indicating you should really not call this method.
Ideally, this method gets phased out entirely but compatibility reasons are painful.

## `personal_sign`

Action: **Safe to sign freely.**

Common use case: Proving ownership over a wallet e.g. login.

Example:
![PersonalSign MetaMask](/static/images/blog/2022-07-23-images/personal_sign.png)

The second method is one you've likely seen before.
It is almost like `eth_sign` but with two important difference.

The most important difference is `personal_sign`  prefixes the content you're going to sign with 
`"\x19Ethereum Signed Message:\n" + len(message)"`.

This little difference means **no matter what you sign, it cannot be used as a transaction**.
Unlike `eth_sign` this message cannot be used as a transaction.
It cannot be used to transfer ether, approve NFTs or interact with smart contracts. 
It should be able to be used to change any blockchain state [^2].

The second difference is the text you're signing should be ascii i.e. plain text.
You should be able to read the message you're signing.
If you see some basic ascii message, it is safe to sign.

## `signedTypedData.*`
Action: **Make sure you know what you're signing and it is the correct website.**

Common use case: OpenSea Bids, Gnosis Safe Transactions, Token Permits.

Example: Here is an OpenSea Bid on a collection

![SignTypedData MetaMask](/static/images/blog/2022-07-23-images/signTypedData.png)

We mentioned `personal_sign` was great for a human readable message.
However, if you need to have the message be used with smart contracts it is expensive to parse on-chain.

### Motivation For Off-chain Signed Messages with Smart Contracts 

Before we explore `signedTypedData` let's motivate why we want to use off-chain signed messages with smart contracts.

Consider the OpenSea Bid example.

We could store every bid on-chain in the smart contract but nothing happens unless the bid is accepted.
This is a waste of gas.
Instead, OpenSea requests you to sign a bid.
When the seller accepts the bid, your signed bid is sent on-chain to be executed.
This means you only pay gas when your bid is successful.

Another example is GnosisSafe.

GnosisSafe requires multiple people to sign for a transaction to be approved.
Again, we could send each transaction on-chain one-by-one costing gas each time.
Instead, GnosisSafe stores all the signed messages and submits them at once at the time of execution.
This makes it much cheaper!

### Structured Data Signing (EIP-712)

[EIP-712](https://eips.ethereum.org/EIPS/eip-712) was created to efficiently use signed messages on-chain.
This is the standard that is followed when calling `signTypedData.*`[^3]
We'll skip the details but it is efficient to parse and is *somewhat* human readable.

An important note is a `personal_sign`'d message cannot be substituted for a message following the EIP-712 format as the personal signed message starts with `\x19Ethereum` and the EIP-721 signed message starts with `\x19\x01`.
Therefore, you're safe to sign any `personal_sign` message without fear.

### Dangers of Off-chain Signatures
As we see in the OpenSea example, an typed signature **can change blockchain state**.
The good news is it cannot do general things such as transfer your eth.
A signature is isolated to the contract that uses it.

A message signed for OpenSea can only be used with the OpenSea contract.

An example of an attack is an attacker can craft a message that causes you to bid on a garbage NFT for all your ETH.
This attack is very difficult to spot, since although the message is intended to be somewhat human readable it is tricky to parse.

When signing these transactions you need to double check you're signing for the right website and message.

## Summary
The takeaways are:
* `eth_sign` aka the signature that triggers the big red warning should be avoided at all costs!
* `personal_sign` aka the signature that looks like human readable text is safe.
* `signedTypedData` aka the signature that doesn't just look like a regular message should be handled with care.

[@PocketUniverseZ](https://twitter.com/PocketUniverseZ) will soon be supporting off-chain signatures to help guide you through the different signature types.

[^1]: You really sign the hash of the transaction.
[^2]: In theory, a smart contract can take a personal sign message and do something with it. This would be isolated to that specific smart contract. It would be a huge red flag to see it being used in this way though.
[^3]: There are multiple functions in MetaMask since the standard evolved over time.
