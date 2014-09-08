---
layout: page
title: Projects
permalink: /projects/
---

This is where my projects will be displayed.

<div class="project">

	<ul class="posts">
	  {% for post in site.posts %}
	    {% if post.categories contains "project" %}
	      <li>
	        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
	        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
	      </li>
	    {% endif %}
	  {% endfor %}
	</ul>

</div>