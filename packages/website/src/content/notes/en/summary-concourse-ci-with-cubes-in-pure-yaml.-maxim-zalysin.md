---
description: Concource CI can integrate with anything with resources, declaratively described, easily extensible.
tags:
  - other
published: 2018-11-21
title: Summary "Concourse CI with cubes in pure YAML. Maxim Zalysin"
---

The essence: Concourse CI can be integrated with anything using resources, is declaratively described, and easy to extend.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4PRWZBgUDxU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What is Concourse made of?

Concourse is written in Go. It consists of a server with a web interface, API, scheduler, and worker registrar. An SSH tunnel creates a connection between the workers (cross-platform) and the web. The web stores data in Postgres, which stores pipelines, logs, etc. Concourse cannot store artifacts.

There is a utility called fly that allows you to interact with the web. Manage commands, projects, pipelines, etc. As a rule, everyone has enough of the web interface for interaction. For debugging, you can execute a task locally or log in to an existing one.

The guys have microservices, for each of which Concourse runs tests, and then makes a mark in Bitbucket that everything is okay and it's time to review. When a PR is approved, merged, tagged, tests are rerun, a container build is done, and a notification is sent to Slack. Then comes the deployment to test by clicking a button in the web or changing the Kubernetes manifest. Then the tester will make a note in the task that everything is okay, and you can deploy to production. Now we are negotiating to automate deployment to test and production completely.

## What entities are there?

There is a pipeline consisting of resources and jobs.
Resources are cubes with which Concourse interacts with something. For example, the Slack resource allows you to work with Slack.
Jobs in which commands are executed.
There is a built-in dashboard with the status of tasks.

### Resource

There are built-in resources, there are about 20 of them. For example, Git, which constantly checks for new commits and downloads code.
There are community resources. For example, one that can create pull requests in Bitbucket. We declare what external resources we need in the pipeline and use them.

Resources can fetch secrets from different sources (Vault, Kubernetes, etc.) or a separate YAML file.

Each resource consists of 3 binary files (check, in, out). Through check, the resource checks what it needs to do. In is used within the job, where it is described what needs to be done. Out sends the result.

### Job

Contains instructions. When triggered, which tasks to perform, which resources to use, what to do if everything falls / passes successfully. Tasks can be outsourced to files/repositories and reused in different projects. Tasks can be executed in parallel and aggregate the result.

### Advantages

* YAML
* CLI
* Integration with anything through Resource
* Easy to use

### Cons

* Workers are resource-hungry and sometimes get stuck
* It's difficult to rerun a job on an outdated resource. That is, if the resource has been updated, the competition will take it immediately, and you will have to fiddle to run an old pipeline on an old version of the resource.
* There is no access separation by roles in one team.

The author is currently addressing resource requirements and rewriting built-in resources in Go.

## Links

* [Record of the report](https://www.youtube.com/watch?v=4PRWZBgUDxU)
* [Slides](https://speakerdeck.com/devopsmoscow/concourse-ci-s-kubikami-i-na-chistom-yaml)
