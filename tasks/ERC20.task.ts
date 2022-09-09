import "@nomiclabs/hardhat-web3"
import {subtask, task} from "hardhat/config"
import {expect} from "chai";
import fs from "fs";

let map:Map<string,string>=new Map
task("erc20Test", "erc20 任务测试入口task")
    .setAction(async (taskArgs) => {
        // @ts-ignore
        map= await run("deployToken", {name: "erc20Test",symbol:"bit"})
        let tokenAddress=  map.get("tokenAddress")
        let ownerAddress=  map.get("ownerAddress")
        // @ts-ignore
        await run("mintToken",{token:tokenAddress,amount:"111111111111111111111",to:ownerAddress})
        // @ts-ignore
        let balances =await run("queryErc20balances", {token: tokenAddress, user: ownerAddress})
        expect(balances).to.equal("111111111111111111111")
        console.log("--------------------------------deployToken-mintToken-success--------------------------------")
        // @ts-ignore
        await run("approve",{token:tokenAddress, to:ownerAddress,amount:"211111111111111111111"})
        // @ts-ignore
        let allowances = await run("queryAllowance",{token:tokenAddress, to:ownerAddress,account:ownerAddress})
        expect(allowances).to.equal("211111111111111111111")
        console.log("--------------------------------approve-queryAllowance-success--------------------------------")
        const secrects =read_csv('./secrect.csv')
        let userAddress=secrects[1][1]
        // @ts-ignore
        await run("transferFrom", {token: tokenAddress,from:ownerAddress,to: userAddress, amount: "111111111111111111111"})
        // @ts-ignore
        let balances01 =await run("queryErc20balances", {token: tokenAddress, user: userAddress})
        expect(balances01).to.equal("111111111111111111111")
        // @ts-ignore
        let allowancesEnd = await run("queryAllowance",{token:tokenAddress, to:ownerAddress,account:ownerAddress})
        expect(allowancesEnd).to.equal("100000000000000000000")
        console.log("--------------------------------erc20-transferFrom-allowances-success--------------------------------")
    });

subtask("deployToken", "Deploy Token")
    .addParam("name", "token name")
    .addParam("symbol", "token symbol")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const token = await tokenFactory.deploy(taskArgs.name, taskArgs.symbol)
        await token.deployed();
        console.log("export ERC20_TOKEN=%s", token.address.toLocaleLowerCase());
        map.set("tokenAddress",token.address.toLocaleLowerCase())
        map.set("ownerAddress",await token.owner())
        return map
    });

subtask("mintToken", "Mint Token")
    .addParam("token", "token address")
    .addParam("amount", "token mint amount")
    .addParam("to", "接受者钱包地址")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const token = await tokenFactory.attach(taskArgs.token)
        await token.mint(taskArgs.to, taskArgs.amount)
    });

subtask("queryErc20balances", "Query ERC20 balances")
    .addParam("token", "token address")
    .addParam("user", "user address ")
    .setAction(async (taskArgs, hre) => {
            const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
            const token = await tokenFactory.attach(taskArgs.token)
            let balances = (await token.balanceOf(taskArgs.user)).toString()
            return balances
    });

subtask("approve", "approve ERC20 token to others")
    .addParam("token", "erc20 address")
    .addParam("to", "to address ")
    .addParam("amount", "approve amount")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const token = await tokenFactory.attach(taskArgs.token)

        await token.approve(taskArgs.to, taskArgs.amount)
    });

subtask("queryAllowance", "Query ERC20 allowance")
    .addParam("token", "erc20 address")
    .addParam("to", "to address ")
    .addParam("account", "account address")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const token = await tokenFactory.attach(taskArgs.token)

        let allowances = (await token.allowance(taskArgs.account, taskArgs.to))
        return allowances
    });

subtask("transfer", "转账")
    .addParam("token", "token address")
    .addParam("to", "to address ")
    .addParam("amount", "approve amount")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const erc20 = await tokenFactory.attach(taskArgs.token)
        let  txInfo=  await erc20.transfer(taskArgs.to, taskArgs.amount);
        //console.log(txInfo.hash)
    });

subtask("getHash","获取交易信息")
    .addParam("hash", "交易hash")
    .setAction(async(taskArgs,hre)=>{
        let transaction = await hre.web3.eth.getTransaction(taskArgs.hash)
        let transactionReceipt = await hre.web3.eth.getTransactionReceipt(taskArgs.hash)
        let block = await hre.web3.eth.getBlock(transaction.blockNumber!)
        console.log("block timestamp: ", block.timestamp)
        console.log("blockHash: ", transaction.blockHash)
        console.log("blockNumber: ", transaction.blockNumber)
        console.log("receiptStatus: ", transactionReceipt.status)
        console.log("cumulativeGasUsed: ", transactionReceipt.cumulativeGasUsed)
        console.log("contractAddress: ", transactionReceipt.contractAddress)
    });

subtask("transferFrom", "转账")
    .addParam("token", "token address")
    .addParam("from", "from address ")
    .addParam("to", "to address ")
    .addParam("amount", "approve amount")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const erc20 = await tokenFactory.attach(taskArgs.token)
        await erc20.transferFrom(taskArgs.from,taskArgs.to, taskArgs.amount);
    });

function read_csv(csvfile: any){
    // @ts-ignore
    let csvstr: string = fs.readFileSync(csvfile,"utf8",'r+');
    let arr: string[] = csvstr.split('\n');
    let array: any = [];
    arr.forEach(line => {
        array.push(line.split(','));
    });
    return array
}
module.exports = {}
