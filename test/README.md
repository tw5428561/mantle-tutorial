# codebese 验证

## 背景说明
### 测试对象
- mantlenetworkio sdk
- 基础合约
  - CrossDomainMessenger
  - StandardBridge

## step by step

### 下载项目

```shell
git clone git@github.com:songyaoshun/TestContracts.git
cd TestContracts
yarn
```

### 添加网络配置

`TestContracts/hardhat.config.ts`
```shell
    btl2: {
      url: "http://localhost:8545",
      accounts:['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      chainId: 17,
      gas: 10000000,
      gasPrice: 1,
    },
    btl1: {
      url: "http://localhost:9545",
      accounts:['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      chainId: 31337,
      gas: 10000000,
      gasPrice: 5000000,
    },
```
### 参数配置

`TestContracts/.env`

如果是codebase在本地运行，此份配置无需修改

## Communication between contracts on L1 and L2

### deploy contracts

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat run scripts/deploy.op-cross-messages.ts
yarn run v1.22.19

L1Greeter_Address=0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00
L2Greeter_Address=0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0
FromL1_ControlL2Greeter_Address=0x36C02dA8a0983159322a80FFE9F24b1acfF8B570
FromL2_ControlL1Greeter_Address=0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82
✨  Done in 7.02s.
```

### L1 message to L2 by task
- get l2 default message
  
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat greet --address 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0 --network btl2                                      
yarn run v1.22.19

message:  l2 default message!
✨  Done in 2.97s.
```

- l1 message to l2 by Contract
  
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat setGreeting --address 0x36C02dA8a0983159322a80FFE9F24b1acfF8B570 --message "l1 update l2"  --network btl1      
yarn run v1.22.19

change message txhash:  0x61cf00226965c69d2fc809c9c403d77bbbbc79d19b7a6430e4606cfb8641db23
✨  Done in 3.33s.
```

- get l2 updaded message

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat greet --address 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0 --network btl2                                
yarn run v1.22.19

message:  l1 update l2
✨  Done in 2.95s.
```

### L2 message to L1 by task
- get l1 default message
  
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat greet --address 0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00 --network btl1
yarn run v1.22.19

message:  l1 default messages!
✨  Done in 3.30s.
```

- l2 message to l1 by Contract
  
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat setGreeting --address 0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82 --message "l2 update l1"  --network btl2 
yarn run v1.22.19

change message txhash:  0xda61e102c19bc2d81fa0dc51592d74fab091ed43a579686c4394b31ee77a8dd6
✨  Done in 3.13s.
```

- get l1 updaded message

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat greet --address 0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00 --network btl1                                
yarn run v1.22.19

message:  l1 update l2
✨  Done in 2.95s.
```

### L1 <== message ==> L2 by test

使用测试脚本进行验证
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat test test/cross-message.ts
yarn run v1.22.19

  Communication between contracts on L1 and L2
    L1 message to L2
      ✔ should get l2 greeter message
      ✔ should l1 can cross message to l2
      ✔ should get l2 updated greeter message
    L2 message to L1
      ✔ should get l1 greeter message
      ✔ should l2 can cross message to l1
      ✔ should finalizeMessage is success
      ✔ should MessageStatus is RELAYED
      ✔ should get l1 updated greeter message

  8 passing (23s)
```

补充：
- 下述断言，是在未启动relayer的情况下通过js sdk完成的。若本地已启动relayer，可以忽略：

```shell
      ✔ should finalizeMessage is success
      ✔ should MessageStatus is RELAYED
```

## depositETH、withdrawETH

### depositETH by task
- 查询l1上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qB --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network btl1
  yarn run v1.22.19

  5095.3357339309989 ETH
  ✨  Done in 1.67s.
  ```
- 查询l2上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qBL2ERC20 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111 --network btl2
  yarn run v1.22.19

  L2CustomERC20 balances:  4904622593962000000000
  ✨  Done in 1.46s.
  ```

- 执行depositETH
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat depositETH --l1sb 0x610178dA211FEF7D417bC0e6FeD39F05609AD788 --amount 1000000000000000000 --network btl1
  yarn run v1.22.19

  depositETH txHash:  0x60c547dc9061a7a25175ca8b662dbd089d7115d069f242ff0f957cd178baeab0
  ✨  Done in 1.49s.
  ```

- 查询l1上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qB --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network btl1
  yarn run v1.22.19

  5095.3357339309989 ETH
  ✨  Done in 1.67s.
  ```
