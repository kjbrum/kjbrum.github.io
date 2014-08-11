---
layout: page
title: Portfolio
permalink: /portfolio/
---

This is where portfolio items will be displayed.

<div class="porfolio">

	<ul class="posts">
	  {% for post in site.posts %}
	    {% if post.categories contains "portfolio" %}
	      <li>
	        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
	        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
	      </li>
	    {% endif %}
	  {% endfor %}
	</ul>

</div>