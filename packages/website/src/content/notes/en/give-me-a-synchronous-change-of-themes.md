---
description: How to customize theme switching in Vim and Alacritty along with Night Shift in macOS.
tags:
  - other
published: 2020-12-01
title: Give me a synchronous change of themes
---

В 7 вечера мой макбук меняет светлую тему на темную и врубает Night Shift. И в целом, это работает замечательно. Весь нативный софт меняет тему вместе с системой, да и появляется все больше сайтов, которые это подхватывают.

Однако, есть два НО! Vim и Alacritty(дико шустрый терминал), которые открыты у меня 24/7, вообще ничего не знают про смену тем 🤦‍♂️ В итоге они либо светлые, когда все темное, либо наоборот.

Запилил на днях пару скриптов, которые это фиксят, мб кому пригодится.

Функция для Vim тут: [neovim](https://gitlab.com/aladmit/dotfiles/-/blob/master/neovim.j2#L101-110)
Там же auocmd, который запускает выбор темы при старте вима.

С alacritty все чуть сложнее.
Нужно в конфиге прописать обе ваши темы и указать их через якорь: [alacritty](https://gitlab.com/aladmit/dotfiles/-/blob/master/alacritty.j2#L150-216)
После этого прописать в zsh хук, который вызывается перед выполнением команд.
[zshrc](https://gitlab.com/aladmit/dotfiles/-/blob/master/zshrc.j2#L128-140)

P.S. Для работы этого добра надо установить пакетик: `brew install dark-mode`