- 查询l2上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qBL2ERC20 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111 --network btl2
  yarn run v1.22.19

  L2CustomERC20 balances:  4904622593962000000000
  ✨  Done in 1.46s.
  ```
### withdrawETH by task
- 查询l1上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qB --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network btl1
  yarn run v1.22.19

  5095.3357339309989 ETH
  ✨  Done in 1.67s.
  ```
- 查询l2上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qBL2ERC20 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111 --network btl2
  yarn run v1.22.19

  L2CustomERC20 balances:  4904622593962000000000
  ✨  Done in 1.46s.
  ```

- 执行withdrawETH
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat withdrawETH --l2sb 0x4200000000000000000000000000000000000010 --l2token 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111--amount 1000000000000000000 --network btl2
  yarn run v1.22.19

  depositETH txHash:  0x60c547dc9061a7a25175ca8b662dbd089d7115d069f242ff0f957cd178baeab0
  ✨  Done in 1.49s.
  ```

- 查询l1上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qB --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network btl1
  yarn run v1.22.19

  5095.3357339309989 ETH
  ✨  Done in 1.67s.
  ```
- 查询l2上交易前ETH的balance
  ```shell
  (base) ➜  TestContracts git:(main) ✗ yarn hardhat qBL2ERC20 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111 --network btl2
  yarn run v1.22.19

  L2CustomERC20 balances:  4904622593962000000000
  ✨  Done in 1.46s.
  ```

### depositETH、withdrawETH by test

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat test test/d\&w_ETH.ts
yarn run v1.22.19

  depositETH and withdrawETH
    通过 sdk depositETH, 验证event
      ✔ 判断是否触发event, 及参数验证
    通过 sdk withdrawETH时, 验证event
      ✔ 判断是否触发event, 及参数验证
    通过 sdk depositETH, 验证是否到账
      ✔ should l1 and l2 balances are both greater than 0
      ✔ should depositETH response is correct
      ✔ should MessageStatus is UNCONFIRMED_L1_TO_L2_MESSAGE
      ✔ should function toCrossChainMessage can get message
      ✔ should MessageStatus is RELAYED
      ✔ should l1 and l2 balances changes are correct
    通过 sdk withdrawETH, 验证是否到账
      ✔ should l1 and l2 balances are both greater than 0
      ✔ should withdrawETH response is correct
      ✔ should MessageStatus is UNCONFIRMED_L1_TO_L2_MESSAGE
      ✔ should function toCrossChainMessage can get message
      ✔ should MessageStatus is IN_CHALLENGE_PERIOD
      ✔ should MessageStatus is READY_FOR_RELAY
      ✔ should finalizeMessage is success
      ✔ should MessageStatus is RELAYED
      ✔ should l1 and l2 balances changes are correct
    depositETH 通过 l1 sb 合约
      ✔ should get balance before
      ✔ should trigger the deposit ETH function with the given amount
      ✔ should get balance after
    withdrawETH 使用 l2 sb 合约
      ✔ should get balance before
      ✔ should trigger the withdraw ETH function with the given amount
      ✔ should updated allowance
      ✔ should finalizeMessage is success
      ✔ should MessageStatus is RELAYED
      ✔ should get balance after

  15 passing (18s)

✨  Done in 22.33s.

```






























## 官方桥 ERC721
- 获取 BVM_L1CrossDomainMessenger

  BVM_L1CrossDomainMessenger=`curl http://localhost:8080/addresses.json |awk '$1 ~ /^"BV/ {gsub(/"|,/,"");print $2}'`

- 替换文件中的地址，使用上述的 $BVM_L1CrossDomainMessenger

  sed -i '' 's/0x5086d1eEF304eb5284A0f6720f79403b4e9bE294/0x0165878A594ca255338adfa4d48449f69242Eb8F/g' ./scripts/op-deploy.js

- 部署合约
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat run scripts/op-deploy.js
yarn run v1.22.19

