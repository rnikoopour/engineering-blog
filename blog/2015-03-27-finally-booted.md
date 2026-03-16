---
title: "Finally Booted!"
date: 2015-03-27
tags:
  - crochet-freebsd
  - u-boot
  - freebsd
  - crochet
  - uboot
  - raspberry pi
---

I finally got Crochet-FreeBSD to build an image that can boot the Raspberry Pi using the newest version of UBoot. Specifically [U-Boot-2015.01.tar.gz](ftp://ftp.denx.de/pub/u-boot/)

There are three define statements that need to get added to the configuration file. There are also three files that need patches.

The define statements get added to `u-boot/include/configs/rpi.h`. They are `#define CONFIG_API`, `#define CONFIG_CMD_ELF`, and `#define CONFIG_SYS_MMC_MAX_DEVICE 1`.

The first patch includes libc in the make process. To do this change line 668 in `u-boot/Makefile` from `PLATFORM_LIBS += $(PLATFORM_LIBGCC)` to `PLATFORM_LIBS += $(PLATFORM_LIBGCC) -lc`.

The second patch is to change line 40 in `u-boot/examples/api/Makefile` from `cmd_link_demo = $(LD) --gc-sections -Ttext $(LOAD_ADDR) -o $@ $(filter-out $(PHONY), $^) $(PLATFORM_LIBS)` to `cmd_link_demo = $(LD) --gc-sections -static -Ttext $(LOAD_ADDR) -o $@ $(filter-out $(PHONY), $^) $(PLATFORM_LIBS)`.

These two patches and the define statements are described in Crochet's [NewBoardExample's](https://github.com/rnikoopour/crochet-freebsd/tree/master/board/NewBoardExample) README.

The last patch is to disable high speed sdhci support. To do this change line 494 in `u-boot/drivers/mmc/sdhci.c` from `host->cfg.host_caps = MMC_MODE_HS | MMC_MODE_HS_52MHz | MMC_MODE_4BIT;` to `host->cfg.host_caps = MMC_MODE_4BIT;`.

This last patch is bundled with Crochet, but is Raspberry Pi specific.

In addition to these changes, there are changes to Crochet itself.

Line 144 in `crochet-freebsd/lib/uboot.sh` needs to change from `if gmake SED=gsed HOSTCC=cc CROSS_COMPILE=${FREEBSD_XDEV_PREFIX} $2 > $1/_.uboot.configure.log 2>&1; then` to `if gmake CC="clang -target arm-freebsd-eabi --sysroot /usr/armv6-freebsd -no-integrated-as -mllvm -arm-use-movt=0" $2 > $1/_.uboot.configure.log 2>&1; then`.

In that same file line 168 changes from `if gmake SED=gsed HOSTCC=cc CROSS_COMPILE=${FREEBSD_XDEV_PREFIX} > $1/_.uboot.build.log 2>&1; then` to `if gmake CC="clang -target arm-freebsd-eabi --sysroot /usr/armv6-freebsd -no-integrated-as -mllvm -arm-use-movt=0" -j8 > $1/_.uboot.build.log 2>&1; then`.

These changes are required by UBoot when building with clang. There is a bit of configuring to be done described in `u-boot/docs/README.clang`.
