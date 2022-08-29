# task
```shell
hh deployTokenAll --network bitnetwork --name test --symbol bit

hh erc20Test --network bitnetwork

hh erc721Test --network bitnetwork
```

# test
```shell
npx hardhat node --fork https://bitnetwork-l2geth.qa.davionlabs.com
npx hardhat --network localhost test
```

## op,bitnetwork,erc721test

#### deploy  scripts/op-deploy.js
```shell
node scripts/op-deploy.js

  Deploying L1 ERC721...
  L1 ERC721 Contract ExampleToken Address:  0xD7c3Cc3bCbac0679Eae85B40D985Ac5A8d4b0092
  Deploying L2 ERC721...
  L2 ERC721 Contract OVM_L2DepositedERC721 Address:  0xedc24B777C8b90A814d1F10DCf26EF0e7d577c39
  Deploying L1 ERC721 Gateway...
  L1 ERC721 Gateway Contract Address:  0xffA3A7d25d13520117610BdFe06ae46Ee99c4757
  Initializing L2 ERC721...
```

```
Deploying L1 ERC721...
L1 ERC721 Contract ExampleToken Address: 0xFB67ED670dBC1FE405E82c5385Dd818BD73730e3
Deploying L2 ERC721...
L2 ERC721 Contract OVM_L2DepositedERC721 Address: 0xa0025C02a15692CF67A3B823786541f3B8454135
Deploying L1 ERC721 Gateway...
L1 ERC721 Gateway Contract Address: 0xc529D22F01d3d6C98d997007be56B5Bac1927F7D
Initializing L2 ERC721...
```

#### task  tasks/op_erc721.task.ts
```shell
-- mint
npx hardhat l1mintToken721 --exampletoken 0xFB67ED670dBC1FE405E82c5385Dd818BD73730e3 --tokenurl 000001 --to 0xCd0B4E309FB855d644bA64E5fb3dC3DD08f13917 --network opl1
-- approve
npx hardhat approveToken721 --exampletoken 0xFB67ED670dBC1FE405E82c5385Dd818BD73730e3 --tokenid 1 --l1erc721gateway 0xc529D22F01d3d6C98d997007be56B5Bac1927F7D --to 0xCd0B4E309FB855d644bA64E5fb3dC3DD08f13917 --network opl1 
-- deposit
npx hardhat depositToken721 --l1erc721gateway 0xc529D22F01d3d6C98d997007be56B5Bac1927F7D --tokenid 1 --network opl1
-- withdraw 
npx hardhat withdraw721l1 --address 0x0165878A594ca255338adfa4d48449f69242Eb8F --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --tokenid 1 --network opl2 
--l1balance

--l2balance
npx hardhat l2721balances --token 0xa0025C02a15692CF67A3B823786541f3B8454135 --to 0xCd0B4E309FB855d644bA64E5fb3dC3DD08f13917 --tokenid 1 --network opl2
```

```
npx hardhat opTransfer721 --token 0x59b670e9fA9D0A427751Af201D676719a970857b --from 0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1 --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --tokenid 4 --network opl2
```
```
npx hardhat l2721balances --token 0x59b670e9fA9D0A427751Af201D676719a970857b --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --tokenid 4 --network opl2
```