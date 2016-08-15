---
layout: post
title: "Hiding the H1 Option in the WordPress Editor"
date: 2015-09-29
categories: [Snippets, WordPress]
---

Often when creating a WordPress theme, I will program the <code>page.php</code> template file to display the post title with an <code>&lt;h1&gt;</code> tag. Now I'm not an SEO strategist, but I do know that you are only suppose to have one <code>&lt;h1&gt;</code> tag on a page. Because of this, it makes sense to not allow the end user of the theme to add <code>&lt;h1&gt;</code> tags to their post content.

This little snippet will modify the TinyMCE editor, and remove the "Heading 1" option from the formatting dropdown. This should allow to rest easy, assuming the client doesn't decide to add the tag manually...

<script src="https://gist.github.com/kjbrum/da4eb508be09b9c336a9.js"></script>
