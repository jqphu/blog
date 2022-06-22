---
title: Ethereum Name Server
date: 2021-07-03 12:18:30
layout: PostLayout
tags: ['web3', 'etehreum', 'ens']
summary: "WTF is an ethereum name server? Learning about it and creating my own!"
---

I spent the last day just dabbling in Ethereum claiming the domain name `jqphu.eth`. To make this
blog not entirely a self-help blog and be somewhat technical I though it'd go through what on earth
do I mean by "claiming a domain name on the blockchain".

## Domain Name System (DNS)

Let's start with traditional domain name servers. To simplify, every connection on the internet has
a unique identifier known as an ip address. This can be thought of as your address. If I want to
communicate with your through the internet I use your ip adress.

However, when accessing websites we don't use ip addresses as they are cumbersome and hard to
remember. Instead, you access websites through a domain name. If I want to talk to google I go to
`google.com`.


```
❯ ping blog.justinphu.dev
PING jqphu.github.io (185.199.109.153) 56(84) bytes of data.
```

Here, when I try to access the domain `blog.justinphu.dev` I get pointed to the ip address
`185,199,109.153`.

The translation from a domain to an ip address is handled by the Domain Name System (DNS) which can
be thought of as a glorified adderssbook. It maps various domains to ip addresses. The benefit
provided here is you can point to various ip addresses (changing servers) with the same domain.
Clearly, `blog.justinphu.dev` won't point to a single server / ip address but varies depending on the DNS
server you hit.

We can query the nameserver directly:

```
❯ nslookup blog.justinphu.dev
Server:         192.168.0.1
Address:        192.168.0.1#53

Non-authoritative answer:
blog.justinphu.dev      canonical name = jqphu.github.io.
Name:   jqphu.github.io
Address: 185.199.108.153
Name:   jqphu.github.io
Address: 185.199.109.153
Name:   jqphu.github.io
Address: 185.199.110.153
Name:   jqphu.github.io
Address: 185.199.111.153
```

The nameserver is `192.168.0.1` which is just my router beucase of networking things. This is
unimportant, my router will go to another domain name server and resolve the addresses.

Here, there are many addresses to a single domain as my blog is hosted on many servers (thanks to
github!).

Great! The oversimplified version is your address is an ip address and the domain is a human
readable way to lookup your address. The lookup process happens through a domain name system.

## Ethereum Name Servers (ENS)

I'm not going to go into detail about Ethereum but it essentially a decentralized computer or state
machine. You can modify the state machine through a transaction. A transaction can be thought of as
a simple piece of code that needs to run. A simple transaction is sending money from one account to
another.

On the blockchain you're identified by your account. Your account is simply a 42 hexadecimal
address (derived from your public key). This is equivalent to your ip address in the example above.
For example, my address is `0x1a8906a0EBB799ED4C0e385d7493D11701700d3a`.

As you can tell, using that address to send money is going to be cumbersome. If you make a typo of
any sort you've now sent money to the wrong account.

In comes Ethereum Name Servers. They provide the mapping of a domain to an address. The difference
with DNS is domain names are stored and hosted by centralized companies (like google) whereas with
ENS your data is stored directly in the blockchain. This has the pros of being decentralized and the
cons of being expensive to change. 

Now comes the question is, who facilitates the lookup? The trick is there are smart contracts (just
snippets of code stored directly in the blockchain) that execute to trigger the resolving logic.
That is both the code to register and lookup domains and the domains themselves are stored directly
on the blockchain. There is no intermediary.

Now the registered name is more than just a mapping from a domain name (`jqphu.eth`) to an address.
It is simply a mapping of a domain name to another transaction which can store additional data. In
fact, you can lookup my domain name (`https://app.ens.domains/name/jqphu.eth/`) and see I have
information such as my twitter, email, etc. This can go as far as to linking to a static webpage
that *itself is hosted on the blockchain* but that's for another day.

## Why Do I Care?

The reason this is particularly useful is the whole concept of blockchains such that it's
decentralized. My information is in complete control by me. As long as the blockchain lives and
there are nodes, no-one can take this information down. This doesn't come with downsides such as my
data is public, it is expensive to change this information, it is not dynamic, etc.

Conceptually, this can enable pseudo-anonymous personalities to be the unifying source of truth for
who you are. You can say "I am X and here are all my links" and be definitive that it is correct and
not tampered with.

At the end of the day, the biggest win here is I can now say "I'm on the Ethereum blockchain!".
