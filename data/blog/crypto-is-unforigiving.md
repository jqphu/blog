---
title: Crypto is Unforgiving
date: 2022-07-19 16:33 
layout: PostLayout
tags: ['blockchain', 'cyrpto', 'security', 'scams']
summary: "Crypto is an unforgiving. Scams happen everywhere yet we severly lack the tools to deal with them. Here I explore what are some low hanging fruits to improve the status quo."
---

Crypto is unforgiving.
A single slip of the finger or a slight lapse of judgement and you've lost all your assets.
There are no refunds.

120M lost due to the BadgerDAO frontend hack.
~7500 ether lost just a week ago due to a uniswap phishing attack.
Countless NFTs stolen with no recourse.

This feels like it happens every other week that we've become numb to it.
We advise everyone to educate themselves.

We expect people to know what is happening in a transaction.
Except it requires deciphering cryptic messages like `setApprovalForAll`.
You don't want to give anyone this permission... except sometimes you do.

We expect people to only click links from the official social media.
Except when the official social media gets hacked or the frontend gets compromised.

We expect people to know if a contract interaction is safe.
Except it requires understanding if the contract has been audited, does it have upgradability, etc.

It's ruthless out here and yet the tools to protect the individuals are severely limited. 

Signing a transaction in web3 should not invoke fear.
We need guardrails to help the everyday user.

Let's explore some of the vulnerabilities and potential solutions to them. 

# Transaction Clarity 

Understanding what is going to happen in your transaction should not be rocket science.

Guess what's happening in this transaction.

![Metamask Uniswap Transaction](/static/images/blog/2022-07-19-images/metamask-uniswap.png)

It's not that easy to tell that I'm swapping 0.08 WETH for USDC.

How about this one?

![Metamask Opensea Transaction](/static/images/blog/2022-07-19-images/metamask-opensea.png)

This should raise some red flags for crypto veterans.
This is approval to take all my NFTs.
This tiny change in text could be the difference between me losing my NFTs.

In both of these cases, it is incredibly hard to see what is going on.
You're relying on the frontend to display what changes should happen.

The initial Uniswap transfer text would look exactly the same if uniswap was hacked and instead triggered a transfer of 1000 WETH and got nothing back.

The fact that every transaction almost looks identical makes it easy to fall into transaction fatigue and sign everything you see.

We just need a simple way to see what happens in an interaction.
It would be way too crazy to show exactly what leaves your wallet and what comes in.
You know... something like this:

![Pocket Universe Uniswap Transaction](/static/images/blog/2022-07-19-images/pocket-universe-uniswap.png)
or like this

![Pocket Universe Opensea Transaction](/static/images/blog/2022-07-19-images/pocket-universe-opensea.png)

