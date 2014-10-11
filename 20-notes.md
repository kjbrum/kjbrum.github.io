---
layout: page
title: Notes
permalink: /notes/
---

<div class="page-notes">
	<ul>
		{% for post in site.posts %}
			{% unless post.categories contains "project" %}
				<li>
					<span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
					<a class="post-title" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</li>
			{% endunless %}
		{% endfor %}
	</ul>
</div>