### 第一步：部署 L1,  L2 合约

```
yarn hardhat run --network local scripts/l1deploy-greeter.js
yarn hardhat run --network bitnetwork scripts/l2deploy-greeter.js
```

### 第二步：先修改 l1tol2-greeter-l2.js 中的 l2 的合约地址, 然后执行查看当前消息

```
yarn hardhat run --network bitnetwork scripts/l1tol2-greeter-l2.js
```

### 第三步：修改两个合约中的合约地址, 然后执行
```
yarn hardhat run --network local scripts/l1tol2-greeter-l1.js
```

### 第四步：查看消息是否修改成功
```
yarn hardhat run --network bitnetwork scripts/l1tol2-greeter-l2.js
```