Deploying L1 ERC721...
L1 ERC721 Contract ExampleToken Address:  0xd131B84Df8194Aa18BB3D5044bE976362b0Bc14F
Deploying L2 ERC721...
L2 ERC721 Contract OVM_L2DepositedERC721 Address:  0xE80b2A9355A2ce5993838A8ea20D2ff2f2a1635b
Deploying L1 ERC721 Gateway...
L1 ERC721 Gateway Contract Address:  0x33137047cB5962C06803748Af324bDB7118B0Dc8
Initializing L2 ERC721...
✨  Done in 7.14s.
```

### Mint ERC721 (L1)
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat l1mintToken721 --exampletoken 0xd131B84Df8194Aa18BB3D5044bE976362b0Bc14F --tokenurl 0005 --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network btl1
yarn run v1.22.19

res-> {
  hash: '0x1018aee47a01b0889e94ccf1f77c0d2b32fa1cdeb8490a04e356925bc78fabf1',
  type: 0,
  accessList: null,
  blockHash: '0x7aa14343750c7dc212e4e5e42b43d6112d7031cf1e09747fecc536308feace2b',
  blockNumber: 10063,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "5000000" },
  gasLimit: BigNumber { value: "9023448" },
  to: '0xd131B84Df8194Aa18BB3D5044bE976362b0Bc14F',
  value: BigNumber { value: "0" },
  nonce: 2957,
  data: '0x3d02d0c9000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000043030303500000000000000000000000000000000000000000000000000000000',
  r: '0x88b8ea704d927404d676b4eaafde0caecea8353c4991feff39ec6d2db3183d56',
  s: '0x4875fbbf41620c96ae624ff7601dc2e21933a24e5a227c0df270bf293d941866',
  v: 62710,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
✨  Done in 6.19s.
```

- balanceOf
```shell
# l1 balances
(base) ➜  TestContracts git:(main) ✗ yarn hardhat l1721balances --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0xd131B84Df8194Aa18BB3D5044bE976362b0Bc14F --network btl1 
yarn run v1.22.19

balanceOf-> BigNumber { value: "4" }
✨  Done in 4.87s.

# l2 balances
(base) ➜  TestContracts git:(main) ✗ yarn hardhat l2721balances --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0xE80b2A9355A2ce5993838A8ea20D2ff2f2a1635b --network btl2 
yarn run v1.22.19

balanceOf-> BigNumber { value: "0" }
✨  Done in 3.84s.
```

- ownerOf
```shell
# l1 token id owner
(base) ➜  TestContracts git:(main) ✗ yarn hardhat l1721owner --token 0xd131B84Df8194Aa18BB3D5044bE976362b0Bc14F --tokenid 1 --network btl1                                
yarn run v1.22.19

ownerOfAddr-> 0x33137047cB5962C06803748Af324bDB7118B0Dc8
✨  Done in 4.20s.

# l2 token id owner
(base) ➜  TestContracts git:(main) ✗ yarn hardhat l2721owner --token 0xE80b2A9355A2ce5993838A8ea20D2ff2f2a1635b --tokenid 1 --network btl2
```

### Deposit ERC721 （L1 => L2）
- approve
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat approveToken721 --exampletoken 0xd131B84Df8194Aa18BB3D5044bE976362b0Bc14F --tokenid 1 --l1erc721gateway 0x33137047cB5962C06803748Af324bDB7118B0Dc8 --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network btl1        
yarn run v1.22.19

