---
layout: post
title: "Automated Cache Busting Styles and JavaScript"
date: 2015-01-27
categories: [Snippets, Tips & Tricks, WordPress]
---

Browser caching can be the worst sometimes. You make a change to a client's site, tell them it's live, and the next thing you know they are telling you it's not showing up.

This can happen a lot when you making style changes. To alleviate this issue, we can add a version to our stylesheets and JavaScript files. We do this by using the the file's last modified time as the version.

<script src="https://gist.github.com/kjbrum/76a301b9086357a89bab.js"></script>
