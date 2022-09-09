const fs = require("fs");
import "@nomiclabs/hardhat-web3";
import { task, types } from "hardhat/config";
import { L1CustomERC20__factory } from '../typechain-types'

task("accounts", "Prints the list of accounts", async (taskArgs,hre) => {

    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  });

task("qCode", "Prints contract code")
  .addParam("address", "The contract's address")
  .setAction(async (taskArgs, { web3 }) => {

    const code = await web3.eth.getCode(taskArgs.address)

    console.log("code: ", code);
  });

// l2 的native token 换成了BIT
task("qB", "Prints an account's native token balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { web3 }) => {

    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);
    web3.eth.getCode("0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111")

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("qBL1ERC20", "Prints an account's erc20 balance in l1")
  .addParam("account", "The account's address")
  .addParam("token", "The token's address")
  .setAction(async (taskArgs, hre) => {

    const accounts = await hre.ethers.getSigners();
    const l1CustomERC20 = await new L1CustomERC20__factory(accounts[0]).attach(taskArgs.token)

    const balance = await l1CustomERC20.balanceOf(taskArgs.account)
    console.log("L1CustomERC20 balances: ", balance.toString())

  });

task("mintL1ERC20", "Prints an account's balance")
  .addParam("account", "The account's address")
  .addParam("token", "The token's address")
  .addParam("amount", "mint amount", "123456789000000000", types.string, true)
  .setAction(async (taskArgs,hre) => {
    const accounts = await hre.ethers.getSigners();
    const l1CustomERC20 = await new L1CustomERC20__factory(accounts[0]).attach(taskArgs.token)
    const txn = await l1CustomERC20.mint(taskArgs.account, taskArgs.amount)

    console.log("l1CustomERC20 mint token txn hash: ",txn.hash)
  });

// approve BVM_L1CrossDomainMessenger to spend the ERC20
task("aL1ERC20", "approve ER20")
  .addParam("token", "ERC20 token address")
  .addParam("spender", "spender")
  .addParam("amount", "mint amount", "10000", types.string, true)
  .setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const l1CustomERC20 = await new L1CustomERC20__factory(accounts[0]).attach(taskArgs.token)
    const approve=await l1CustomERC20.approve(taskArgs.spender, taskArgs.amount)
    await approve
    console.log("approve txHash: ", approve.hash)
  });

task("qaL1ER20", "allowance ER20")
  .addParam("token", "ERC20 token address")
  .addParam("owner", "owner")
  .addParam("spender", "spender")
  .setAction(async (taskArgs, hre) => {

      const accounts = await hre.ethers.getSigners();
      const l1CustomERC20 = await new L1CustomERC20__factory(accounts[0]).attach(taskArgs.token)
      
      const allowance=await l1CustomERC20.allowance(taskArgs.owner, taskArgs.spender)

      console.log("query allowance: ", allowance)
  });

task("qBL2ERC20", "Prints an account's erc20 balance in l2")
  .addParam("account", "The account's address")
  .addParam("token", "The token's address")
  .setAction(async (taskArgs, hre) => {

    const L2CustomERC20 = await hre.ethers.getContractFactory('L2CustomERC20')
    const l2CustomERC20 = await L2CustomERC20.attach(taskArgs.token)

    const balance = await l2CustomERC20.balanceOf(taskArgs.account)
    console.log("L2CustomERC20 balances: ", balance.toString())
  });

task("depositERC20", "Deposit ERC20 （L1 => L2）")
  .addParam("l1sb", "The token's address of Proxy__BVM_L1StandardBridge")
  .addParam("l1token", "The token's address of l1Token")
  .addParam("l2token", "The token's address of l2Token")
  .addParam("amount", "deposit amount", "10000", types.string, true)
  .addParam("l2gas", "l2Gas", 100000, types.int, true)
  .addParam("data", "to l2 messages")
  .setAction(async (taskArgs,hre) => {

    console.log("===>", await hre.ethers.getSigners())

    let abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "_l1Token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_l2Token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "_l2Gas",
          "type": "uint32"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "depositERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }]

    const l1StandardBridge = await hre.ethers.getContractAt(abi, taskArgs.l1sb)
    const responese = await l1StandardBridge.depositERC20(taskArgs.l1token, taskArgs.l2token, taskArgs.amount, taskArgs.l2gas, taskArgs.data)

    console.log("l1StandardBridge depositERC20 responese: ", responese)
  });

task("qtransaction", "query transaction by hash")
  .addParam("hash", "transaction's hash")
  .setAction(async (taskArgs, { web3 }) => {

    const transaction = await web3.eth.getTransaction(taskArgs.hash);

    console.log("transaction: ", transaction);
  });

task("qtransactionreceipt", "query transaction receipt by hash")
  .addParam("hash", "transaction's hash")
  .setAction(async (taskArgs, { web3 }) => {

    const receipt = await web3.eth.getTransactionReceipt(taskArgs.hash);

    console.log("transactionreceipt: ", receipt);
  });
// task("autoMint", "给1000个地址mint", async (taskArgs, hre)=>{
//     const accounts = await hre.ethers.getSigners();
//     const tokenFactory = await hre.ethers.getContractFactory("TestToken")
//     const erc20 = await tokenFactory.attach("0x74F39688CFf9a2B825AdF429a99496fea6877913")

//     let secrects = read_csv('./secrect.csv')
//     for (let i = 1;i<1000;i++){
//         await erc20.mint(secrects[i][1], "123456789000000000000000000")
//         const balances = (await erc20.balanceOf(secrects[i][1])).toString()
//         console.log(secrects[i][1], balances)
//     }
// })

// task("autoQBalances", "给1000个地址mint", async (taskArgs, hre)=>{
//   const accounts = await hre.ethers.getSigners();
//   const tokenFactory = await hre.ethers.getContractFactory("TestToken")
//   const erc20 = await tokenFactory.attach("0x74F39688CFf9a2B825AdF429a99496fea6877913")

//   let secrects = read_csv('./secrect.csv')
//   for (let i = 1;i<1000;i++){
//       const balances = (await erc20.balanceOf(secrects[i][1])).toString()
//       console.log(secrects[i][1], balances)
//     }
// })

// task("autoTB","给1000个地址转入2个Tele")
//     .setAction(async (taskArgs, hre) => {

//       const secrects = read_csv('./secrect.csv')
//       for (let i = 1;i<1000;i++){
//           let tx =await hre.web3.eth.sendTransaction({
//             from:"0x387F83710c848Ead3047B2cDF85Ad87127309A49",
//             to:secrects[i][1],
//             value:"2000000000000000000",
//         })
//         console.log(tx.transactionHash)
//     }
// });

function read_csv(csvfile: any){
    let csvstr: string = fs.readFileSync(csvfile,"utf8",'r+');
    let arr: string[] = csvstr.split('\n');
    let array: any = [];
    arr.forEach(line => {
      array.push(line.split(','));
    });
    return array
  }

module.exports = {};