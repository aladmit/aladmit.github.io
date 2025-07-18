---
description: Setting Vi-mode in Obsidian to work with Russian language and relative numbers.
tags:
  - km
published: 2021-02-08
title: Vi-mode in Obsidian
---

About six months ago, I migrated my entire knowledge base to [Obsidian](https://obsidian.md).

Obsidian does everything locally, which makes it significantly faster than its competitors. Speed is very important to me in these kinds of tools because I write as I think, and every lag in the editor affects the speed of my thinking.

Additionally, Vi-mode in Obsidian helps speed things up even more. As usual, it's pretty limited, and it's far from the real Vim, but hey, it is what it is ¯\_(ツ)_/¯

I've gotten used to the lack of some commands, but there were two things that hurt a lot:

1. No relative numbers. That is, when line numbers are relative to the cursor, it helps to quickly jump around the text.
2. No support for the Russian language in command mode. It's very painful when you write text in Russian, switch to command mode, try to jump around the text, and it doesn't respond because you're using Russian 🤦🏻‍♂️

To solve the first problem, a plugin recently appeared: [Obsidian Relative Line Numbers Plugin](https://github.com/nadavspi/obsidian-relative-line-numbers). I've been using it for a few days now, and it's been great. I recommend it.

It was a bit more difficult to address the issue of Russian language support in vi command mode because there are no plugins for it. I solved the problem like this:

Installed this plugin for vimrc support: [Obsidian Vimrc Support Plugin](https://github.com/esm7/obsidian-vimrc-support).
Took a popular plugin for Russian language support in vim and adapted it for Obsidian: [obsidian.vimrc](https://gitlab.com/aladmit/dotfiles/-/blob/master/obsidian.vimrc)
Put this file in `<vault path>/obsidian.vimrc`, and voila, vi-mode starts to understand what you want from it, even if you're using a Russian keyboard layout. 🔥