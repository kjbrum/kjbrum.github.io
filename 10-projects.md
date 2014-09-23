---
layout: page
title: Projects
permalink: /projects/
---

<div class="page--projects">

	{% for post in site.categories.project %}
		<a class="project--single" href="{{ post.url | prepend: site.baseurl }}" style="background: url('/build/img/{{ post.image }}') no-repeat center center">
			<div class="project--single--overlay">
				<h3 class="project--single--title">{{ post.title }}</h3>
			</div>
		</a>
	{% endfor %}

</div>