Here at [PocketUniverse](https://pocketuniverse.app) we built just that!
Check out this [tweet for examples](https://twitter.com/nishthenomad/status/1548592220579971073).

It no longer takes a genius to know what is happening in a transfer.

# Phishing websites
Phishing websites are huge.
We saw over 7500 ETH was lost with the uniswap phishing website just last week.

Today, our strategies to check phishing websites are insufficient.
This is by checking the url, seeing if the webpage mimics another or manual blocklists.
These are a great start but they're insufficient.
We could have an entirely legitimate looking website that requests dangerous permissions (e.g. `setApprovalForAll`).

We also maintain manual blocklists but they're **reactive**.
Once we detect them it's too late.
Funds are irreversibly lost.

Even if you don't click that don't come from the official social media accounts.

The problem is official social media's such as twitter and discord are frequently compromised e.g. [NounsDAO a month ago](https://twitter.com/cryptolycan/status/1541263212662132736).

Now let's say you're **extra** cautious.
You don't click anything but your bookmarked official links.
Then your front-end gets hacked.
BadgerDAO's front end was hacked at the end of last year.
Premint.xyz was just compromised the other day!

Even if you do **everything** correctly, you could be losing an immense amount of funds.

# Don't Trust The Frontend
So how do we protect against this.

First and foremost, use the transaction simulation we mentioned above.
It will at least cover the most obvious scams where they try to take all your assets.

To further protect the individual we need analysis at the smart contract level.

At the end of the day, we need to be sure the contract we're interacting with is correct.
We need basic features such as allowlists for contracts not websites.
Even if a certain website is compromised, the smart contract rarely changes (if the smart contract gets compromised, we have bigger issues).
Transactions to **unknown** addresses should be flagged.

However, we shouldn't stop there. 
There's low hanging fruit to check if the contract is audited, was deployed recently, how much volume has been transacted, etc.

If we do our analysis at the smart contract level, we can protect users from frontend hacks.

# Permission Manifest
Transaction simulation and smart contract analysis gets us 80% of the way.
However, I want to talk about a mechanism that could give us much further protection.

The `premint.xyz` hack was interesting.
As a quick primer, the website was hacked and started requesting the NFTs from connected wallets.
Specifically, the transaction was calling `setApprovalForAll`.

This made me think, why would premint **ever** need `setApprovalForAll`.
The answer was never.

What if there was a way wallets could respect that.

There's a concept in app development known as a [permission manifest](https://developer.android.com/reference/android/Manifest.permission).
If a phone wants some potentially dangerous permissions such as the camera or your location.
They need to explicitly list it and google/apple will review it.

What if applications were to publish a permission manifest for what wallet transactions they're allowed to invoke.
If they need `setApprovalForAll` they need to clearly mention it in their manifest and why.
Wallets should use this registry and **reject** all transactions not officially listed in the manifest of `premint.xyz`.
This registry would be timelocked to say a week before it is respected to prevent registry manipulation.
Attackers not only need to compromise the website, they need to compromise the registry of permissions and hope no-one sees the changes in a week.

In this way, we can **sandbox** websites.
It will be next to impossible to protect against all hacks but we can limit the damage done.

# The Road to Mainstream Adoption
Interacting with applications in web3 should not strike fear.
You should not need extremely detailed knowledge to simply trade an NFT.
We need to make the common experience simple and safe.

Here at PocketUniverse, we're not going to sit around and wait for the wallets to improve the status quo.
Nor are we going to wait for standards to be established.
People are getting scammed left and right **today**,
so we're going to build something that can help **today**.

If you'd like to help us push things forward - pop into our [discord](https://discord.gg/zjjbUtMVbW).
I'd love to chat.
Let's make web3 safer for everyone :).

## Appendix
These are some miscellaneous thoughts.

### Censorship
"Hey Justin, if wallets start determining which websites are scams and which aren't is that not a form of censorship. Those without approved checkmarks will be at a disadvantage."

I would consider this more providing the correct information in a timely manner. There should always be the advanced option to continue with the transaction at your own risk. This is the equivalent to when a website does not have `https`. Browsers will loudly warn you but you can always proceed. The majority of individuals should not have to suffer at the cost of more complexity for early adopters.

### What about new NFT Drops?
Keen readers will recognize this does not help with new NFT mints.
If Yuga Labs drops a new contract, how do we tell if this is a scam.
It will have no volume or transactions.

The first thing is, use the transaction viewer so you don't lose **all your assets**.
Great done that? Now we can protect the amount you're going to spend on the mint.

This will require a little more work.

What if there was a way for the community to sign ownership for other contracts.
Say Yuga Labs was recognized by an address.
Yuga Labs could bidirectionally sign ownership of an address and the contract.

That way, we know if the smart contract was deployed by Yuga Labs!

Bringing our analysis to the lowest level (the smart contract) ensures we're protected against as much as we can be.
We no longer fear issues at the web layer since if we're interacting with the right contracts.
We're happy :).

### Reach out
These ideas are those that stood out to me in the last month of analyzing the space. I'm certain there are issues with some of the details. If you spot anything, I'd love to chat. I'm always trying to learn more!
