---
title: Composability of Data
date: 2022-07-03 16:33 
layout: PostLayout
tags: ['blockchain', 'composability']
summary: "Composable compute has driven the software industry to accelerate rapidly. But why stop there. What if we could compose over data."
---

It was only 6 months ago I dove head first into the world of crypto and blockchains. I'm a little allergic to money so I wasn't particularly interested in DeFi but crypto was slated to be "the new web" so I had to see what all the noise was about.

I jumped into the crypto space to explore what does this technology enable other than financial use-cases. The one thing that I came out with was **blockchain enables composability of data**.

This post explains what on earth is composability of data and why I think it's incredibly powerful.

# Power of composability

Software is amazing.
You can write a library to compress an image, compute the roots of a function, send a packet to another computer, etc and re-use the same functionality over and over again.
You can use the same library in different contexes.
I may be sending a packet to another computer for a messaging app or sending weather data.
The same library can be written once and reused endlessly.
This is composability and one of the great powers of software.

What makes software more incredible is a lot of these libraries are open source.
That means, if you need some functionality, you can just take it from someone else.
You can leverage other peoples work and build on top of it.
If you've ever done web development you'll know that every piece of functionality under the sun is just one `yarn add` away.

This set of open source software drives innovation.
When you have a new idea, you don't have to build everything from scratch.
Pick the are you're going to innovate in and just leverage other peoples work for the rest.

# Composing on Compute

This idea of composability is so powerful there are entire industry built of it such as 
Software as a Service.
This allows you not only to take someone else's code but now they run it and scale it for you.
A classic example is database software.
Even if the software is open source, running a database is hard work.
You need to worry about consistency, low latency, reliability, etc.
Instead, you can now pay for a service which focuses entirely on writing the software and deploying it whilst you can build the features that matter.

This is what I call composing on compute.
You take packages and re-use the code that's there.
You have people host database software and re-use the code that's there.

However, composing on compute can only take you so far.
If today all of Facebook's code was open-source you couldn't build another Facebook.
Even if you managed to run all the data centers you'll still be missing a secret ingredient.
The problem is not the compute being available but rather the **data**.
With compute being democratized through open source, the data has been the most valuable piece.
The data moat is what many companies strive to achieve.

# Difficulty with Composing over Data

The difficulty with composing over data is unlike code, you need to have one source of truth.

With code, I can simply fork the code and modify it to my liking.
If I want different parameters for my database, I can run a slightly tweaked version of the code.

With data, it is not unidirectional.
You do not simply *read* the data like you just *run* the code [^1] .
You need to also *write* the data.
If the data becomes forked, which instance you write back to is difficult.

Take the example of a cycling tracking application.
We want to compose over the cycling data.
Thus, we share the data underneath and have different clients or views over the data.
Now one of the clients wants to track swimming data as well.
They can't simply fork the database or else they won't get the shared running data.
Instead, they need to get agreement from whoever is storing the data that they should also store swimming data.
This is tricky!
If the person storing the data does not want to add swimming data you're out of luck!

An example where data was open was the older twitter APIs.
It had an open feed of data which different people built clients from.
Until it [didn't](https://www.theverge.com/2012/7/9/3135406/twitter-api-open-closed-facebook-walled-garden).
Twitter closed down its APIs to focus on its own app.

The key difference between composing over compute versus composing over data is the data can only have one source of truth.

This leads to difficulties managing and controlling the data.

# Blockchain and Composable Data

The main problem above is the data is owned by a single entity which is the typical web2 way.
They control how the data evolves and who gets access to it.
No one wants to build on top of composed data due to the fear it will simply be cut off.
But what if the data was owned by... the user.

The user can store their own their own swimming data so the developers don't have to fear the data being taken away.
All the different clients can use the data.

The question then lies, how does the data evolve?
There still needs to be consistency with the data.
However, we can also do this in a decentralized way like we do with protocols.
The developers can together determine how the data evolves.

Now with blockchain, we can use cryptography to indicate which individual owns which data.
Note the data itself doesn't need to lie on the blockchain, simply who owns which data.
The standard being developed for this "pointer" is decentralized identifiers.

A decentralized computer has given us the technology to bring the data back to being owned by the individuals.
This in return enables the potential for composing over data.

# Why do we care?

Just like composability over compute helped the software industry innovate, composability over data will do the same.
Instead of building a social media platform from scratch, you can bring in the social data stream that already exists.
Instead of building your game entirely from scratch, you can bring equipment designed by other developers.
This saves repetitive work.

From software as a service to state as a service.
From open software to open state.

All of this powers the speed that we can innovate.

# Downsides
Of course, there are a gigantic amount of downsides.
This is a moonshot.

The biggest downside to a composable data is iteration speed.
This is the same issue that plagues protocol development.
There needs to be consistent agreement across many players.
Organizations cannot freely migrate the data, add new data etc. 

# Summary

Composability of data feels like a natural progression.
Re-using building blocks is one of the key reasons why software accelerates so quickly.
If we can re-use data like we re-use compute we may be in another wave of innovation.
It is certainly difficult, but I'm optimistic that this is where we're heading!

[^1]: With code you sometimes write back the data. This is like merging your forked code back into the main repository. However, this is much less frequent than writing back data.

# Appendix

## Compelling use cases of composable data
Note: these use-cases I just wrote without much thought. Some of them (read: most of them) are dumb. I thought I might as well share :)

### Removing duplication of efforts
"I login to a new application and my preferences (frequency of notifications, dark mode, emails off) and my information (name, DOB, location) are all provided within a click of a button."

"Linking all my social media."

### Decentralized Social Media 
Layer different *algorithms* or *views* on top of a common data set. Don't rebuild the world of follower lists, posts etc.

### "Filter the Internet"
"I am working on a crypto paper so I switch into the "crypto" mode. This filters all my twitter by only people tagged with "crypto" and news websites show me relevant crypto news"
- Existing behavior - current platforms. Creating multiple google accounts for different recommendations.

"I am switching from social mode to work mode. My notifications on every application automatically changes. Every app provides my 'work' list at the highest priority."

### Notifications
"I have a list of people I trust that are able to notify me from any platform. I go to my notification from my mentor to check out this article on a social platform I've never been to before. I jump into the platform and see the article posted, my feed is automatically propagated based on my universal follower list."
- Notifications traversing platforms.

### Work
"I can enter gated channels for experienced developers to quickly get help. These are high signal channels that are permissionless to show but I need to verify my credentials that I'm a senior dev."

"Gated job search. Filter people more effectively (instead of just company). Get reach-outs only by only high quality recruiters via gating."

## Incentives
The incentives for this model are unclear.
That said, the incentives for open source software wasn't entirely clear either.

If I had to guess it would be a state as a service model.
It allows you to easily read, write, and replicate the user storage.
Thus, the data is still free and open, but to use it effectively you want to go through one of these providers
