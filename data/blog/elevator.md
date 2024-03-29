---
title: The Elevator Game
date: '2020-09-19'
layout: PostLayout
tags: []
---

# Take Me To My Floor!

It was Saturday morning and I had just played 3 sets of tennis. Exhausted, I stumbled into my
apartment lobby and couldn't wait to get to my floor, grab a cold drink, and just sit down. I
approached the elevator controls and pressed up. Unfortunately, today out of all days, one of the
elevators was broken and I was left with a single elevator.

That's okay, I watched it go from floor 7 (F7), pass the lobby (L), and down to the basement level (B).
Great, I'll catch it on the way up! The elevator stopped at the lobby but just as I was about to get in I
forgot about the new COVID restrictions. *There can only be one household in the elevator at once*.
Since there was someone already in the elevator I had to wait for the next one. As the elevator left
the lobby I pressed the up button again.

Like a mindless monkey, I again watched the elevator go down right past me to the basement a second
time. Once again, it came up to L but since it picked someone up from the basement I could not
enter. At this point, a few people were waiting behind me hoping to get to their floor.

Intuitively, I knew that if I requested to go down as well as up it would give me a better chance
to get into the elevator. Thus, I pressed downwards and as the elevator stopped at the lobby somebody
exited and I entered. I went down to the basement and exchanged some looks with the people waiting
down there and after what felt like an eternity the elevator doors closed and I was on my way to
my floor. I entered my apartment, got an ice-cold drink of water, and sat down.

Little did I know, because of that short experience, my next few days I would not be able to get
elevators out of my mind.

This blog post describes how the elevator algorithm is quite elegant, how if assumptions are not
met an algorithm can fall apart, and I'll touch on a little bit of game theory.

# Elevator Algorithm

