---
title: Mindless[1] - The Journey Thus Far
layout: PostLayout
date: '2020-08-15'
tags: ['mindless']
---

Mindless is a project I have been working on with the simple goal of allowing me to be more aware of
where my time is going. This has been something I have wanted to build for years but life gets in
the way. This blog series will be a way for me to stay accountable and help me articulate my
thoughts. If anything I hope this series provides insights into all the ups and downs of having your
a personal project.

# The Journey

## Where did it all start.

> 2018-11-03: Initial commit.

*Quotes in the format of [date]: [text] represent a commit.*

A little less than two years ago I had my very first commit. Tracker was the name of the project
and the goal was to learn Rust and have some fun doing a project. Little did I know I would still be
working on it today.

The first iteration was simple, use an in-memory database to start and write a HTTP server in Rocket
Rust.

> 2018-11-04: Add basic template for tracking tasks.

Great, we have something working!

> 2018-12-01 Add logging using env_logger to stdout

A month passes, somehow the only additional change I did was adding logging. A trivial change.

At this point, I'm giving myself the benefit of the doubt that working + uni is taking a toll. No
time for the project I guess.

## A Holiday and a Diary Entry

On a plane ride during my holiday around the end of 2018 and early 2019, I decided I wanted to get
serious about this project. I wrote up my goals and a plan to execute. It was called Project Alpha.

<figure>
<center>
  <img src="/static/images/blog/2020-08-15-images/project_alpha.jpg" alt="Project Alpha Diary Entry" />
  <figcaption> Project Alpha Diary Entry </figcaption>
</center>
</figure>

The last page had the Phase 1 timeline.

<figure>
<center>
  <img src="/static/images/blog/2020-08-15-images/project_alpha_phase_1.jpg" alt="Project Alpha Phase 1" />
  <figcaption> Phase 1 Timeline </figcaption>
</center>
</figure>

Spoiler: We never finish Phase 1. Ambitious and naive - what a great combination.

We then see the following commit:

> 2019-02-24: Change module structure and add multiple hierarchical tasks

The first instance of hierarchical tasks! Looks like things are coming together... or so I thought.

## A Fresh Start

A diary entry in 2019-01-17 showed I started to question why I was using Rust.

Diary entry (because my writing is unreadable I wrote it out):
> Thinking about RUST vs C++. The main goal is to *build*. I haven't even built something in C++...

A few months later we can see the transition starting to take place.

> 2019-03-12 - 2019-03-18: A series of commits transitioning to C++ and using postgresql
>
> 2019-04-15: Boring refactoring and separation of database abstraction.
>
> 2019-05-10: More abstractions and added a user manager.

Somehow I decided it was a great idea to re-write the whole project from scratch. This time there
were a few differences:
1. Using C++ instead of Rust
2. Have a command-line interface instead of a web server
3. Hook up a real database instead of just storing data in-memory.

I assume the iteration speed and unfamiliarity of Rust finally got to me that I
re-wrote everything in C++. It's not ideal but we're getting somewhere!

We now have a real database hooked up, the ability to create, delete users and track tasks. The only
problem is I can't use a command-line interface when I'm about an about. I needed a way to interact
with my database.

## A Client Application

The plan was simple, I always have my phone with me so I can just set up a chatbot to send messages
to it. Without thinking much about what this would look like I jumped straight into it.

First it was a little shaky:

<figure>
<center>
  <img src="/static/images/blog/2020-08-15-images/tracker_broken.jpg" alt="Tracker Broken" />
  <figcaption> Testing the Tracker </figcaption>
</center>
</figure>

Yes, I did a sad react to my message when my server didn't respond.

Eventually, I got the server to talk back to me!

<figure>
<center>
  <img src="/static/images/blog/2020-08-15-images/tracker_success.jpg" alt="Tracker Success" />
  <figcaption> Tracker Acknowledging Requests </figcaption>
</center>
</figure>

The information was not very readable but it worked!

<figure>
<center>
  <img src="/static/images/blog/2020-08-15-images/tracker_info.jpg" alt="Tracker Dumping Info" />
  <figcaption> Tracker Dumping My Info </figcaption>
</center>
</figure>

We have officially reached an end to end connection and we can use the application! The final commit
for this repository was:

> 2019-07-07: [PLEASE FIX BEFORE COMMIT] Add simple return values from C++ server instead of
> printing.

We got end-to-end working but there were some issues.
1. The code is a mess.
2. The friction to add the same task is very high. I have to type out the whole command which is
   very annoying. The key to the project is we NEED to make this frictionless.

Around this time I move halfway across the world to start work at Facebook in the bay.
The project gets put on the back burner until we adjust to this new life.

## A Fresh Repo and a Fresh Start

