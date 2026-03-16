---
title: "U-Boot Update"
date: 2015-02-27
tags:
  - u-boot
  - uboot
  - rpi
  - raspberry pi
---

I've set up a way to build the project without having Crochet involved in building U-Boot. Unfortunately, I'm running into an issue. U-Boot drops me directly into the U-Boot shell but I'm unable to use my USB keyboard.

First things first, I disabled net booting. Removing **func(PXE, pxe, na) \** and **func(DHCP, dhcp, na)** from **uboot/include/configs/rpi.h** disables net booting. I removed this since I'm only booting from the SD card in the RPI.

The README in **uboot/** shows that USB Keyboards can be used inside the U-Boot environment. However, there's not a list of devices supporting USB Keyboards so I assumed that they worked on all devices. That was not the case.

U-Boot USB Keyboard support for the Raspberry Pi is currently under development by [Stephen Warren](https://github.com/swarren). According to a [recent commit](https://github.com/swarren/u-boot/commit/6b8111f592184610b6e55d4c7a1fecd9791d654d) he is having trouble getting U-Boot's drivers to work with USB Keyboards.

Since the GPS device uses the Raspberry Pi's GPIO slot, I'm going to disable serial input and output in **uboot/include/configs/rpi.h** by removing "serial," from **"stdin=serial,lcd\0" \** **"stdout=serial,lcd\0" \** **"stderr=serial,lcd\0"**. The GPS's communication will not get interpreted as commands for the U-Boot prompt.

Since I'm removing the ability to interact with the U-Boot prompt, I'm going to use [Oleksandr Tymoshenko's](https://github.com/gonzoua) approach. This involves [setting up environment variables and using CONFIG\_BOOTCOMMAND](https://github.com/gonzoua/u-boot-pi/blob/rpi/include/configs/rpi_b.h#L104-L125). Since the memory layout is the same as Oleksadr Tymosheko's, I'm going to see if his boot commands will work.
