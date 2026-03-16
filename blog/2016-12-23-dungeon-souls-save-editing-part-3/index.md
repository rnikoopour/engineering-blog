---
title: "Dungeon Souls Save Editing, Part 3"
date: 2016-12-24
tags:
  - reverse engineering
  - game cheat
  - dungeon souls
---

# Dungeon Souls Save Editing, Part 3

Continuing with the variety of files related to the Arcane Forge, we explored `arc_frg_eqp.ds`.

This is a list of items equipped to you char from the Arcane forge.

The file is 8 lines long. The `odd` lines can be either `0`, `1`, or `2`. This maps to the equipped items `Ninby's Grace`, `Herberk's Pendant`, `Murderer's Ring` respectively.

![Spawning with all items](./dungeon-souls-save-editing-part-3-1.png)

I believe the `even` number is the item this turns into when you put it back in the inventory.