Work takes its toll and no development on the project for 6 months. Suddenly, a new repository is created
on Github called Tracker.

> 2019-11-29: Initial commit.

The initial commit reads: "Here we go again!". Somehow, I thought of the bright idea of starting
from scratch AGAIN.

To solve the goal of making a frictionless client interface I decided to write up a web server so
at the click of a button, you can mark a habit. For no good reason, I also decided to re-write
everything in rust.

A flurry of commits come in from 2019-11-29 to 2019-12-01. It looks like I did a 3 day
hackathon.

The differences in this iteration:
* Written in Rust (we've gone full circle)
* HTTP server AND a command-line interface
* A web APP interface as opposed to a Facebook chatbot
  * Has a calendar view where you can click to mark a habit
* A pure HABIT interface and has no notion of tasks

The code during this iteration was ugly, to say the least. It was very hacked together to quickly explore a
different client interface.

After this 3-day burst there are very few commits. The repo ends with this commit:

> 2020-05-27: [WIP] Refactoring the mess that is habits.

Let's just say a 3-day hackathon does not produce high-quality code. When you go back to the
code afterward it makes it hard to be motivated to make changes. 

## A Fresh Repo and a Fresh Start Part 2

A new repository is created on my Github called "Mindless".

> 2020-05-29: Add basic initial housekeeping files

Looking at the timing of commits it looks like I couldn't handle the code anymore and had to start
fresh. The README states:

> Another idea another repo another try. Tracker - QR code version.

The previous webserver proved to be much too complex to get something working quickly. I just want
to track my habits; how hard can it be. I thought of the simplest approach I could which was a simple
QR code. The main benefit here is locality. Typically, where you are will indicate what you're
doing. E.g. If you're at the computer you're either working or chatting to friends. If you're at the
dinner table you're eating. Again, I decided to rewrite the server from scratch for no apparent
reason.

Differences in this attempt:
* HTTP server only (no command-line interface)
* Sqlite3 instead of PostgreSQL
* Client interface is QR codes

> 2020-07-07: Add QR images

I added QR codes and printed them out.

<figure>
<center>
<img src="/static/images/blog/2020-08-15-images/qr_images.jpg" alt="QR Codes" />
<figcaption> QR Codes PDF (yes I took a picture of my tablet - sue me :)) </figcaption>
</center>
</figure>

I stuck these everywhere and they worked fine! They reduced the friction to delete a habit but
created a ridiculous amount of friction to create/edit a habit. I have to now use a printer and set
up the QR codes if I want to quickly add a new habit.

Another attempt another failed solution.

## Okay Fine, I'll Build an App.

All this time you're probably asking "why not just build a phone app like everyone else does".
The answer probably is building an app is a lot of work and frankly, I didn't know if I could do it.
I wanted the focus and my learning to be on the server, not app development. Nonetheless I decided to
build a mobile app.

> 2020-07-07: basic flutter app

A diary entry here says "Let's make this a daily thing.". Although it wasn't daily, this time I
didn't disappear for months at a time.

> 2020-07-11: Modify template on server to match application
>
> 2020-07-22: Fix broken E2E tests and add an interface to check if a habit has been set today.

Work is getting done, slowly and steadily. At this point, the functionality is still less than what
I had in 2018 but I was making progress.

## Live stream?

One of the biggest challenges I had was the inability to be consistent. I have been focusing more
and more on public accountability. An idea I had was why not live stream on twitch!

> 2020-07-25: [api] Add unmarking a habit and clean up the checking of a set habit
>
> 2020-07-25: [api] Add functionality to un-mark habits
>
> 2020-07-25: [server] Update rocket to master branch to enable json
>
> 2020-07-25: [api] Unify the requests to a signle endpoint sending metadata with Json
>
> 2020-07-25: [api] Unify the unmark APIs and update tests

My first live stream days was one of my most productive project working sessions I've had. The fact that
I was streaming made me not switch to youtube and kept me focused. I even got some help from some
viewers which was fantastic. It made me feel like I wasn't working on this project alone. It was so
great I decided to stream again the very next day.

> 2020-07-26: [app] Add sending JSON request from the application
>
> 2020-07-26: [app] Log the response from the server after a request
>
> 2020-07-26: [app] Add removing and adding new habits
>
> 2020-07-26: [app] Add the ability to UNDO a deltion
>
> 2020-07-26: [server] Add the ability to create and delete users

