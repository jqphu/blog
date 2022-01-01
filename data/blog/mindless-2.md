---
title: Mindless[2] - A Mindless Week
layout: PostLayout
date: '2020-08-29'
tags: ['mindless']
---

# Cheating On Your Exams

If you ever asked me how do you do well in university exams my answer would be simple - cheat. Now I
don't mean the peek over at your neighbor's assignment cheating but rather cheat the system. Let's
say you're two weeks out from your exam and you've been too busy getting drunk and making bad
decisions to go to classes. You have four courses and have no idea where to begin. The goal is
simple:

**Achieve the highest marks possible in our exams.**

Let's break down what I think the ideal strategy would be.

## Start From the End

Starting from the past-exams separate questions into three categories: Foundational, Expected and
Curveball.

Foundational problems are those that if you do not learn there is absolutely no hope to pass the exam.
Additionally, these questions will repeat themselves every year.

Expected problems that require a little more thinking and these appear every year with some
slight variation. You are expected to know how to solve these to pass the exam.

Curveball problems are those that will rigorously test your understanding of the problem. These vary
drastically from year to year and are quite difficult to prepare for.

For example in a trivial mathematics exam you have these problems in the categories:

Solve for x.

Foundational:  <center> $$ x^2 - 5x + 6 = 0 $$ </center>

Expected: <center> $$ \frac{(x^{2002} + 4x^{2001})}{(4x^{2000})} = 2449.25 $$ </center>

Curveball: <center> $$ \sqrt{6 + \sqrt{6 + \sqrt{6 + \sqrt{...}}}} = x $$ </center>

After this categorization, we want to spend as much time as possible in the foundational problems
understanding core concepts and validating understanding. Only once we've mastered the foundational
problems should we move on to practicing expected problems. Finally, we need to be aware of
curveball problems and possible solutions but should not invest a heavy amount of time into
understanding them.

This technique can be further simplified to *focus on what has the most impact*. You could focus all
your time on the Curveball questions but the chances that what you practiced will appear in the exam
will be slim to none.

## Feedback Loop

Now we know we need to spend most on concepts in the foundational category. However, how do we know
when we've mastered a topic?

<figure>
<center>
  <img src="/static/images/blog/2020-08-29-images/feedback_loop.png" alt="Closed-loop System">
  <figcaption> Closed-loop System </figcaption>
</center>
</figure>

The answer is a **feedback loop**. The input you put in is the time spent learning. For the first
phase the controller does nothing. The input then goes into the black block which is the exam and
the output here is your result. Based on your result the feedback goes into the controller and you
tweak the amount of time you need to spend on this topic.

This feedback loop is essential to provide immediate feedback such that you don't
spend too much time on the wrong thing.


# Cheating On Your Software Engineering Project

You might be thinking "that's some pretty obvious advice Justin, thanks for nothing >:(" and you
wouldn't be wrong. However, it seems like the most obvious techniques reap the most rewards.

Let's see how this applies to my Mindless project. The goal is also quite simple:

**Enable people to be more aware of their time and choices.**

Let us refine this goal a little bit into a short term goal.

**Allow people to track where they are spending their time.**

Okay, with this in mind let's start from the end and figure out the type of problems we might
encounter.

## Start From the End

Foundational problems are now those that the product will not be viable if they do not succeed.

Required problems are also incredibly important. Without such the product will not be fully viable
but may see some usages.

Curveball problems are those which may de-rail the project but are very difficult to prepare for.
That is you could spend lots of time on one curveball problem only to find out it is not the right
problem at the time.

Foundational:
* Provide a simple interface to track time.
* Persistently store the user's data.
* Retrieve and visualise the data.

Expected:
* Predictive task.
* Provide richer task categorization.
* Automate tracking process.
* Edit tasks.

Curveball:
* Performance problems.
* Stability problems.
* Scaling problems.
* Accessibility problems.

This categorization can also be though of figuring out critical features which will make or break us
achieving the goal.

## Feedback Loop

Despite how confident we are that a certain feature will be great, at the end of the day the only
judge is the user. That is we need to feed our product through the black box system to see what
comes out. That is we cannot be heads down building features without testing them out in the wild to
validate our assumptions.

A rapid iteration cycle is very important to continually get feedback and continually adjust
where time is being spent. We don't want to spent a long time trying to achieve our destination only
to realize that we have been going the wrong direction for a long time.

