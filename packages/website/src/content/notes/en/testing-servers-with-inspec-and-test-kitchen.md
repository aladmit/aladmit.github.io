---
description: How to test infrastructure as code locally instead of on a real server. InSpec, Vagrant, Libvirt, Test Kitchen and Chef.
tags:
  - iac
published: 2016-03-15
title: Testing servers with InSpec and Test Kitchen
---

> This article was first published on the [mkdev.me](https://mkdev.me) blog in 2016

Any beginning DevOps specialist very quickly starts wondering how to write his
own scripts for configuration management, testing them locally and not on the
real server. In modern DevOps practices it is common to perceive infrastructure
as a code, and any code needs to be properly tested before it is sent to
production. We will talk in this article how to make the life easier when
developing in this field.

## Why do we need testing?

The idea of testing is in an automatized check of every element in an isolated
environment. Evaluating every element separately and checking how every element
works, it is much easier to identify the problem than when it is a part of a big
system. Moreover, you can be sure that you haven't broken anything after making
edits.

## InSpec

This is the magical framework we are going to use. Right now it is a little raw,
but works fast and has pretty rich DSL – thanks to RSpec it is based on. As with
RSpec, all your tests are Ruby code, so it is safe to use all the features of
this language.

All its DSL represents a call for some resources for work with the files,
services, configs etc.

```ruby
describe file(arguments...) do
  ...
end
```

Inside every such block different checks are defined. You can see in 
[docs](https://github.com/chef/inspec/blob/master/docs/resources) to the
resource, which types of checks it supports.

```ruby
describe file("/file.txt") do
  it { should exist }
end
```

the value of every such check can be tested differently.

**be** is used to compare a value with a number:

```ruby
describe file('/proc/cpuinfo') do
  its('size') { should be >= 120 }
end
```

**eq** is short for equivalent. It just checks the equality. Pay attention that
it compares without type casting, that is 2 = 2, but '2' != 2.

```ruby
describe sshd_config do
  its('Protocol') { should eq '2' }
end
```

**cmp** is the same as eq, but with type casting:

```ruby
describe sshd_config do
  its('Protocol') { should eq 2 }
end
```

**include** checks if a value is in the list:

```ruby
describe passwd do
  its('users') { should include 'my_user' }
end
```

**match** checks if there's a value in a string. Its specifics is that it takes
regular expressions:

```ruby
describe sshd_config do
  its('Ciphers') { should_not match '/cbc/' }
end
```

You can also combine a lot of such checks in `control`. The advantage of such
syntax is that you can define what exactly you want to test. It is something
like `shared_examples` in RSpec:

```ruby
control "tmp" do
  title "Testing tmp folder"
  describe "Some additional description"

  describe file('/tmp') do
    it { should exist }
    it { should be_mounted }
  end
end
```

### Running the tests

Inspec supports four ways to run tests.

```sh
# 1. Local running, when you want to test your own configuration
inspec exec test.rb

# 2. Run tests on a server through SSH
inspec exec test.rb -t ssh://user@host

# 3. Run tests on a Windows server through WinRM
inspec exec test.rb -t winrm://admin@windhost

# 4. Run tests in a docker container
inspec exec test.rb -t docker://conainer_id
 ```

But all this has one problem. Although we have tests, the code is still running
and testing on a real server. If you make a mistake, you can break something on
it or even knock it down.

## Kitchen Test

Kitchen Test is a tool, which can run a virtual machine for you and install on
it an OS, where we are going to test our application. It supports different
platforms, tools and virtualization types, such as Amazon EC2, Blue Box,
CloudStack, OpenStack, Vagrant, Docker etc.

### What we need to have on our machine

First of all, Ruby, in which all our tools are written. Some virtualization
system, I use [vagrant-libvirt](https://github.com/pradels/vagrant-libvirt),
and also [Vagrant](https://www.vagrantup.com/). If you want to learn more about
different virtualization types and choose what's more preferable for you, go
[here](https://mkdev.me/posts/virtualization-basics-and-an-introduction-to-kvm).

Test Kitchen can be installed by a command `gem install test-kitchen`. You will
have to find out yourself how to install and configure other tools, going by the
links in the previous paragraph.

Let's fill a Gemfile with the minimum required set right away:

```ruby
source "https://rubygems.org"
gem "test-kitchen"
gem "kitchen-vagrant"
```

Let's install everything using the command `bundle install` and edit the
configuration file `.kitchen.yml`:

```yaml
---
driver:
  name: vagrant

platforms: # a list of OS on which we are going to run tests
  - name: centos-7.2 # our recipes
    driver:
      customize:
        memory: 2048 # configurations for the given OS

suites: # a list of environments
  - name: default # the name of the environment
```

You can look at the list of created environments by typing `kitchen list`.

Let's create the VM we have described:

```sh
kitchen create default-centos-72
```

Now you can enter it using `kitchen create default-centos-72` and do everything
there. You can no longer be afraid to break something on a real machine :) Now
you can run your configuration on the created virtual machine and either move
your tests on it and run them or tell InSpec to visit through ssh and check. SSH
access is the same as for everything that vagrant has run:
`ssh vagrant@localhost -p 2222`.

All this is, of course, cool, but not very convenient.

## Test Kitchen + InSpec + Chef

Yes-yes, you can combine it all and get a pretty convenient system for
development. You can read
[here](https://mkdev.me/posts/what-is-configuration-management-and-why-you-need-ansible-chef-puppet-and-others)
about Chef. If you use Puppet, Ansible or something else for configuration
management, use it, there's no big difference. As a part of this article we will
write a little recipe for Chef installing Nginx, which we are going to test on
our virtual machine.

### Initial setting

Let's create a test cookbook in our Chef:

```sh
chef generate cookbook cookbooks/nginx_test
```

Let's enter the cookbook folder and create a Gemfile with the following content
there:

```ruby
source "https://rubygems.org"
gem "inspec"
gem "berkshelf"
gem "test-kitchen"
gem "kitchen-vagrant"
gem "kitchen-inspec
```

After that let's install gems and initialize Kitchen:

```sh
bundle install
kitchen init
```
Test Kitchen will create a config `.kitchen.yml` with its configuration. Let's
edit it right away.

```yaml
---
driver:
  name: vagrant # virtualization

provisioner:
  name: chef_zero # what will execute commands. There can be as well
                  # Puppet, Ansible etc.

verifier:
  name: inspec # what is going to run tests

platforms: # a list of OS on which we are going to run tests
  - name: centos-7.2 # our recipes
    driver:
      customize:
        memory: 2048 # configurations for the given OS

suites: # a list of environments
  - name: default # the name of the environment must be the same as the name of the test folder
    run_list: # run_list Chef
      - recipe[nginx_test::default]
    attributes:
```

Let's create the VM we have described:

```sh
kitchen create default-centos-72
```

You can make sure that it has started and is working by entering it using
`kitchen login`.

### Writing the recipe

We won't bother much, that's why, let's just link up the existing recipe for
nginx installation and call it:

```ruby
# metadata.rb

...
depends 'nginx'
depends 'yum'
```

```ruby
# recipes/default.rb

include_recipe 'nginx'
```

Now let's ask berks to pull in the dependencies and run the recipe on the VM:

```sh
berks install
kitchen converge default-centos-72
```

### Writing the test

Tests should lie in a `test/integration/name` of the vm/ folder. If you are
planning to use several testing frameworks, you need to create subfolders with
their names, too.

Time to run our test!

```sh
kitchen verify default-centos-72
```

You can delete the created machine this way: `kitchen destroy default-centos-72`.

I want to notice that if you have already done all this scope of work, you don't
have to create the machine, then run the recipe and tests on it every time. You
can implement all the three operations in one command: `kitchen test
default-centos-72`

This is it. We have learned how to create VMs for our Chef recipes and test them
using InSpec. Good luck with your application :)

