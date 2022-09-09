import { ethers } from "hardhat";
import { L1CustomERC20__factory,L2CustomERC20__factory } from '../typechain-types'

async function main() {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:9545')
  const l2RpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

  // const key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const key = '0x8f14df1da1a318bec99800b72c5031e4fdc4ec017f00ab9659339ecb0193120e'
  
  const l1Wallet = new ethers.Wallet(key, l1RpcProvider)
  const l2Wallet = new ethers.Wallet(key, l2RpcProvider)

  console.log('Deploying L1 ERC20...')
  const l1CustomERC20 = await new L1CustomERC20__factory(l1Wallet).deploy("L1CustomERC20","L1T");
  await l1CustomERC20.deployed();

  console.log("L1 ERC20 Token deployed to:", l1CustomERC20.address);


  console.log('Deploying L2 ERC20...')
  const l2CustomERC20 = await new L2CustomERC20__factory(l2Wallet).deploy(
    '0x4200000000000000000000000000000000000010',  // L2 Standard Bridge
    l1CustomERC20.address);                        // L1 token
  await l2CustomERC20.deployed();

  console.log("L2 ERC20 Token deployed to:", l2CustomERC20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});