# A Reflection

The most pressing foundational problem is figuring out a simple interface to track time.
Just like an exam question this is not about best effort, you either meet the threshold and get it right
or you get zero marks. The earlier approaches to use a FB chat bot and QR
codes resulted in feedback that allowed us to iterate and try new things. Using hackathons as a tool
for a quick set of iterations was essential.

An area where we failed to take advantage of the feedback loop was attempting to store the users
data. Multiple iterations were spent on this jumping between languages and databases. These provided
**zero** user facing value and we're addressing problems in the Expected / Curveball categories.
There was no data to indicate that a re-work needed to be done.

Takeaway:
* Small fast iterations are important to validate assumptions to ensure you're going on the right
  path.
* Makes changes only if there is actionable feedback, otherwise this is wasted effort. 

# Mindless v0.0.1

Let's now evaluate the first iteration of this new project.

Despite having about 100 more features on the list I wanted to add I knew I needed to get feedback
to make sure I was on the right path. Thus, after focusing on getting End to End integration I
decided I will use the application for a week in its half baked state.

## App

<figure>
<center>
  <img src="/static/images/blog/2020-08-29-images/mindless_data.png" alt="Mindless data">
  <figcaption> Mindless Data After A Week</figcaption>
</center>
</figure>

*It's interesting I spent only 13 hour working during the week...*

### Feedback

Bad:
* The numbers underneath each category are close to useless. I cannot sort by day but get a
  cumulative time. After using this for a month these times will be absurd.
* Finding my task is hard. It's fine now but as I get more tasks I'm going to get lost. 

Good:
* Tracking tasks and adding tasks is simple. Simply, press play on what you want and the most recent
  tasks go to the top.

These concerns in the bad category were completely valid and need to be addressed. However, issues
pertain to those in the expected problems not the foundational problems. As we will soon explore
there we much more pressing issues at hand!

## Calendar View

The more interesting view is a calendar view to see where my time is going. Here is a
calendar day-to-day view of the app. I will skip a few days that I did not find interesting.

### Monday

<figure>
<center>
  <img src="/static/images/blog/2020-08-29-images/mindless_data_calendar_monday.png" alt="Mindless Data Calendar
  Monday">
  <figcaption> Mindless Data Calendar - Monday</figcaption>
</center>
</figure>

There is a lot to unpack here.

1. Why did my night routine go until 4:30 am? I guess I forgot to switch to the Sleep task.
2. I played tennis at 7 am then I also played at 9:14 am? That's a lot of tennis... (hint I did not
   play that much tennis).
3. Huge gaps?

#### Feedback

Turns out I had two major issues with the tracker.
* Task tracking did not work in the background meaning you had to keep the app open in the
  foreground. This made it absolutely unusable.
* It is easy to forget to track tasks...

The first problem was a technical problem which I can solve. I went ahead and fixed that
to allow tracking with the app in the background. In fact I went a step further and allowed
continued tracking when the app wasn't even open.

### Wednesday

<figure>
<center>
  <img src="/static/images/blog/2020-08-29-images/mindless_data_calendar_wednesday.png" alt="Mindless Data Calendar
  Wednesday">
  <figcaption> Mindless Data Calendar - Wednesday</figcaption>
</center>
</figure>

With the task tracking in the background fixed I was able to continually track my tasks! Interesting
information:

1. Tennis at 7:19 am must have been a mistake.
2. Very coarse grained tasks.

#### Feedback

* There is no easy way to delete instances of tasks. This creates noise.
* **There is too much friction to remembering transitioning between tasks**.

Okay, the first problem is definitely a real problem but again it is an expected problem. We punt this
problem off to the background. There is still a critical problem of not being able to seamlessly
start new tasks.

### Thursday

<figure>
<center>
  <img src="/static/images/blog/2020-08-29-images/mindless_data_calendar_thursday.png" alt="Mindless Data Calendar
  Thursday">
  <figcaption> Mindless Data Calendar - Thursday</figcaption>
</center>
</figure>

This was a uh... interesting day.

1. Looks like we really liked looking at memes. Don't tell my boss that that's what I did all day!
   In reality this was again likely me forgetting to switch back to work after taking a quick break.

#### Feedback

