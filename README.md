# Solidity safe data storage

Implementation of contracts that can be used as a safe interaction interface by IoT and authorized users that assures immutability of the data and authentication of the input channel.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run this project you'll need to have installed Truffle v4.1.14, Solidity v0.4.24 and EthereumJS TestRPC v6.0.3. Another option to run the project is to deploy it to a test-net or to user Ganache but some modifications in the file truffle.js must be applied.

### Installing (For Mac)

To install Truffle v4.1.14, Solidity v0.4.24 and EthereumJS TestRPC v6.0.3 we'll need to have the NPM package manager installed. To do so copy the following lines in the console:

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

After that we just have to install Truffle and TestRPC. This installations will include the installation of Solidity v0.4.24

```
$ npm install -g truffle
$ npm install -g ethereumjs-testrpc
```

To check that everything has been installed we can type in the following lines in the console and the result must be the shown below:

```
$ truffle version
Truffle v4.1.14 (core: 4.1.14)
Solidity v0.4.24 (solc-js)

$ testrpc -v
EthereumJS TestRPC v6.0.3 (ganache-core: 2.0.2)

Available Accounts
==================
(0) 0x6788bd24a29fc4474c020affb9360f3ba7410f92
(1) 0xfec581949516c9c339d06274d726a61196a15397
(2) 0x8b8436998a335092e887f3046e6457941266e887
(3) 0xa595fc3326c32b75c167354e9f14777df6208fbc
(4) 0x6be35a0c856174450a67512339a3d769a4993040
(5) 0xa4c2aa2d26ac4c40085cc484929612973361d55f
(6) 0x612cd165b1aa144a9f2274bc2a0a65ddc866d9f7
(7) 0x8bbdacf8553286de63199157fbcce7a40b73c605
(8) 0x38bc7965afee6aad964541148616538b5cc76534
(9) 0x9f05dad1b7c13f992fda87c6117c1a5786f36593

Private Keys
==================
(0) 38c60980e6c9081585aa961c92a522775ff65d7999ed3be3c71c5ece1148fbfc
(1) 5f3aa1158bdf608771b1ad51846c05c7a89a0776a660227bbf84f33db2a1af87
(2) 02babda3bd9f376bbbb54fc832276617461c88433b8c3c8c9ca92359c3a405ed
(3) 7d0be70929f53c3d49f28c00bfe1973caecc468a37aa3c6fbf5a40a966eb1560
(4) 0751a61f92365357ec4f3d4870ea6ffd402a8178ba289e8a5b23b618c4664501
(5) e39318c828a48ff91bd98d5435856702a181a0d260e7d8b4c856d9cf480bb9b0
(6) 0071f4511f63b43c7a11e6b2f028576bc8b2e0e01628d610bdf8bcd956de6fb6
(7) 291d197da75dd5baf03598168c8f1ac6d45aa96bcba6e9b0e586a534e2bf9cae
(8) d3a13329bbd437b5edabbc99ed976b43afeefeb30bb7e4320ca368d9434721af
(9) 893108ee67b8062d62d11b906b618b7920637d4e001fd774938e8e6b69c3f3b8

HD Wallet
==================
Mnemonic:      lens visa defy cost conduct menu fantasy dish tribe aerobic hat pudding
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
```

## Running the tests

To run the automated test you just have to open a console and run the following command:

```
$ testrpc
```

After that we open another tab, we get into the folder of the project and we type in the truffle testing command:

```
$ truffle test
```

## Deployment

To do.

## Built With

* [Atom](https://atom.io/) - The text editor used.
* [Truffle Suite](https://truffleframework.com/) - Development enviroment.
* [TestRpc](https://nethereum.readthedocs.io/en/latest/ethereum-and-clients/test-rpc/) - Blockchain emulator.
* [Ganache](https://truffleframework.com/ganache)

## Authors

* **Jordi Estapé Canal** - *Data storage implementation* - [jordiestapecanal](https://github.com/jordiestapecanal)