To understand why it took me so long to reach my floor we have to understand the mind of the
elevator. The elevator in my apartment is like your typical elevator with a button to request to go
up, a button to go down. Within the elevator, you simply pick the floor you want to go to. The
eponymous algorithm that is used is the [elevator
algorithm](https://en.wikipedia.org/wiki/Elevator_algorithm).

> ... the elevator continues to travel in its current direction (up or down) until empty, stopping
> only to let individuals off or to pick up new individuals heading in the same direction. 

Once it exhausts all the requests in the current direction, it will switch directions or simply stop
and wait.

Now that we know what algorithm elevators use, let's formalize the elevator game

# The Elevator Game

The elevator game is quite simple. There are $$n$$ participants who want to get to their target
floor $$t_i$$ from $$b_i$$ their beginning floor.

They have a simple option. At any floor they have a choice $$c_i$$ which is simply press up, press
down, press none or press both.:

$$
\begin{equation}
c_i=
\begin{cases}
\text{up}, & \\
\text{down}, & \\
\text{none}, & \\
\text{both}, & \\
\end{cases}
\end{equation}
$$

They are free to leave at any floor. Once inside the elevator they can pick any set of floors $$f_i$$ to go to.

The goal of each participant is to minimize the time it takes them to get to their target floor $$t_i$$.

We will assume each participant is strategic and will play to the best of their ability.

Let the games begin!

# The Optimal Strategy

This game is kind of boring since everybody knows the optimal strategy.

Strategy:
1. Choose $$c_i = \text{direction towards your target floor}$$
2. Enter the elevator and choose your target floor $$t_i$$.
3. Exit the elevator at your target floor.

Let's go through a semi-formal proof that this is optimal.

Let's go through some quick lemmas to simplify the problem. Some of these might be incredibly
obvious but we will go through them as a fun exercise.

> Lemma 1: Once inside the elevator, picking your target floor $$t_i$$ and nothing else is an
> optimal strategy.

There will be a sequence of floors that will be stopped at (potentially the empty set) regardless of
your input. Let's call this sequence $$s_{\{f_{start}, t_i\}}$$. This sequence has a constant cost
regardless of your choice. Note this sequence is not just the initial set of pressed floors when you
enter the elevator since floors may be stopped at due to external button presses (people waiting at
the floor) or additional button presses as we pick people up.

Pressing your floor will guarantee once the elevator passes $$t_i$$ you will be able to exit.
Obviously, this is better or equal than not pressing anything at all.

Let's consider pressing a floor that is not in the sequence $$s_{\{f_{start}, t_i\}}$$ since clearly
pressing something that is in the sequence will do nothing. Pressing any of these floors will either
do nothing at best or result in a stop. An example scenario where this will do nothing is if the
elevator is going towards your floor and you press both $$t_i$$ and a floor in the opposite
direction. Clearly, this is slower so you should not press any of these floors.

Okay, we now know that if we're in the elevator we should just press our target floor $$t_i$$ and it
will be optimal.

> Lemma 2: Once inside the elevator leaving the elevator before $$t_i$$ is always sub-optimal.

Again, another pretty intuitive result. There are two cases to consider if the elevator is going
towards the direction of $$t_i$$ or it is not.

If the elevator is going towards $$t_i$$ and you leave at floor $$f$$ then it will take time $$c \geq 0$$
before you enter the elevator again at $$f$$. Once inside the elevator again you've taken an
additional $$c$$ time and you're in the same position as when you left.

If the elevator is going away from $$t_i$$ and you leave at $$f$$ then you still have to wait for
the elevator to come back to $$f$$. At best this is no better than staying in the elevator since
someone could have requested $$f$$. If no one selected $$f$$ then this causes an additional stop
for no reason. Again, once you enter the elevator at $$f$$ again you have not saved any time
compared to a participant who stayed in $$f$$.

> Claim 1: The only variable that affects the utility of the participant (time to their floor) is their choice $$c_i$$.

From Lemma 1 once we're in the elevator we should just press our target floor and from Lemma 2 we
should never leave the elevator. Thus, the only variable that matters is when we get into the
elevator.

# Should I Press Up, Down, or Both?

You probably know from a young age the best thing to do is just press the direction you want to
go! Let's attempt to prove this.

If your start floor is your target floor $$b_i = t_i$$ then you're done. Don't need to go anywhere, you're home! I'm not sure why you decided to walk to the elevator and go nowhere but sure!

Assuming $$b_i \neq t_i$$

> Claim 2: The optimal strategy is regardless what the other participants do is:
>
> $$
> \begin{equation}
> c_i=
> \begin{cases}
> \text{up}, \text{if}\ t_i - b_i > 0 & \\
> \text{down}, \text{if}\ t_i - b_i < 0 & \\
> \end{cases}
> \end{equation}
> $$

This essentially just claims picking the truthful direction you want to go is the optimal algorithm.

Let's break it down into two cases. If the elevator is going in the same direction or if it is going
in the opposite direction.

Some more formulation:

Let's say the total time to get to your floor is: \\

$$
\text{total time}_i = k_i + \text{time}_{\{b_i, t_i\}}
$$

where $$k_i$$ is the time it takes for the elevator to reach your $$t_i$$ and $$\text{time}_{\{b_i, t_i\}}$$ is the
time it takes to go from floor $$b_i$$ to $$t_i$$ taking into account all of the other participants
floor presses. That is time it takes to go from $$b_i$$ to $$t_i$$ with stops $$s_{\{b_i, t_i\}}$$.

From Claim 1 we deduced the best strategy once you're in the elevator is to simply press your floor.
Thus, $$\text{time}_{\{b_i, t_i\}}$$ is a constant.

The only value of interest is $$k_i$$, the time it takes for the elevator to reach your floor.


> Lemma 3: The strategy in Claim 2 is the best strategy to minimize $$k_i$$. 

If we prove this lemma then Claim 2 becomes trivial since the strategy minimizes $$k_i$$ and
$$\text{time}_{\{b_i, t_i\}}$$ is a constant thus it must be the best strategy.

An important observation is the choice $$c_i$$ only matters if the elevator is going towards for
your beginning floor $$b_i$$. That is if the elevator is going away, pressing anything will not
influence its decision in any way shape, or form.

This is important since it helps us simplify the scenarios into two cases:
1. The elevator is coming towards $$b_i$$ and to the same direction as $$t_i$$. E.g. the Elevator is on floor 8 going towards our starting floor 5 and we want to go to floor 3.
2. The elevator is coming towards $$b_i$$ but is going in the opposite direction to $$t_i$$. E.g.
   The elevator is on floor 8 going towards our starting floor 5 but wants to go to floor 9.

## 1. Same direction.

Given the elevator is currently at $$f$$ coming towards $$b_i$$ the minimum amount of time it will
take for the elevator to reach $$b_i$$ is $$\text{time}_{\{f, b_i\}}$$. This is also minimized by requesting to
go in the same direction of the elevator since it will never skip your floor. Therefore, since
pressing the same direction as your floor provides the optimal time $$\text{time}_{\{f, b_i\}}$$ and therefore
minimizes $$k_i$$.

## 2. Opposite direction.

Let floor $$m$$ be the furthest floor until the elevator starts coming back up to $$b_i$$ in the same
direction as $$t_i$$.

If we can prove that $$\text{time}_{\{f, m\}}$$ is minimized by us choosing the direction we want to
go then the proof becomes trivial. Since if our choice minimizes $$\text{time}_{\{f, m\}}$$ then the
elevator, once reaching $$m$$ the elevator will turn around and we will be in scenario 1 which we
have already proven that choosing the direction we want is optimal.

In this scenario, if we press the direction we want to go the best-case scenario is the elevator does
not stop at our floor, and the worst-case scenario is the elevator stops anyway.

If we decide to press the direction we don't want to go, then the elevator **must** stop at our
floor. This is because, say we want to go up, and we press down as the elevator is going down it
will stop at our floor. Therefore, it is never better to press the direction we don't want
to go.

Furthermore, we can press nothing. However, this is never better than pressing the direction we want
to go to. Since in either case the elevator will not take our command into account and will proceed
to go about its algorithm.

Thus, since it is optimal to pick the direction you want to go regardless of which direction the
the elevator is going, then Claim 2 holds.

We have now proven, albeit not very rigorously, that our intuition is correct and we know the
An optimal strategy for elevators is simply to truthfully pick the direction you want to go.

# Observations

We've now proven the strategy of the elevator is optimal but there are some interesting aspects of
this makes the elevator game intriguing.

## Dominant-strategy incentive-compatible (DISC) 

The strategy employed here results in every participant acting truthfully. There is no reason for a
strategic participant to lie and press both up/down or press numerous floors.

## Computationally efficient

The strategy fits in polynomial time and is trivial to compute. This is important since
us humans are the ones computing whether to go up or down.

## Observation Summary

The elevator algorithm is quite simple but it has great properties. You don't have to think about
what the other participants are doing and it isn't very hard to figure out your best strategy. The
elevator algorithm is so simple that no-one needs to teach you how to play the game to optimize your
strategy. You don't need to go through the exercise we just did to figure out how to play the game.

Sure, the elevator algorithm might lack strong performance guarantees, that is there are
certainly better algorithms out there that may optimize getting everyone to their destination as
quickly as possible. However, the beauty of the elevator algorithm lies in its ability to produce a
game such that the optimal strategy is so simple yet the algorithm is still efficient.

To better appreciate the beauty of the elevator algorithm we go back to my initial anecdote where a
change in assumptions turns the game on its head. The participants will stop acting
truthfully and greedily attempt to get to their floor with no regard for others.

# A Broken Elevator Game

Due to COVID, my apartment complex added one additional constraint to the elevator game.

> Only one household can be inside an elevator at once.

This simple constraint made a game where everyone was being truthful to a game which benefits the
liars.

In this broken elevator game we will prove two things:
1. Your request could potentially be starved.
2. The dominant strategy is to lie.

# Starvation

In this context, starvation is when you have a request but it never gets served. Think about waiting
in line for a restaurant at full capacity. You're first in line but people who have booked continue
to go in first and you need to wait until someone is a no-show. You are starved of your request
since you might never have a spot at the restaurant. In fact, not only are you starved of your
request, but you'll also be left starving due to not being able to eat.

In my anecdote, the first thing that happened was the broken elevator game starved me. That is
no matter how long I waited as long as there were sufficient requests at the basement level and
above me, I would never get into the elevator.

Regardless of how you play as an individual, you can get starved. Imagine you are at the
lobby and there are lots of requests going from the basement to floor $$f$$ where $$f$$ is a floor greater than
L. What will end up happening is someone will get in at floor $$f$$, go down to the basement. Even if it
stops at L you cannot get in due to the restriction that only one household can be inside the
elevator. Now someone in the basement gets in and goes up to level $$f$$. Again, even if it stops at
the lobby you cannot do anything.

This seemingly small restraint results in huge differences in the game. In fact, you can just get no
requests. After some time being starved you start getting annoyed and start to think "how can
I beat this game."

# Lie

If you were in my position I bet you would intuitively think of the optimal solution here, 
which is doing whatever you can to get into the elevator. Formalizing this to a strategy we get:

> Claim 3: Pressing both directions on the elevator is the optimal strategy.

Unfortunately, we will no longer be playing truthfully. We do not care which direction we are going,
we have one, and only one goal, get into the elevator.

From the regular elevator game, once we're inside the elevator we never want to leave or press
any other floor than our desired floor. This still holds with our additional constraint. Once we're
in the only difference is no-one else will enter but it does not change our strategy.

The question becomes how can we minimize the time until we're inside the elevator.

> Lemma 4: When the elevator opens at your floor you have no control over whether there is someone
> within it or not.

In this game, you have no information about what any other participant is doing. You know they are
strategic but you don't know which floors people are entering on. Thus, there is no information you
can use to figure out whether someone will be in an elevator at a given time.

Therefore, your best bet is just simply to try to get the elevator to stop at your floor and hope
there's no one in it.

*This lemma is not true. You can be unselfish and never go into the elevator which improves
the chances of there being no-one inside the elevator (since it can service more requests by
ignoring yours). You can also make some basic assumptions that the basement (where the cars are) and
the lobby are the high-frequency locations. For simplicity, we do not consider this but rather treat
the floor participants are at as purely random.*

> Lemma 5: Pressing both directions is the best way to get the elevator to stop at your floor. 

This is a pretty obvious lemma. If the elevator is going down past your floor, pressing down is
ideal to get it to stop at your floor. If the elevator is going up, pressing up is the ideal
strategy. Pressing both has no negative side-effects since the elevator will simply ignore one of
the requests.

From the previous elevator game, getting into the elevator is the ultimate goal to minimize the
time it takes to get to your floor. From Lemma 4 we don't care what the other players do, we
just want to get into the elevator. From Lemma 5 the best way to get the elevator to stop, and thus
the most likely chance of us getting into the elevator, is to press both buttons.

Therefore, pressing both buttons is the optimal strategy for the broken elevator game.

# Observations

This has some interesting observations.

## Rewards the Greedy 

The Broken Elevator Game rewards those who are greedy. By lying you improve your chances of getting
into the elevator and get to your floor.

## Dominant Strategy Decreases the Social Surplus

The dominant strategy forces the elevator to stop at every single floor that has someone waiting.
This means if it is going down, and you want to go up then you press the down arrow. This forces the
elevator to stop and if there is someone inside of the elevator you have simply wasted time.

Thus, everyone playing by the dominant strategy makes the elevator algorithm perform worse and makes
it harder for everyone to get to their floor.

## Leads To Starvation

Even if you play the dominant strategy, you can still get starved. There is nothing in your control
to prevent starvation. An algorithm that allows starvation is not a great one.

## Observation Summary

By comparing the broken elevator game to the regular one we can see the stark differences. By adding
some small constraints you now have to be dishonest and greedy. You have to optimize for yourself by
causing others to suffer.

The game now requires you to actively think. How long until I should press both buttons. I know if I
press them immediately this might make the whole system perform worse but if I never press both I
may never get a chance to get to my floor.

# Summary

The world is filled with algorithms. Some are simple, some are complex. Some are intuitive, some
require a manual to understand. However, all of them play a role in your life. Whether it be
figuring out how to get from path A to path B (shortest path algorithm) or understanding out why your
train is always late (Observer's paradox) algorithms are in play.

I was intrigued by the elevator algorithm since it is a seemingly efficient algorithm that allows
participants to trivially pick up and understand. Compare it to picking out which checkout line to go
to. As you approach the checkout there are so many variables, which line is the longest, which line
is going the quickest, which line has limitations (such as self-checkout). This results in decision
fatigue and you'll get annoyed if you make the wrong choice.

Now that I finally understand the broken elevator game, I have decided the only way to win is not to
play at all. I'll be taking the stairs from now on :P.

# Appendix

Appendix contains some additional content about potential ways to to defeat the broken elevator
game.

## Re-write the Algorithm?

Given the same inputs, I cannot think of an algorithm that would allow for a fair game. We do
**not** know where people are going which means the algorithm cannot do anything smart.

A minor improvement would be that once someone requests a floor, we do not service any other floors
until all requests are completed. That is a request that comes in at the lobby, and they choose floors $$f_1,
f_2, f_3$$ then we will service all of those floors before making another request.

This should improve it since participants play strategically and should only request a single
floor.

If we knew when requests came in, we could do a first in first out algorithm. This would prevent
starvation and allow everyone to play truthfully again. At this point, you wouldn't need both the up
and down buttons and would suffice with one.

Unfortunately, I think both of these are still very inefficient algorithms but I think is one of the
best things we can do given the constraints.

## Cooperate

Well, it turns out the elevator algorithm is implemented in hardware, not software. Thus, it is
impossible to change the algorithm. Is there anything we can do to make our broken elevator game better?

We have since assumed participants are strategic but do not work together. Let's say the
participants can get together and come up with an execution plan.

What I could come up with is the following plan.

1. Choose your direction truthfully 
2. Once in the elevator, you must exit as soon as the elevator stops once and switch with the person
   on that floor.

Given this execution plan, everyone is monotonically moving towards their desired floor. Let's go
through an example:

We have the following requests:
A: F9 -> F6
B: F7 -> F1
C: F6 -> F2
D: F3 -> F8

and the elevator is on floor 9.

The sequence would go as follows, A would get in at F9 and stop at F7 since B requested it. A and B
would change spots such that B would now be in the elevator. A will then re-request that he wants to
go down. B now goes from F7 to F6 and switches with C. C is lucky and gets to ride the elevator
straight to F2. Note we skip D since he acted truthfully and wants to go up. C now gets off at F2
and the elevator goes to F3. D also gets lucky and goes straight to F8. The elevator now stops at F7
where A is waiting and goes down to F7 where B is waiting. They switch spots again. B proceeds to
ride the elevator down to F1. The elevator goes up to pick up A at F7
and takes them to F6.

The observation here is there is no starvation whatsoever. Everyone is monotonically going towards
their destination.

However, there are clear flaws. Look at A, for instance, he has stopped an incredible amount of times
just to go down 3 floors. Further, there is work done that might not be necessary.

> Claim 4: The cooperative algorithm outperforms the greedy algorithm given a normal distribution.

This is an unsubstantiated claim. I have a gut feeling it would probably be correct but I'm not
convinced the social surplus of this algorithm is better than just being greedy as in the dominant
strategy. Depending on the distribution of the participants you could sway it one way or another.
However, I think with a random distribution this cooperative algorithm performs better.

Unfortunately, theoretical is all great but one gigantic hole in this algorithm is it amplifies the
number of human to human interactions. Since everyone has to switch on each floor there is more
chance they cross each other. Thus, the original goal of limiting cross individual interactions with
one household at a time in an elevator has been lost. Algorithms are great but always remember the
underlying goal you are trying to achieve.

This post was partly inspired by [Algorithms to live
by](https://www.amazon.com/Algorithms-Live-Computer-Science-Decisions/dp/1627790365).
