#! /usr/local/bin/node

// Transfers between L1 and L2 using the Optimism SDK

const ethers = require("ethers")
const optimismSDK = require("@bitdaoio/sdk")
require('dotenv').config()

const network = "local"

const l1Url = process.env.TEST_URL
const l2Url = process.env.OPTI_TEST_URL

const daiAddrs = {
  l1Addr: "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1",
  l2Addr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
}

let crossChainMessenger
let l1ERC20, l2ERC20
let addr = daiAddrs.l1Addr

const getSigners = async () => {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url)
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url)

  const privateKey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const l1Wallet = new ethers.Wallet(privateKey,l1RpcProvider);
  const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider);

  return [l1Wallet, l2Wallet]
}


const setup = async() => {
  const [l1Signer, l2Signer] = await getSigners()
  addr = l1Signer.address;
  crossChainMessenger = new optimismSDK.CrossChainMessenger({
    l1ChainId: 31337,
    l2ChainId: 17,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Signer
  })
  l1ERC20 = new ethers.Contract(daiAddrs.l1Addr, erc20ABI, l1Signer)
  l2ERC20 = new ethers.Contract(daiAddrs.l2Addr, erc20ABI, l2Signer)
}

// The ABI fragment for an ERC20 we need to get a user's balance.
const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
]    // erc20ABI

const gwei = 1000000000n
const eth = gwei * gwei   // 10^18
const centieth = eth/100n
const dai = eth


const reportERC20Balances = async () => {
  const l1Balance = (await l1ERC20.balanceOf(addr)).toString().slice(0,-18)
  const l2Balance = (await l2ERC20.balanceOf(addr)).toString().slice(0,-18)
  console.log(`DAI on L1:${l1Balance}     DAI on L2:${l2Balance}`)
}

const depositERC20 = async () => {

  console.log("Deposit ERC20")
  await reportERC20Balances()
  const start = new Date()

  // Need the l2 address to know which bridge is responsible
  const allowanceResponse = await crossChainMessenger.approveERC20(
      daiAddrs.l1Addr, daiAddrs.l2Addr, dai)
  await allowanceResponse.wait()
  console.log(`Allowance given by tx ${allowanceResponse.hash}`)
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)

  const response = await crossChainMessenger.depositERC20(
      daiAddrs.l1Addr, daiAddrs.l2Addr, dai)
  console.log(`Deposit transaction hash (on L1): ${response.hash}`)
  await response.wait()
  console.log("Waiting for status to change to RELAYED")
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)
  await crossChainMessenger.waitForMessageStatus(response.hash,
      optimismSDK.MessageStatus.RELAYED)

  await reportERC20Balances()
  console.log(`depositERC20 took ${(new Date()-start)/1000} seconds\n\n`)
}     // depositETH()



const withdrawERC20 = async () => {

  console.log("Withdraw ERC20")
  const start = new Date()
  await reportERC20Balances()

  const response = await crossChainMessenger.withdrawERC20(
      daiAddrs.l1Addr, daiAddrs.l2Addr, dai)
  console.log(`Transaction hash (on L2): ${response.hash}`)
  await response.wait()

  console.log("Waiting for status to change to IN_CHALLENGE_PERIOD")
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)
  await crossChainMessenger.waitForMessageStatus(response.hash,
      optimismSDK.MessageStatus.IN_CHALLENGE_PERIOD)
  console.log("In the challenge period, waiting for status READY_FOR_RELAY")
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)
  await crossChainMessenger.waitForMessageStatus(response.hash,
      optimismSDK.MessageStatus.READY_FOR_RELAY)
  console.log("Ready for relay, finalizing message now")
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)
  await crossChainMessenger.finalizeMessage(response)
  console.log("Waiting for status to change to RELAYED")
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)
  await crossChainMessenger.waitForMessageStatus(response,
      optimismSDK.MessageStatus.RELAYED)
  await reportERC20Balances()
  console.log(`withdrawERC20 took ${(new Date()-start)/1000} seconds\n\n\n`)
}     // withdrawERC20()


const main = async () => {
  await setup()
  console.log("----------------deposit erc20---------------------------")
  await depositERC20()
  console.log("----------------withdraw erc20---------------------------")
  await withdrawERC20()
}  // main

main().then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
