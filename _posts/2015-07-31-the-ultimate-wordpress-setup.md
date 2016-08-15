---
layout: post
title: "The Ultimate WordPress Setup"
date: 2015-07-31
categories: [Tips & Tricks, WordPress]
featured_image: the-ultimate-wp-setup.jpg
---

![The Ultimate WordPress Setup]({{ site.url }}/media/posts/the-ultimate-wp-setup.jpg)

<p>If you haven't noticed by now, here at Happy Medium, we like to make WordPress sites. The majority of our sites we create are done with <a href="https://wordpress.org/">WordPress</a>. I don't think I'm alone when I say setting up a new project sucks. There are just so many things you have to remember to do and it seems like a never ending list. When I started at Happy Medium, I remember learning the process of setting up a new website, it was a lot to remember. It's not like it was <em>terrible</em> or anything, it was just a lot for a new employee&nbsp;to learn, as well as being pretty time consuming. If you read my last blog post, you may recall me saying that&nbsp;if I can make something more efficient, I am going to. &nbsp;</p>

<p>&nbsp;</p>

<h2 id="theproblem">THE PROBLEM:</h2>

<p>Let me give you an example. I have a task to set up a new WordPress site for "Client X". A typical workflow would look something like:</p>

<ul>
<li>Create a&nbsp;<a href="https://git-scm.com/">Git</a> repository (<a href="https://github.com/">Github</a> / <a href="https://bitbucket.org/">BitBucket</a>)</li>
<li>Setup a staging server</li>
<li>Clone our base WordPress repo</li>
<li>Clone our base plugin and theme</li>
<li>Create a local database</li>
<li>Run the, <em>very simple</em>, prepare script</li>
</ul>

<p>That's just to name a few, but if you are like us, you have a laundry list of tasks to complete before actually have&nbsp;a new site up and running. For setting things up, we&nbsp;use a tool called&nbsp;<a href="https://github.com/Mixd/wp-deploy">wp-deploy</a>.&nbsp;It's a framework for deploying WordPress sites using <a href="http://capistranorb.com/">Capistrano</a>, it's pretty amazing. Along with deployment, it also has WordPress included as a <a href="https://git-scm.com/book/en/v2/Git-Tools-Submodules">submodule</a>. Now this is all fine and dandy, but it doesn't help a whole lot with the initial setup of a site.</p>

![Struggle Puppy]({{ site.url }}/media/posts/struggle-puppy.gif)

<p>&nbsp;</p>

<h2 id="thesolution">THE SOLUTION:</h2>

<p>I have been trying to learn more about bash scripting lately, so I figured this would be a great opportunity to learn a few things and make the team's lives a little easier. I started&nbsp;by breaking the setup process into small chunks and tackling them one by one. I started with the base <a href="https://github.com/Mixd/wp-deploy/blob/master/config/prepare.sh">prepare.sh</a> script and expanded on it. The&nbsp;overall goal of the script was to make it so the user would only have to answer simple prompts and make as few decisions as possible.</p>

<h3 id="configuration">CONFIGURATION</h3>

<p>The first thing you have to do with a new wp-deploy project, is setup your configuration file.&nbsp;The simplest thing to do was to ask the user to input the project "slug". If we continue with our example, our slug would be "clientx". Once the user inputs the project slug, it's smooth sailing from their.</p>

<p><strong>Note:</strong> Before running the script, you will need to add your credentials to the config.cfg file. This is used to&nbsp;keep your personal information in it's own file and separate from the script.</p>

<p><strong>Tasks Completed:</strong></p>

<ul>
<li>Clone the latest version of WordPress</li>
<li>Update the configuration files with the project slug</li>
<li>Create a local database</li>
<li>Install Ruby dependencies</li>
<li>Set up WordPress locally</li>
</ul>

<h3 id="bitbucket">BITBUCKET</h3>

<p>Here at HM, we like to use Bitbucket for storing our projects. If you don't use version control, you should! For every project we need to create a new repository for storing the code. To make this work, I used BitBuckets API. After running a couple <a href="http://curl.haxx.se/">curl</a> requests you will have a new repository with all your&nbsp;deployment keys. <a href="https://confluence.atlassian.com/display/BITBUCKET/repository+Resource#repositoryResource-POSTanewrepository">Read More on the BitBucket API.</a></p>

<p><strong>Note:</strong> Your deployment keys will need to be added to the deployment.txt file. </p>

<p><strong>Tasks Completed:</strong></p>

<ul>
<li>Create a BitBucket repository using the project slug</li>
<li>Add your deployment keys to the new repository</li>
</ul>

<h3 id="serverpilot">SERVERPILOT</h3>

