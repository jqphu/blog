---
title: Ergodox configuration
layout: PostLayout
date: '2020-07-25'
tags: ['keyboard', 'configuration', 'optimization', 'ergodox']
---

I've been spending far too long asking myself questions like:

* *what* content to write about
* *how* do I write in an engaging manner
* *who* is the target audience

that I lost sight of the reason I wanted to start a blog which was a mechanism to help me
organize my thought process.

> "If you want to learn something, read about it. If you want to understand something, write about it.
> If you want to master something, teach it". - Yogi Bhajan 

So today as I was playing with my shiny new [Ergodox](https://ergodox-ez.com/) keyboard I decided to
just get started. Thus, here is the first, of hopefully many, blog posts!

# Why invest time in your computer setup?

<center>$$ Distance = Speed * Time $$</center>

A simple formula you will learn early on is $$ Distance = Speed * Time $$. If you want to go further than before you can increase your `Speed` and go faster or just spend more `Time`. We can
extend this formula to help us make decisions:

<center>$$ Value = RateOfReturn * Time $$</center>

To give you an example how to use this formula consider the choide of upgrading your kitchen equipment versus upgrading your computer chair. If you know me,
the time I spend in the kitchen is quite minimal compared to on the computer. Therefore, even if the
rate of return on new kitchen equipment is greater that of a computer chair the time spent on the
computer swings the scales towards upgrading your computer chair.

*Author note: This formula is clearly oversimplified. The way to visualise this is closer to a diminishing
return curve with an initial impedance cost. We will explore this in later posts.*

<center>
![ParetoPrinciple](/static/images/blog/2020-07-25-images/pareto_principle.png)
</center>

This principle related to the  [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle)
where by putting your effort in the 20% of things that matter you will reap 80% of the total
reward. The formula above is a great way to figure out what are the 20% of things that matter.

I spend a ridiculous amount of `Time` on my computer thus using the principle above improve it's
efficiency will result in a great amount of value. Thus, I spend a high amount of
effort optimizing things from my desktop environment (tiling manager, vim, etc) to my physical environment
(chair, table, etc).

After all that is said and done the real reason I spend so much time on my setup is simple -
learning and configuring is fun :).

# Why the Ergodox?

About a year or so ago, I started to experience wrist pain due to my over-use of the computer.
Unfortunately, the principle above worked in reverse where an unergonomic setup (negative rate of
return) was amplified by the large amount of time I spent on the computer resulting in my wrist pain.
Thus I invested time looking into my a more ergonomic setup.

<center>
![KensisAdvantage2](/static/images/blog/2020-07-25-images/kensis.jpg)
</center>