balanceOf-> BigNumber { value: "5" }
ownerOfAddr-> 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
ownerOfAdd01-> 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
approve-> 0x7948e015e719f690bddf221e0f94107bf6638a015bbd901a52610f94b3fbf5e1
✨  Done in 5.54s.
```

- deposit
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat depositToken721 --l1erc721gateway 0x33137047cB5962C06803748Af324bDB7118B0Dc8 --tokenid 1 --network btl1
yarn run v1.22.19

deposit-> {
  hash: '0x9c6a4a7db6ffe3e9662d06dfbf6c2ae9d1cd34a7817cd07f0c30ec9bc7f3c2f1',
  type: 0,
  accessList: null,
  blockHash: '0x888e44ff7e3fca617f256aa9c3bf64543d3f56a07d9895d3abf3b7e65ccb2d7d',
  blockNumber: 10199,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "5000000" },
  gasLimit: BigNumber { value: "9021464" },
  to: '0x33137047cB5962C06803748Af324bDB7118B0Dc8',
  value: BigNumber { value: "0" },
  nonce: 3000,
  data: '0xb6b55f250000000000000000000000000000000000000000000000000000000000000001',
  r: '0xcf6c46bb6e4fb0ae862a5b8d6b1aff1e27d051cc91bca853d5566a483c4cbb42',
  s: '0x10032b303354018a8babb6da1072db7c961aa804d41802d6e9fa0ef00b75cd4d',
  v: 62710,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
✨  Done in 6.93s.
```
[[link](https://github.com/ccniuj/optimistic-rollup-example-erc721)]

### Transfer ERC721 （L2 <=> L2）

### Withdraw ERC721 （L2 => L1）

## 官方桥 deposit withdraw ERC20

- deploy

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat run scripts/deploy.op-ERC20.ts 
yarn run v1.22.19

Deploying L1 ERC20...
L1 ERC20 Token deployed to: 0x59b670e9fA9D0A427751Af201D676719a970857b
Deploying L2 ERC20...
L2 ERC20 Token deployed to: 0xCE9a1f44156c84F1c1E3b0685E15e23c51bb6d0A
✨  Done in 8.36s.
```

- query balances

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat qBL1ERC20 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --network btl1
yarn run v1.22.19

L1CustomERC20 balances:  1000000000000000000000000
✨  Done in 3.16s.
(base) ➜  TestContracts git:(main) ✗ yarn hardhat qBL2ERC20 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --token 0x5Ae1f4bB68f8EAC39CFDbdFdA2b7344Ccbd80fAf --network btl2
yarn run v1.22.19

L2CustomERC20 balances:  0
✨  Done in 2.94s.
```

- approve OVM_L1ERC20Gateway to spend the ERC20

```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat approveER20 --token 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --spender 0x610178dA211FEF7D417bC0e6FeD39F05609AD788 --amount 10000 --network btl1                                                                           
yarn run v1.22.19

approve txHash:  0x5cdd78f10350d44e570ecf960fc80fe1b437e2aa8edc1e350d7a857d48352a57
✨  Done in 3.04s.

(base) ➜  TestContracts git:(main) ✗ yarn hardhat qallowanceER20 --token 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --owner 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --spender 0x610178dA211FEF7D417bC0e6FeD39F05609AD788 --network btl1
yarn run v1.22.19

query allowance:  BigNumber { value: "10000" }
✨  Done in 2.97s.
```

- Call deposit at OVM_L1ERC20Gateway contract:  deposit
  
```shell
(base) ➜  TestContracts git:(main) ✗ yarn hardhat depositERC20 --l1sb 0x610178dA211FEF7D417bC0e6FeD39F05609AD788 --l1token 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --l2token 0x5Ae1f4bB68f8EAC39CFDbdFdA2b7344Ccbd80fAf --amount 10000 --l2gas 100000 --data 0x  --network btl1
yarn run v1.22.19

l1StandardBridge depositERC20 responese:  {
  hash: '0x375910421168c2bbe4861e6b0017514293f660c3959202560feb3205eabd399d',
  type: 0,
  accessList: null,
  blockHash: '0x31785a736d7a136a17fb0a6a4c59dc507cc78b51e8fbb18776e3da600e50dd23',
  blockNumber: 55,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "5000000" },
  gasLimit: BigNumber { value: "9024984" },
  to: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
  value: BigNumber { value: "0" },
  nonce: 35,
  data: '0x58a997f60000000000000000000000004a679253410272dd5232b3ff7cf5dbb88f2953190000000000000000000000005ae1f4bb68f8eac39cfdbdfda2b7344ccbd80faf000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000186a000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
  r: '0x521426cd8875e9d84c03c773e2ac48663d7e867b62355b1e5c20f1f4770ef45b',
  s: '0x0afd47c113797fdf7c747545f975fd411b2174b163ae498baa97d0779f248954',
  v: 62709,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
✨  Done in 3.35s.
```

Confirm if the deposit is successful:



(base) ➜  TestContracts git:(main) ✗ yarn hardhat approveER20 --token 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --spender 0x0165878A594ca255338adfa4d48449f69242Eb8F --amount 10000 --network btl1
yarn run v1.22.19

approve txHash:  0xc96f4b38b8fe740c46ee746ff8ba5e419f031e2e8a3d26b60c3b68efd225e258
✨  Done in 3.38s.
(base) ➜  TestContracts git:(main) ✗ yarn hardhat depositERC20 --l1cdm 0x0165878A594ca255338adfa4d48449f69242Eb8F 
(base) ➜  TestContracts git:(main) ✗ yarn hardhat qallowanceER20 --token 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --owner 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --spender 0x0165878A594ca255338adfa4d48449f69242Eb8F --network btl1
yarn run v1.22.19

query allowance:  BigNumber { value: "10000" }
✨  Done in 2.96s.