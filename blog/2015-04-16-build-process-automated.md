---
title: "Build Process Automated"
date: 2015-04-16
tags:
  - crochet-freebsd
  - u-boot
  - crochet
  - uboot
  - rpi
---

I finished automating the build process for Crochet Using the newest U-Boot.  
  
Clone my [Crochet Fork](https://github.com/rnikoopour/crochet) and then inside that clone my [UBoot Fork](https://github.com/rnikoopour/u-boot-rpi-2015). Set up your Crochet config file and run `sh crochet.sh -c <config_file>` and enjoy a bootable FreeBSD image for your RaspberryPi.

Please read `<u-boot-top>/doc/README.clang` since is a little bit of set up to do. Don't worry about the gmake stuff that's already taken care of =)
