---
layout: post
title:  "Search and Kill Processes"
date:   2015-08-17
categories: [Bash]
---

The other day I was working on getting a Vagrant box set up. I ran into an issue where I couldn't destroy the box and couldn't find out why. I ended up needing to kill all the Vagrant processes that were running on my machine.

I learned that it's not exactly the easiest to search for a process and kill it, so I decided to make a little bash script that would let me search all the processes for a string. This would then return an array of process IDs that I could loop through, and kill, one by one.

___Caution:__ Beware what processes you are killing, you could get undesired results._

<script src="https://gist.github.com/kjbrum/ced851437f3fb8190299.js"></script>
