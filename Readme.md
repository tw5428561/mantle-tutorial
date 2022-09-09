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

#### task  tasks/op_erc721.task.ts
```shell
-- mint
     npx hardhat l1mintToken721 --exampletoken 0xD7c3Cc3bCbac0679Eae85B40D985Ac5A8d4b0092 --tokenurl 0001 --to 0xD6f15EAC1Cb3B4131Ab4899a52E711e19DEeA73f --network opl1
-- approve
     npx hardhat approveToken721 --exampletoken 0xD7c3Cc3bCbac0679Eae85B40D985Ac5A8d4b0092 --tokenid 2 --l1erc721gateway 0xffA3A7d25d13520117610BdFe06ae46Ee99c4757 --to 0xD6f15EAC1Cb3B4131Ab4899a52E711e19DEeA73f --network opl1 
-- deposit
     npx hardhat depositToken721 --l1erc721gateway 0xffA3A7d25d13520117610BdFe06ae46Ee99c4757 --tokenid 2 --network opl1
-- withdraw 
     npx hardhat withdraw721l1 --address 0xedc24B777C8b90A814d1F10DCf26EF0e7d577c39 --to 0xD6f15EAC1Cb3B4131Ab4899a52E711e19DEeA73f --tokenid 2 --network opl2 
```