* Cannot edit events after the fact. In this scenario I saw that memes were running for >5 hours but
  I had no way to fix it and replace it with work.

## Overall Analysis

There are a bunch of problems to say the least, but the beauty of feedback is to be able to iterate
quickly and focus on the most important problems.

There are key quality of life issues like not having task categories, deleting tasks, editing tasks,
searching for tasks etc. These are absolutely important but they do not address the foundational
problem.

**If there is no way for us to easily transition between tasks then the viability of the product
drops to zero.**

In terms of where to be spending our time, evaluating the viability of this technique is the utmost
importance.

Furthermore, fixing this problem will hopefully fix the underlying problem of not having more tasks.
The more fine grained your tasks are the most information you can use, however, that relies on it
being easy to transition between tasks.

# Action forward

The problem statement we need to solve is:

**Reduce the friction when changing tasks**

Here is the key insight that I tried to employ with QR codes but failed.

**Tasks are almost always location-based.**

If I'm going to sleep I'm going to be next to my bed, if I'm working I'll be at my
desk, if I'm eating I'll be at the kitchen etc. However, even with this key analysis QR codes did
not work due to the friction of having to open up the camera and click a link. We need to somehow
have less friction that opening up the camera application and scanning a QR code.

Assumptions:
* Tasks are location-based. 
* Needs to be less friction that scanning a QR code.

To restrict the problem scope, I focus on how this will work for me. Getting this to work in
the general case for everybody will be a completely different beast but if I can't use my
product then it has failed. Thus, we look into more intrusive approaches to tracking tasks.

At this point, the goal that I'm trying to achieve is an indoor positioning system. GPS won't work
due to the lack of granularity. This class of systems are known as [Real-time locating
systems](https://en.wikipedia.org/wiki/Real-time_locating_system).

Approaches:

## WiFi Positional Sensing

Using my WiFis router to determine where someone is seems promising. However, this requires a
mesh network of multiple WiFis which is not suitable for room-scale tracking.

## Motion Sensors

What's better than doing some work? Doing no work at all!

The first approach was to use motion sensors to detect when you transition into another state.
Having a motion sensor when I enter my bed or go into the kitchen.

Pros:
* Zero input whatsoever

Cons:
* Expensive.
* Requires somewhat non-trivial setup.

Risk:
* Fragile? How sensitive are these sensors? Will I get a lot of false positives or false negatives?

## Camera

Computer Vision is at a very impressive state and being able to detect where I am would be
incredibly useful.

Cons:
* Expensive
* Requires multiple cameras since one camera field of view will not be enough.
* Not sure I want a camera recording me 24/7 :) 

# The Next Iteration - NFC
I realized getting a real time locating system is too expensive. It also is overly
complex for my use case. I don't need consistent tracking but rather just need to track once in the 
transition points.

Going back to my original problem with QR codes is the two steps to scan the code. What if you never
needed to use your camera to scan the QR code but there was a better way.

Here enters NFC tag, by scanning this from a NFC reader I would be able to track my next task.
This reduces the amount of steps to a single scan of my phone.  

Pros:
* Cheap - I can order heaps of these at little cost.
* Simple - no ML required, just a simple NFC chip to send a message to my app to then send a http
  request.

Cons:
* Still requires you to unlock your phone.
  * The good news is that you don't need the app active in the foreground to scan the chip.
    Therefore, in theory I can scan the chip and just use the fingerprint to unlock my phone without
    ever having to look at the screen.

Risk:
* How hard is it to reprogram the NFC tag? Can I embed reprogramming the tag into my app itself?

This seemed like the best approach of the bunch. It will allow us to validate the assumption that
tasks are mostly location-based. We can expand on this idea later such that when we scan a NFC chip
the app opens up a fine grained view of what tasks can be done at that location. Best of both
worlds!

Furthermore, NFC chips don't just allow us to have location-based task tracking but rather also object based. I can start
sticking NFC tag on my gym bag to indicate I'm going to the gym or my bike if I'm going for a bike
ride. 

However, does this make task tracking seamless enough that I'll actually do it consistently? There's only one way
to find out and that is to try it.

# Summary

Having a feedback loop with everything you do is incredibly important. Without feedback, you might as
well be doing a random walk. Use the feedback to invest your time on the most important problems. Minimize
iteration time to spend as much time in the feedback loop as possible.
