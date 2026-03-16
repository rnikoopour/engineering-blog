---
title: "Dungeon Souls Save Editing"
date: 2016-12-20
tags:
  - re
  - reverse engineering
  - game cheat
  - dungeon souls
---

# Dungeon Souls Save Edit

I’ve been playing a game called [Dungeon Souls](http://store.steampowered.com/app/383230/). It’s a rouge like that difficult at first, but then becomes extremely fun once you get the hang of it.

After playing for a bit, I started messing around with [Bit-Slicer](https://github.com/zorgiepoo/Bit-Slicer) to give myself massive HP regen and a bunch of damage, I wanted to do something a bit more fun. I wanted to edit my save.

A quick Google search for the save location came up empty. I needed to watch which files the process interacted with during so I could find them.

To do this I ran `sudo fs_usage | grep Mac | less`. I then launched and exited the game which generated a nice list of file system usage. While browsing through the results a file called `dungeonsouls.ds` caught my eye.

![Found You](./dungeon-souls-save-editing-1.png)

Upon opening the file, you are greeted with 51 lines of information. It was time to trace these values back to the game.

![There's more to the file](./dungeon-souls-save-editing-2.png)

Time to boot up the game and see if we can find anything that looks like these values.

![Barbarian](./dungeon-souls-save-editing-3.png)

Oh hey look at that, 4 stars and 27275 experience. I think we found our Barbarian!

![Passives And Gold](./dungeon-souls-save-editing-4.png)

Woot passives and gold are found.

![Game States](./dungeon-souls-save-editing-5.png)

And our stats…

After poking around, the save file breaks down as follows:

![Woot](./dungeon-souls-save-editing-6.png)

Unfortunately, I couldn’t figure out what lines 1, 2, 10, and 12 are for.

Passives are capped at 10 and setting them past that doesn’t work.

Based on previous behaviors I saw during my time with Bit-Slicer, setting the experience past the current amount needed for the current level results in one level increase and the experience being reset to 0.

The unlock toggle is `0` for locked `1` for unlocked. It does not work for the Barbarian, Thief, and Archer as they are the default chars.

Do not set the class level outside 0 - 5. You will cause an index out of bounds error and crash the game.

![Whoops](./dungeon-souls-save-editing-7.png)

If stats require a numeric value, but receive a string, they are set to 0 in the game.

Just having some funsies with highest level text:

![Over 9000!](./dungeon-souls-save-editing-8.png)

