---
title: "Blog Migration with Claude"
date: 2026-03-17T18:00:00
tags:
  - claude
  - ai
  - blog update
---

I want to start off by stating that all prose is written by a human.  I use
Claude to help me build tools and to insert links into posts I write.  Claude
does not generate my posts.

---

It's been nearly 10 years since I last wrote a blog post.  This blog used to
be a Blogger site.  I took it down when I noticed a bunch of spam comments
that needed to be cleaned up.  But then in the shuffle of life I never migrated
it anywhere.

I recently dabbed a Claude Code subscription and after refactoring a few tools
I recently built I wanted to see if I could get my blog back up and running
using Claude.

I backed my blog using Blogger's export capabilties.  This provided me an atom
feed of my blog posts.  Using Claude I setup a plan to take the existing blog
and migrate it to a [Docusaurus](https://github.com/facebook/docusaurus) site.

Claude wrote a Python script to extract the post text and convert it from HTML
to Markdown using [markdownify](https://github.com/matthewwithanm/python-markdownify).
After converting them to markdown I had Claude review to identify any broken
links or missing iamges.  Claude identified a few dead links and some images
that were not downloaded as part of the backup since they expired from Blogger's
CDN.

I then used Claude to help me build out the menu.  This was really helpful since
I haven't done frontend work in a long time.  It did take serveral iterations
to get the menu where I wanted it.

Once I had my working Docusaurus site, I setup a Github Pages website and
configured [Giscus](https://github.com/giscus/giscus) to be able to support comments.

Being able to use Claude to accelerate the more tedius parts of the migration
was super helpful.
