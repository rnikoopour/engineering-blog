---
title: "Autobooted to FreeBSD's loader"
date: 2015-04-26
tags:
  - u-boot
  - freebsd
  - uboot
  - rpi
  - raspberry pi
---

The [GPS addon](http://imall.iteadstudio.com/raspberry-pi-gps-add-on.html) I use with for my RaspberryPi starts sending information to the RPi through the GPIO the second it tuns on. The RPi reads this as input to the serial console and this interrupts UBoot's autoboot process.

In order to fix this you had to use set autoboot to only stop when a certain string is typed in during the autoboot countdown. The following changes are made to **UBoot/include/configs/rpi.h**.

First we enable autoboot by adding `#define CONFIG_BOOT_DELAY N`, where N is a number of seconds. Then we enable the advanced autoboot controls by adding `#define CONFIG_AUTOBOOT_KEYED`.

Next we need to print out a prompt to the user to let them know that we are waiting for autoboot. To do this we define `#define CONFIG_AUTOBOOT_PROMPT str,bootdelay`, where "str" is a string that takes the format of a call to printf() and allows variable input. I set my str to `"autoboot in %d seconds\ntype 'stop' to get to UBoot\n",bootdelay`.

Finally we define the string that must be typed in after the prompt appears in order to get into UBoot. This is achieved by adding `#define CONFIG_AUTOBOOT_STOP_STR str`, where str is the string that needs to be typed in.

Now when I turn on my RaspberryPi I still have serial access if I need it. Now I have to configure **loader.conf** to not listen to the serial port.
