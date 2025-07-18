---
description: A wrapper on top of terraform, with only TS support for now, but already usable.
tags:
  - iac
published: 2021-03-08
title: Pulumi provider for yandex cloud
---

This weekend I made a pulumi provider for Yandex.Cloud.

The repository is here: [github pulumi-yandex](https://github.com/aladmit/pulumi-yandex)

It's not yet available as public packages for all languages and there is no proper README, but it works. I will be able to fully package it for all languages and publish it no earlier than in a week, but if you are eager to try it out, you can write to me and I'll help you build and run it locally.

Overall, converting from Terraform turned out to be quite simple. If only the documentation was proper and the boilerplate was finished, it would have been great)) Because of this, I lost a few nights on debugging >.< But it's okay, I have already contacted the developers and we will finish it, so no one else will have to suffer like that. Someday I'll write a separate post on how it all works.