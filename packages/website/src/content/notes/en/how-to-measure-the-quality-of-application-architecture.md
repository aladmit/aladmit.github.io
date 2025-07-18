---
description: An architecture quality assessment metric from Uncle Bob of Clean Architecture.
tags:
  - other
published: 2018-11-06
title: How to measure the quality of application architecture
---

How to measure the quality of application architecture

In the book Clean Architecture, I came across an interesting metric. It states that the main goal of application architecture is to make it easy to make changes. In other words, the easier it is for us to add/fix a feature, the better.

There is a way to measure this: we count the number of new lines of code, calculate the development cost, and create a graph of the cost of adding one line of code to the application. If the cost of one line of code increases from release to release, then the architecture is bad. If the cost of adding one line of code remains stable or even decreases from release to release, everything is excellent 👍

The metric looks cool, we need to try it somewhere. So far, I see only one problem with it. We need to convey to management that this metric can only be used to understand the quality of the application architecture, not the efficiency of the team. If we start looking at this metric as a metric of efficiency, then we will push developers to manipulate the metric to save themselves, rather than improving the product, and everything will go downhill for the code(

In general, try the metric and let us know how it works)

We discussed the architecture metric mentioned above with @Mustafin. We came to the conclusion that it is necessary to measure not from release to release, but over a certain period of time. Releases can have different frequencies, and their size can vary all the time. Some releases may take two days, while others may take a week, and in such conditions, the metric will not show us anything at all.

Therefore, it makes sense to take the metric over a period of time. For example, the number of lines per sprint, month, etc.
