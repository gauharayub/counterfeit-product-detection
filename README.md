# fake_product_detection
Blockchain based fake product detection system built as a part of Minor Project

# "Name of Some Sweet"

"Name of Some Sweet" is a blockchain application to fight product counterfeiting.


## Installation

Uses [truffle](https://www.trufflesuite.com/) for easy compilation and deploy.

Uses [Ganache](https://www.trufflesuite.com/) for local blockchain creation

config port inside truffle-config.js

## Usage

For development environment

```bash
truffle compile
```

to compile smart contracts (for error checking)


```bash
truffle migrate
```

to compile and deploy to local blockchain


```bash
truffle migrate --reset
```

if some previous version of contract are deployed



var cf = await Counterfeit.deployed()

var accounts;
web3.eth.getAccounts(function(err,res) { accounts = res; });

var second = accounts[1]

cf.addProduct(1,1,20,'first','first')

cf.registerSeller('gak','marwadi',{from:second})