The first step towards this was purchasing the [Kensis advantage 2](https://kinesis-ergo.com/shop/advantage2/).
The Kensis Advantage 2 was difficult to get started with. My typing speed of about 130 words per minute (WPM)
dropped to a measly 50 WPM. This was not ideal as my productivity tanked.

*Note to future self: don't pick out a drastically new keyboard when starting a new job*.

However, despite this initial loss in productivity the benefits we're well worth it as it made my
wrist pain almost non-existent. I couldn't go anywhere without it.

<center>
![Ergodox](/static/images/blog/2020-07-25-images/ergodox.jpg)
</center>

The Ergodox is less ergonomic than the Kensis since it lacks the curved wells but what it loses
there it gains in configurability. Keyboard ergonomics aren't defined purely by the ease at which
we type things but extends to limiting the amount of typing we do. The Ergodox, in theory, enables previously
hard-to-reach and awkward keystrokes to become natural.

Additional benefits of the Ergodox include:
* Configurability is based in firmware which means it works out of the box on different computers.
* It is smaller and more compact. I hope to not get any more strange looks when I'm taking our my Kensis at
  the airport cafe.
* It is aesthetically pleasing to look at. Improved Happiness -> Improved Productivity.

Therefore I decided to get an Ergodox!

Customization:
* Ergodox Ez Original Standalone White
* Kailh Gold mechanical switches
* The Wing: Wrist Rest
* Tilt/Tent Kit

# Layers on layers on layers

The Ergodox has incredibly flexibility as seen by it's [configuration tool](https://configure.ergodox-ez.com/ergodox-ez/layouts/default/latest/0).
The main feature I wanted to play around with was layers which at the click of a button allows you
to access a completely different set of buttons.

The goal of this initial post is to provide the foundational layers that will be used and we will slowly explore adding
more layers and more layers in the future.

## Layer 0 - Main

<center>
![ErgodoxLayer0](/static/images/blog/2020-07-25-images/ergodox_layer_0.jpg)
</center>


I wanted to mimic the Kensis layout to allow myself to be productive immediately. Therefore, for the first
layer I made the following configurations:

* Match the thumbpad to the Kensis
  * I was used to and productive with this setup.
* Reverse the up-down arrow with the brackets.
  * I rarely use the arrow keys as I use vim bindings for everything. On the other hand I
    use brackets incredibly frequently.
* Reverse the left-right arrow keys
  * Same rationale as above.
* Map Caps Lock to escape on tap and control on hold.
  * This has been a killer optimization. Escape is a frequently used button in my editor VIM. 
    Doubling the button to be control allows it to be fairly natural to the position of
    control on a standard keyboard.
  * If I wanted to have a Caps Lock key I can easily configure it to double tap shift but I've
    rarely found the use for it.
  * Finally this is encoded in firmware as opposed to my Kensis where it was in software!
* Cleared unused keys to understand what real-estate I have to play with.
  * I hope to use the Hyper / Meh keys integrate with i3 in the future but for simplicity lets
    remove the clutter.

## Layer 1 - Misc 1

<center>
![ErgodoxLayer1](/static/images/blog/2020-07-25-images/ergodox_layer_1.jpg)
</center>


The second layer contains miscellaneous tasks I might want to use. This includes things like moving the mouse, controlling audio etc.

The hotkey for this is easily accessible by my pinky. I made it a hold-to-use layer as opposed to a
press to switch since I see most of the commands on this layer being a one-off rather than spending
a large amount of time on it.

Starting with a clean slate I made the following adjustments:

* Adding mouse controls to hjkl to match VIM.
  * A fascinating feature of the Ergodox is the ability to control the mouse simply using your
    keyboard. I definitely wanted to try this out since I already try to configure
    my desktop setup in such a way that I almost never have to remove my hands off the keyboard.This is done by
    using things like i3 and vimium. However, I have not been able to eliminate using the mouse completely
    so I'll see how easy it is to use the Ergodox mouse commands.
* Reset button (for quick flashing!)
  * I'll likely move this to a deeper layer in subsequent iterations as to not accidentally press it
    and flash my firmware.
* Function keys
  * Pretty self-explanatory. I rarely use function keys but when doing things like entering bios
    I'll inevitably need them.
* Volume controls
* Prev/Next & Play buttons
  * These currently don't work with Spotify but do work for VLC. I'll have to play around with these
    a little more.


## Future additions

For now this is a pretty bare bones configuration and this is done intentionally. I want to get used
to the Ergodox before I start overloading it with features.

Future additions can include:
* An i3 layer.
  * Currently I used `alt` as my modifier for i3 but theres no reason I can't have a logical layer
    for that. This layer can help with simplifying things such as `Ctrl+Alt+hjkl` to move
      workspaces.
* A layer based on projects
  * I can envision layers where the layout is the same but runs different commands. For example I
    have a layer where switching to it, it types out the build & test command. Depending on whether
    I activate the work layer or the personal project layer it types out a different command!

An that's it! A bare bones Ergodox configuration. I'm certain in a year when I read this blog post
back I will laugh at how simple the configuration is.

Thanks for reading!

If you read the whole post then I'm shouting you a coffee :).
