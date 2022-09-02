const ethers = require("ethers")
const optimismSDK = require("@bitdaoio/sdk")
require('dotenv').config()

const network = "local"

const l1Url = process.env.TEST_URL
const l2Url = process.env.OPTI_TEST_URL

const daiAddrs = {
  l1Addr: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
  l2Addr: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
}

let crossChainMessenger
let l1ERC20, l2ERC20
let addr

const getSigners = async () => {
    const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url)
    const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url)
    const privateKey = "0x6395A7C842A08515961888D21D72F409B61FBCE96AF1E520384E375F301A8297";
    const l1Wallet = new ethers.Wallet(privateKey,l1RpcProvider);
    const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider);
    return [l1Wallet, l2Wallet]
}

const setup = async() => {
  const [l1Signer, l2Signer] = await getSigners()
  addr = l1Signer.address
  crossChainMessenger = new optimismSDK.CrossChainMessenger({
      l1ChainId: 31337,
      l2ChainId: 17,
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer
  })

  l1ERC20 = new ethers.Contract(daiAddrs.l1Addr, erc20ABI, l1Signer)
  l2ERC20 = new ethers.Contract(daiAddrs.l2Addr, erc20ABI, l2Signer)
}

const erc20ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ]

const gwei = 1000000000n
const eth = gwei * gwei
const centieth = eth/100n
const deth = eth/10n
const dai = eth


const reportBalances = async () => {
  const l1Balance = (await crossChainMessenger.l1Signer.getBalance()).toString().slice(0,-9)
  const l2Balance = (await crossChainMessenger.l2Signer.getBalance()).toString().slice(0,-9)
  console.log(`On L1:${l1Balance} Gwei    On L2:${l2Balance} Gwei`)
}

const reportERC20Balances = async () => {
  const l1Balance = (await l1ERC20.balanceOf(addr)).toString().slice(0,-18)
  const l2Balance = (await l2ERC20.balanceOf(addr)).toString().slice(0,-18)
  console.log(`DAI on L1:${l1Balance}     DAI on L2:${l2Balance}`)
}

const depositETH = async () => {
  console.log("Before Deposit DETH")
  await reportBalances()
  const start = new Date()
  const response = await crossChainMessenger.depositETH(centieth)
  console.log(`Transaction hash (on L1): ${response.hash}`)
  await response.wait()
  console.log("Waiting for status to change to RELAYED")
  console.log(`Time so far ${(new Date()-start)/1000} seconds`)
  console.log("response hash:"+ response.hash)
  await crossChainMessenger.waitForMessageStatus(response.hash,optimismSDK.MessageStatus.RELAYED)
  console.log("After Deposit 1 deth")
  await reportBalances()
  console.log(`depositETH took ${(new Date()-start)/1000} seconds\n\n`)
}

const withdrawETH = async () => {
    console.log("Withdraw ETH")
    const start = new Date()
    await reportBalances()
    const response = await crossChainMessenger.withdrawETH(centieth)
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
    await reportBalances()
    console.log(`withdrawETH took ${(new Date()-start)/1000} seconds\n\n\n`)
}


const main = async () => {
    await setup()
    // console.log("----------------deposit eth---------------------------")
    // await depositETH()
    console.log("----------------withdraw eth---------------------------")
    await withdrawETH()
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
