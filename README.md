# Ethereum-vanity-address
This script lets you generate Ethereum addresses that begin with a custom hexadecimal string

## Installation 

You will need [nodejs](nodejs.org) to run this script, as well as the [ethereum-private-key-to-address](https://www.npmjs.com/package/ethereum-private-key-to-address) package. It can be installed by doing `npm install ethereum-private-key-to-address` inside the directory. You may want to `mkdir node_modules` (without `cd`'ing into it) before installing the package (this can solve a failing installation).

## Usage

Ethereum addresses can contain capital letters. If you want to have a strict match, pass `s` before your string. If you want to have a faster result with the same word by ignoring the case, pass `i` (`BeEf` will be treated as a match for `BEEF`).

```
node vanity_Eth.js [i or s for case sensitivity] [hex string]
```

## Example

```
node vanity_Eth.js i B00B5
```
