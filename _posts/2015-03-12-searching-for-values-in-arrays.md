---
layout: post
title: "Searching for Values in Arrays"
date: 2015-03-12
categories: [Snippets, PHP]
---

While dealing with 3rd party API's, it's common to deal with multidimensional arrays. Unfortunately PHP only has a built in function for looking for a value in a single dimension array.

This snippet will loop through all the arrays inside the multidimensional array and looks for the supplied value. This function will work with single dimension arrays, multidimensional arrays, and associative arrays.

<script src="https://gist.github.com/kjbrum/73e89a40e14631c08553.js"></script>
