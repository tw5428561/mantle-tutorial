import "@nomiclabs/hardhat-web3"
import {subtask, task} from "hardhat/config"
import {expect} from "chai";
import fs from "fs";
import {BytesLike} from "ethers";

let map:Map<string,string>=new Map
task("erc1155Test", "erc1155 任务测试入口task")
    .setAction(async (taskArgs) => {
        // @ts-ignore
        map= await run("deployToken1155", {name: "test",symbol:"bit"})
        let tokenAddress=  map.get("tokenAddress")
        let ownerAddress=  map.get("ownerAddress")
        // @ts-ignore
        await run("mintToken1155",{token:tokenAddress,amount:"2",tokenId:"1",to:ownerAddress})
        // @ts-ignore
        let balances =await run("queryErc1155balances", {token: tokenAddress, user: ownerAddress,tokenId:"1"})
        // @ts-ignore
        expect(balances).to.equal("2")
        console.log("--------------------------------deploy1155Token-mintToken-success--------------------------------")
        const secrects =read_csv('./secrect.csv')
        let userAddress=secrects[1][1]
        // @ts-ignore
        await run("transfer1155", {from:ownerAddress,token: tokenAddress,to: userAddress, tokenId: "1",amount:"1"})
        // @ts-ignore
        let balances01 =await run("queryErc1155balances", {token: tokenAddress, user: userAddress,tokenId:"1"})
        // @ts-ignore
        expect(balances01).to.equal("1")
        console.log("--------------------------------erc1155-transfer-success--------------------------------")
    });

subtask("mintToken1155", "Mint Token")
    .addParam("token", "token address")
    .addParam("tokenId", "tokenId address")
    .addParam("amount", "token mint amount")
    .addParam("to", "接受者钱包地址")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC1155')
        const token = await tokenFactory.attach(taskArgs.token)
        await token.mint(taskArgs.to, taskArgs.amount,taskArgs.tokenId,"https://baseUrl.com")
    });

subtask("deployToken1155", "Deploy Token")
    .addParam("name", "token name")
    .addParam("symbol", "token symbol")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC1155')
        const token = await tokenFactory.deploy()
        await token.deployed();
        console.log("export ERC1155_TOKEN=%s", token.address.toLocaleLowerCase());
        map.set("tokenAddress",token.address.toLocaleLowerCase())
        map.set("ownerAddress",await token.owner())
        return map
    });

subtask("queryErc1155balances", "Query ERC1155 统计owner 地址所持有的NFTs数量")
    .addParam("token", "token address")
    .addParam("user", "user address ")
    .addParam("tokenId", "tokenId address")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC1155')
        const token = await tokenFactory.attach(taskArgs.token)
        let balances = (await token.balanceOf(taskArgs.user,taskArgs.tokenId)).toString()
        return balances
    });

subtask("transfer1155", "转账")
    .addParam("from", "from address")
    .addParam("token", "token address")
    .addParam("to", "to address ")
    .addParam("tokenId", "approve tokenId")
    .addParam("amount", "token mint amount")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('TestERC1155')
        const erc1155 = await tokenFactory.attach(taskArgs.token)
        let al=new Array()
        let  txInfo=  await erc1155.safeTransferFrom(taskArgs.from,taskArgs.to,taskArgs.tokenId,taskArgs.amount,al);
        console.log("safeTransferFrom:",txInfo.hash)
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
