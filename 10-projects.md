---
layout: page
title: Projects
permalink: /projects/
---

<div class="page--projects">

	{% for post in site.categories.project %}
		{% assign title = post.title | split: ' ' %}
		<a class="project--single" href="{{ post.url | prepend: site.baseurl }}" style="background: url('/build/img/{{ post.image }}') no-repeat center center">
			<div class="project--single--overlay">
				<div class="project--single--title">
					<div class="project--single--line-top"></div>
					{{ title[0] }} <span>{{ title[1]}} {{ title[2] }} {{ title[3] }}</span>
					<div class="project--single--line-bottom"></div>
				</div>
			</div>
		</a>
	{% endfor %}

</div>