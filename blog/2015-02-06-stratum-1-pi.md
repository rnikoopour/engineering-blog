---
title: "Stratum-1 Pi"
date: 2015-02-06
tags:
  - freebsd
  - rpi
  - ntp
  - raspberry pi
---

This winter I asked one of my professors for a project to work on. We pitched a couple of ideas back and forth before settling on a Stratum-1 time server.

I decided to use a [Raspberry PI](http://www.raspberrypi.org/) and [FreeBSD 10.1](https://www.freebsd.org/releases/10.1R/announce.html). Since this will be a Stratum-1 time server a GPS device was required. I chose the [Raspberry PI GPS Add-on](http://imall.iteadstudio.com/raspberry-pi-gps-add-on.html) by [iteadstudio](http://imall.iteadstudio.com).

I chose [Crochet-FreeBSD](https://github.com/kientzle/crochet-freebsd) as my build tool. Crochet uses an older version of [Das U-Boot](http://www.denx.de/wiki/U-Boot/WebHome). I forked Crochet and am working on making it compatible with the newest version of U-Boot.
