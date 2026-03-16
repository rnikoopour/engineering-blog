---
title: "Markov Chains with Erlang"
date: 2016-06-04
tags:
  - markov chains
  - markov
  - erlang
---

My previous posts about getting started with [epgsql](https://github.com/epgsql/epgsql) helped me get familiar so I could store my Makov chain data in a database to help [Markov-lang](https://github.com/rnikoopour/Markov-lang) learn how to talk.

Today we’re going to discuss how we generate the Markov chain data that will go into that database. I’m going to forgo the `OTP` portion of this application. Though the full version can be found on my [github](https://github.com/rnikoopour/Markov-lang).

For those unfamiliar, Markov chains describe how likely you are to transition from one state to the next. Read about them [here](http://setosa.io/ev/markov-chains/) and [here](http://nullprogram.com/blog/2012/09/05/). Or you can just Google it.

I wanted to model text as a chain. This chain represents the transition from a prefix of two words to a one word suffix.

> this is a string, this is a string, this is a ending
>
> ***start of sentence*** -> this   
>  ***start of sentence*** this -> is   
>  this is -> a   
>  is a -> string,   
>  a string, -> this   
>  string, this -> is   
>  this is -> a   
>  is a -> string,   
>  a string, -> this   
>  string, this -> is   
>  this is -> a   
>  is a -> ending   
>  a ending -> ***end of sentence***

To start this we will represent ***start of sentence*** as two spaces `[" ", " "]`. We will tokenize the string. Then we will represent ***end of sentence*** as a special string `["<<< undefined>>>"]`. (Please note the space in `<<< undefined>>>` is there because of the markdown).

The string:

```
"This is a string, this is a string, this is a ending"
```

Turns into:

```
[" ", " ", "This", "is", "a", "string", " this", "is", "a", "string", " this", "is", "a", "ending", "<<< undefined>>>"]
```

We will write a `splitString` function to take our incoming string, remove any unprintable chars, and return the list of tokens.

```
%% markov.erl
```

We pad it with two blank space to represent the start of a sentence. Then we append `"<<< undefined>>>"` so that we know when we’ve reached the end of a sentence.

Now that we have a list of the words, we need to turn this into the chains we described above. In order to represent these I created a `chain` record:

```
%% records.hrl
```

Now lets turn our list of tokens into a table of chains.

```
%% markov.erl
```

We will discuss the call to `reduceTable` shortly. `genTable/1` takes in a list of tokens and then calls itself with the list, the tail of the list and the tail of the tail of the list. We keep accumulating chains until we run out of suffixes.

When we reach `tl(L3) == []` the accumulator `acc` looks like:

```
1 [  
2   {chain, "   ", "this"},  
3   {chain, " this", "is"},  
4   {chain, "this is", "a"},      
5   {chain, "is a", "string,"},  
6   {chain, "a string,", "this"},  
7   {chain, "string, this", "is"},  
8   {chain, "this is", "a"},      
9   {chain, "is a", "string,"},  
10  {chain, "a string,", "this"},  
11  {chain, "string, this", "is"},  
12  {chain, "this is", "a"},      
13  {chain, "is a", "ending"},  
14  {chain, "a ending", "<<<undefined>>>"}  
15 ]
```

You’ll notice that some chains such as lines 4 and 8 have the same prefix and suffix. Also, you’ll notice chains such as lines 5, 9, and 13 all share the same prefix, but line 13 has a different suffix. In order to weight chains properly I came up with 2 more records.

```
%% records.hrl  
-record(reducedChain, {prefix="", suffixes=[]}).  
-record(suffix, {word="", count=0}).
```

The `reducedChain` record represents a prefix and a list of suffixes. The suffixes in the list are of the `suffix` record type which keeps track of the suffix and how many times it has appeared after the prefix for the `reducedChain`.

The call to `reduceTable`, told you we would get to this, takes the list of chains and turns it into a list of `reducedChains`.

```
%% markov.erl  
reduceTable(Table) ->  
    reduceTable(Table, []).  
reduceTable([], Acc) ->  
    Acc;  
reduceTable(Table, Acc) ->  
    Chain = hd(Table),  
    Prefix = Chain#chain.prefix,  
    ChainsSamePrefix = gatherChainsWithPrefix(Prefix, Table),  
    Suffixes = genSuffixes(ChainsSamePrefix),  
    reduceTable(Table -- ChainsSamePrefix, Acc ++ [factories:reducedChainFactory(Prefix, Suffixes)]).
```

Our first step is to get all the chains with the same prefix:

```
hasPrefix(Prefix, #chain{prefix=Prefix, suffix=_}) ->  
    true;  
hasPrefix(_,_) ->  
    false.  
gatherChainsWithPrefix(Prefix, Table) ->  
    lists:filter(fun(Chain) ->  
             hasPrefix(Prefix, Chain)  
         end, Table).
```

If we gather the chains for the prefix `"is a"` we would get the following output:

```
1 [  
2   {chain, "is a", "string,"},  
3   {chain, "is a", "string,"},  
4   {chain, "is a", "ending"}  
5 ]
```

The next step is to create the `suffixes` for our `reducedChain`.

```
hasSuffix(Suffix, #chain{prefix=_, suffix=Suffix}) ->  
    true;  
hasSuffix(_,_) ->  
    false.  
  
gatherChainsWithSuffix(Suffix, Table) ->  
    lists:filter(fun(Chain) ->  
            hasSuffix(Suffix, Chain)  
         end, Table).  
  
countSameSuffix(Suffix, Chains) ->  
    lists:foldl(fun(Chain, NumSame) ->  
         case hasSuffix(Suffix, Chain) of  
            true -> NumSame + 1;  
            false -> NumSame  
         end  
      end, 0, Chains).  
  
genSuffixes([], Acc) ->  
    Acc;  
genSuffixes(Chains, Acc) ->  
    Chain = hd(Chains),  
    Suffix = Chain#chain.suffix,  
    SameSuffixes = gatherChainsWithSuffix(Suffix, Chains),  
    NumSameSuffix = countSameSuffix(Suffix, Chains),  
    genSuffixes(Chains -- SameSuffixes, Acc ++ [factories:suffixFactory(Suffix, NumSameSuffix)]).
```

We would get the following list of suffixes:

```
[  
    {suffix, "string,", 2},  
    {siffix, "ending", 1}     
]
```

Now we have everything we need to create a `reducedChain`. We do this for all items and we end up with the following reducedTable:

```
[  
    {reducedChain, "   ", [{suffix, "this", 1}],  
    {reducedChain, " this", [{suffix, "is", 1}],  
    ...  
    {reducedChain, "is a", [{suffix, "string,", 2}, {suffix, "ending", 1}],  
    ...  
    {reducedChain, "this is", [{suffix, "a", 3}],  
    ...  
]
```

Now we have generated out weighted chains and can use these to generate sentences. I will go over this in my next blog post when I cover how we attach the database.

A version of Markov-lang that can generate sentences without the database exists at [this](https://github.com/rnikoopour/Markov-lang/tree/e9462c5c95787c4b078108a81191cc69509d02e0) commit. Just feed the output of `genTable` into `genSentence`