<p>We use ServerPilot for managing all our projects and servers. Just like our repository, we need to set up a new staging site. I took the same approach with this, using a couple curl requests got the job done.&nbsp;I found out that when you create a new ServerPilot app, it isn't instantly available to have a database added to it. To fix this&nbsp;I had to do a bit of text parsing in order to get the information I needed. I stored&nbsp;the app creation request&nbsp;in a variable and then parsed it to get the new app ID&nbsp;(used to create the database) and the action ID (used to check when the app was created). After the app was finished being created, I was able to add a database using the previously parsed app ID. <a href="https://github.com/ServerPilot/API">Read more on the ServerPilot API.</a></p>

<p><strong>Tasks Completed:</strong></p>

<ul>
<li>Create a new ServerPilot application</li>
<li>Create a new database for the application (randomly generated username and password)</li>
<li>Update the database.yml with the database credentials</li>
</ul>

<h3 id="pluginsthemes">PLUGINS/THEMES</h3>

<p>For most projects, we have our own plugin and theme that we have rolled up to help get things started and create consistency. Along with those we have a few plugins that find their way into almost every project as well. To get these set up, we would have to clone each one of them into their respective directories&nbsp;(plugins or themes). Additionally, our theme comes Grunt ready with a few helpful tasks (Sass compiling, minification, browser syncing, SVG spriting). In order for all these to work properly, we have to install our <abbr title="Node Package Manager">NPM</abbr> packages and run our default&nbsp;Grunt task. Simple enough, just a couple commands and we're good to go!</p>

<p><strong>Tasks Completed:</strong></p>

<ul>
<li>Clone the needed plugins and themes</li>
<li>Update the Gruntfile with our project slug</li>
<li>Install NPM packages</li>
<li>Run the initial Grunt task</li>
</ul>

<h3 id="miscellaneous">MISCELLANEOUS</h3>

<p>There is an amazing WordPress tool call <a href="http://wp-cli.org/">WP-CLI</a>&nbsp;and if you haven't heard of it, you should check it out. In short, it gives you a <abbr title="Command Link Interface">CLI</abbr> for WordPress. Throughout the script, various tasks are completed using the CLI.</p>

<p><strong>Tasks Completed:</strong></p>

<ul>
<li>Activate plugins and theme</li>
<li>Create a primary menu (Main Menu)</li>
<li>Create a "Home" page and set it to the front page</li>
<li>Create additional pages (the user is prompted to input a comma separated list of pages)</li>
<li>Create a "Blog" page and set it to the page for posts</li>
<li>Update rewrite structure and timezone</li>
</ul>

<p>&nbsp;</p>

<h2 id="theresult">THE RESULT:</h2>

<p><em><strong>Where does this leave us?</strong></em></p>

<p>We can now set up a new WordPress site with only a few keystrokes!&nbsp;This is amazing news. A task that use to take us anywhere from 15 - 30 minutes, now only takes us around 5 minutes. With all that extra time, you could easily get through another HM blog post!</p>

![Mind Blown]({{ site.url }}/media/posts/mind-blown.gif)

<p><em><strong>Where do we go from here?</strong></em></p>

<p>Obviously this script isn't going to fit into everybody's workflow perfectly, but I'm sure there are pieces that can be extracted and used on their own in a lot of cases. Finding that perfect setup is like finding a unicorn. Although there are always going to be ways to improve, hopefully this will at least help you head in that direction. &nbsp;</p>

<p>&nbsp;</p>

<h2 id="tldr">TL;DR:</h2>

<p>Setting up a new WordPress site takes way too long, and there are too many things to remember to do. This script solves that problem.</p>

<p><strong>What this&nbsp;script will do:</strong></p>

<ul>
<li>Clone the latest version of WordPress</li>
<li>Update the configuration files with the project slug</li>
<li>Create a local database</li>
<li>Install Ruby dependencies</li>
<li>Set up WordPress locally</li>
<li>Create a BitBucket repository using the project slug</li>
<li>Add your deployment keys to the new repository</li>
<li>Create a new ServerPilot application</li>
<li>Create a new database for the application (randomly generated username and password)</li>
<li>Update the database.yml with the database credentials</li>
<li>Clone the needed plugins and themes</li>
<li>Update the Gruntfile with our project slug</li>
<li>Install NPM packages</li>
<li>Run the initial Grunt task</li>
<li>Activate plugins and theme</li>
<li>Create a primary menu (Main Menu)</li>
<li>Create a "Home" page and set it to the front page</li>
<li>Create additional pages (the user is prompted to input a comma separated list of pages)</li>
<li>Create a "Blog" page and set it to the page for posts</li>
<li>Update rewrite structure and timezone</li>
</ul>

<p>Think you have a better WordPress setup? Let me know in the comments. I'm always looking for ways to improve the way we do things here.</p>

<p>Feel free to head over to&nbsp;Github&nbsp;and grab <a href="https://gist.github.com/kjbrum/04a243995c3334edbd23">the script</a>.</p>
