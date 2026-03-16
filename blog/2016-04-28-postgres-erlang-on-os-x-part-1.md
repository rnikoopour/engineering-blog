---
title: "Postgres + Erlang on OS X Part 1"
date: 2016-04-28
tags:
  - rebar3
  - epgsql
  - erlang
  - repl
  - erl
---

I've been trying to get [epgsql](https://github.com/wg/epgsql) so I can build out the database for [Markov-lang](https://github.com/rnikoopour/Markov-lang).  Getting this running took some time.  
  
First we needed to install [rebar3](http://www.rebar3.org/).  You do this by running:  

```
brew install homebrew/versions/rebar3
```

Once rebar3 is installed, you have to configure it to work with [hex.pm](https://hex.pm/).  You do this by running the following:  

```
mkdir -p ~/.config/rebar3 
```

Then create the following file **~/.config/rebar3/rebar.config** with the following contents:  

```
 {plugins, [rebar3_hex]}.
```

(EDIT: According to Reddit user [mononcqc](https://www.reddit.com/r/erlang/comments/4gsk0q/getting_started_with_rebar3_on_osx/d2r3ob3) this is only necessary if you want to publish packages not fetch them)  
  
Then run:  

```
rebar3 update
```

  
Now, in the directory for you project that will use postgres, create a file **/Path/To/App/rebar.config** with the following content:  

```
{deps, [epgsql]}.
```

Now you can access epgsql by running:  

```
rebar3 shell
```

It should compoile epgsql. In the REPL started by the previous command you can run:  

```
m(epgsql).
```

To access this from within Emacs, start the Erlang REPL in Emacs with the following flag:  

```
-pz _build/default/deps/epgsql/ebin 
```

  
Part 2 can be found [here](/2016/05/02/postgres-erlang-on-osx-part-2).