This live stream recording can be found on [youtube](https://www.youtube.com/watch?v=1z5YQio4yf0).
Again, this was one of the most productive sessions I had. I thought I found the silver bullet!

I stream during the week for a few hours a day up to August 3rd. The progress we made can be found
[here](https://streamable.com/q023sz).

Streaming is great when you have a clear idea about what to do. However, sometimes I get stuck and
can't figure something out for hours at a time. Additionally, some days I don't feel like talking
and just want to focus. I have yet to decide if I should continue streaming but for now, I wanted to
try to see how productive I was just being focused and heads down.

## Lets Focus

Live streaming was a great way to kick start my passion for my project again. Now that I feel the
drive again I plan to stop streaming but try to consistently build slow progress.

> 2020-08-04: Add new database format

After reaching the end to end integration with login above I realized the code was a mess. It was great we
reached end to end but it was difficult to iterate on and I spent lots of time on simple problems. A
refactor was greatly needed to pay down the technical debt. Now that we've proven the viability of
building an app it was time to do each component more thoroughly.

As of writing this post we have some basic user login with our initial draft of our home screen. A
quick video can be seen [here](https://streamable.com/33ggh7).

Here we are today, starting again from scratch with very little progress to show for it but somehow
I feel like this time it will be different.

# Key Takeaways

> It's fine to celebrate success but it is more important to heed the lessons of failure. - Bill
> Gates

Multiple repositories, multiple re-writes, multiple hackathons later we have something barely
better than when we started 2 years ago. However, we've learned an incredible amount through our
failures and I wanted to capture those here.

## Intensity versus Consistency

The very first few iterations and repositories I would work on in short bursts of intensity. I'd
spend 8 hours a day for 3 days straight trying to get something to work then forget about the
project for months. Sprints like these are great for prototyping and quickly learning about an idea.
They are essential to prove something out in a quick and dirty way as to not spend months working on
something to find out it just won't work.

That said, sprints won't allow you to build something complex and sustainable. To achieve success we
need to consistently make improvements to take advantage of compounding effects. A few hours each
day will end up being much more than 3 days of intense work each month.

Takeaway:
* Understand whether the task at hand requires an intense approach or a consistent one. 

Action:
* After proving out that I can build a flutter app that works end to end and won't look terrible we will
  start again slowly building up the interface in a deliberate and planned way. 

## Pay Off Technical Debt

With a focus on getting end to end working I often put in ugly hacks with a TODO saying "fix me".
This approach accumulates technical debt. Technical debt is taking a loan from the future. The loan
accumulates more debt the longer it is overlooked. Eventually, there is so much technical debt you
go bankrupt and have to start again from scratch. You must be aware of the technical debt you are
accumulating and make sure you address it before it overwhelms the project.

Takeaway:
* Technical debt is loaning from the future. Be sure you pay it off quickly and early.

Action:
* Track all TODOs and take the time out to clean up the technical debt.

## Focus on End-to-End

On may early iterations I tried to make the server endpoint "perfect" and only when I started
developing the client I realized the interface I designed wouldn't work. You can never perfectly
understand the architecture of your code from the get-go. The fastest way to learn is to jump in and
iterate. This means focusing on end to end horizontal features as opposed to complete verticals.

Takeaway:
* Developing features horizontally end-to-end helps de-risk assumptions. Completing features allows
  you to more accurately visualize how the rest of the system will be architected. 

Action:
* Don't try to be perfect but instead iterate quickly. 

## Provide User Value

Focus on what will affect the user. Will the user care if you use a sophisticated database versus
something simple? Will the user care if your HTTP request is 3ms faster? Prematurely optimizing
something or adding features that don't directly add user value is wasted work. Yes, you do need to
think about how performance down the road but do this by building generic interfaces. For example, build
a database interface to allow you to replace your database with something more efficient and
sophisticated down the road. Design components to be replaced.

Takeaway:
* Don't prematurely optimize.
* Design components to be replaced.
* Focus on user value.

Action:
* Write down specific features that would be useful as opposed to just implementing the first thing
  that comes to mind.
  * *Exploring what the key features of this app will be explored in the next blog post.*

## Don't Stop Learning

As someone early in their career one of the biggest advantages you have is you're a beginner at
everything. It's a perfect time to go broad and see what you're interested in. Because after 10 years of
working on something specific it will be much harder to switch career paths. 

Learning various things will have unexpected benefits in your career. As an example, learning Rust
helped me connect with my current team since that's one of the languages they put on the job
description. Learning Dart and Flutter helps me understand what kind of different asynchronous APIs
are out there and which ones are the most ergonomic to use.

Takeaway:
* Keep learning and trying new things especially early in your career. Find what you enjoy and you
  might even find unexpected benefits.

Action:
* Learn something you're uncomfortable with. For me it is developing an app. I've been focused on
  server-side back-end work and designing something a consumer sees is very bizarre. I better touch
  up on my design skills :P.

The journey has been a fun one thus far but we're just getting started.
