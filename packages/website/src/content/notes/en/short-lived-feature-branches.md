---
description: Occurs not only in the context of CI, but also TBD. TBD imposes additional restrictions.
tags:
  - tbd
published: 2021-02-02
title: Short-lived feature branches
---

Usually I mention short-lived feature branches in the context of Continuous Integration because without such a practice, no CI will work for you in principle, but they are encountered not only there.

If you have decided to go with Trunk Based Development, the first thing you will encounter is the transition to short-lived branches. Moreover, the trunk imposes additional restrictions on such branches:
- it is impossible to merge a branch into other people's branches
- it is impossible to merge into release and other long-lived branches
- only master can be merged into the branch itself
- the branch is merged only after everything is done in it and after the merge, it is no longer needed

In other words, you create a branch, work in it for about a day, and merge it into master. The trunk assumes that you cannot deviate from this scheme, except by committing directly to master.

[TDB Short-Lived Feature Branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/)