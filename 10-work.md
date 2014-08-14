---
layout: page
title: Work
permalink: /work/
---

This is where my work will be displayed.

<div class="work">

	<ul class="posts">
	  {% for post in site.posts %}
	    {% if post.categories contains "work" %}
	      <li>
	        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
	        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
	      </li>
	    {% endif %}
	  {% endfor %}
	</ul>

</div>