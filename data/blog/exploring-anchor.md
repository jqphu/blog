---
title: Exploring Anchor
date: 2022-01-08 01:25:30
layout: PostLayout
tags: ['solana', 'rust', 'learning', 'anchor']
summary: "Exploring Anchor from the ground up!"
---

<TOCInline toc={props.toc} asDisclosure />

As I've started to dabble in Solana I've found
[Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html) to be a part of
my toolkit I can't live without! In this blog post we start from the fundamentals of a barebones
Solana smart contract and see how Anchor plugs the gaps.

## Hello World Program

Programs (aka Smart Contracts) in Solana are completely stateless. There is a single
[entrypoint](https://docs.solana.com/developing/on-chain-programs/developing-rust#program-entrypoint)
to the program. 

```rust
#[no_mangle]
pub unsafe extern "C" fn entrypoint(input: *mut u8) -> u64;
```

This isn't very informative. It takes a byte array of serialized data and returns an integer result.
Solana makes this a little easier by providing a [convenience
macro](https://github.com/solana-labs/solana/blob/9b1199cdb1b391b00d510ed7fc4866bdf6ee4eb3/sdk/program/src/entrypoint.rs#L42) to help deserialize some of
the data.

```rust
// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");
    
    Ok(())
};
```

Now we can see some of the required fields. It contains the program id, a list of accounts and some
instruction data. There isn't much we can do without any state though. Let's start adding some!

All of the program state is stored inside
[accounts](https://docs.solana.com/developing/programming-model/accounts). Accounts simply hold a
binary blob of data.

Let's continue with our hello world example. We're going to create an account to store a integer
counter and increment it everytime the smart contract is called.

Let's call this account `GreetingAccount`

```rust
/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    /// number of greetings
    pub counter: u32,
}
```

We derive `BorshSerialize` and `BorshDeserialize` so we can represent the data across the wire when
we call into the programs.

The client passes in the `GreetingAccount` so we need to retrieve it.

```rust
// Iterating accounts is safer then indexing
let accounts_iter = &mut accounts.iter();

// Get the account to say hello to
let account = next_account_info(accounts_iter)?;
```

This may fail and if so we fail fast (noted by the `?` operator).

Once we've retrieved the account, we need to verify the validity of the account. Only the owner of
an account can modify the data. Therefore, if the owner is someone other than the program itself it
is an invalid account.

```rust
if account.owner != program_id {
  msg!("Greeted account does not have the correct program id");
  return Err(ProgramError::IncorrectProgramId);
}
```

Finally, we try to deserialize the account itself and update the value and serialize back.

```rust
// Increment and store the number of times the account has been greeted
let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
greeting_account.counter += 1;
greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
```

<Banner text={
"Solana transactions are all or nothing. If a transaction returns with an error no state will change. This vastly simplifies the programming model."
} />

Done! We've finished our hello world example. Let's look at the full code.

```rust
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");

    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Increment and store the number of times the account has been greeted
    let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
    greeting_account.counter += 1;
    greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_account.counter);

    Ok(())
}
```

Phew! That was one of the more complex hello world examples I've written! We're still missing a lot
of steps. What happens when we have multiple instructions? How do we sign transactions to make sure
not anyone can do transactions. What about argument passing!

Before I scare you away from Solana, there's a way to make this all easier. Time to explore Anchor.

## Anchor

Anchor provides the full suite for Solana development. We'll skip over the workspace management and
focus on the IDL and code generation Anchor provides.

### Hello World
Let's see the hello world example written in Anchor. *We've omitted initializing an account as we
have in the above example.*

``` rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod hello_world {
    use super::*;

    pub fn hello_world(ctx: Context<Greeting>) -> ProgramResult {
        msg!("Hello World Rust program entrypoint");

        let greeting_account = &mut ctx.accounts.greeting_account;
        // Increment and store the number of times the account has been greeted
        greeting_account.counter += 1;

        msg!("Greeted {} time(s)!", greeting_account.counter);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Greeting<'info> {
    #[account(mut)]
    pub greeting_account: Account<'info, GreetingAccount>,
}

#[account]
pub struct GreetingAccount {
    pub counter: u32,
}
```

That looks a lot better! Let's break down some key components.

With Anchor, everything is serialized and deserialized for you! You don't have to mess with
instruction data or deserializing accounts from `AccountInfo`.

Let's say we wanted to add a count argument to the `hello_world` method. We can do this just like we
would write any other Rust method!

```rust
pub fn hello_world(ctx: Context<Greeting>, count: u32) -> ProgramResult;
```

We can define accounts in a simpler way too. We provide a struct that contains our context called
`Greeting`. Inside, we say we have a single account known as a `GreetingAccount`.

```rust
#[derive(Accounts)]
pub struct Greeting<'info> {
    #[account(mut)]
    pub greeting_account: Account<'info, GreetingAccount>,
}
```

Behind the hood, Anchor ensures that the account passed in *is* the `GreetingAccount`. It handles
account substitution by serializing the struct name into an identifier. Since we listed it as
`#[account(mut)]` we're telling Anchor we're going to modify this. Only accounts owned by the
program can mutated so Anchor will check that for you too!

This allows us as developers to focus purely on the implementation and business logic.

### Authority and Signing
The programs owns all the accounts in order to modify it. However, the example we have above allows
*anyone* to pass an account to the `hello_world` and increment the counter. We want a way to ensure
there is a way to represent an entity that can control the account.

To minimize confusion between owners we call the entity who can do a certain action the authority.
The authority is able to sign the message to allow the program to execute on it's behalf.

If we were attempting to write this without Anchor we would have to validate signatures and ensure
they're protecting the correct accounts. This gets cumbersome and error prone very quickly as we have multiple
accounts we want to manipulate.

Instead, Anchor provides a bunch of convenience macros to make life easier. If we wanted to say the
Greeting account can only be incremented by a certain authority we can do it as follows.

We first add the authority to the greeting account.

```rust
#[account]
pub struct GreetingAccount {
    /// Authority of this account who can increment the counter.
    pub authority: Pubkey,
    pub counter: u32,
}
```

Then we tell Anchor that when we are calling the `hello_world` method that the authority must match
the one that is in the greeting_account. This is done by adding the `has_one = authority`.

```rust
#[derive(Accounts)]
pub struct Greeting<'info> {
    #[account(mut, has_one = authority)]
    pub greeting_account: Account<'info, GreetingAccount>,
    pub authority: Signer<'info>,
}
```

All the checks are again done behind the scenes! Wonderful.

### Client Interfaces

Unfortunately the whole world isn't written in Rust. Most applications are built on the web using
javascript/typescript. The benefit of an IDL is it provides us code generation for whatever language
we like. Anchor currently targets typescript.

An example from the [Anchor Tutorial](https://project-serum.github.io/anchor/tutorials/tutorial-1.html#initialize-instruction).

```typescript
// The program to execute.
const program = anchor.workspace.Basic1;

// The Account to create.
const myAccount = anchor.web3.Keypair.generate();

// Create the new account and initialize it with the program.
await program.rpc.initialize(new anchor.BN(1234), {
  accounts: {
    myAccount: myAccount.publicKey,
    user: provider.wallet.publicKey,
    systemProgram: SystemProgram.programId,
  },
  signers: [myAccount],
});
```

This ensures any updates to the smart contract are accordingly showing up on the client side and
errors can quickly be found. It also provides "for free" the client interface without mucking with
FFI or re-implementing interfaces.

It removes the huge chunk of errorprone boilerplate!

### Summary

The improved security and developer productivity makes using Anchor a no-brainer. There are a
plethora of features that Anchor provides to make a Solana developers' life easier that I haven't
even gone into.

Anchor is a must use for any Solana developer!
