import {subtask, task} from "hardhat/config";
import "@nomiclabs/hardhat-web3"

task("deployTokenAll", "Deploy Token")
    .addParam("name", "token name")
    .addParam("symbol", "token symbol")
    .setAction(async (taskArgs, hre) => {
        const ERC20tokenFactory = await hre.ethers.getContractFactory('TestERC20')
        const ERC20token = await ERC20tokenFactory.deploy(taskArgs.name, taskArgs.symbol)
        await ERC20token.deployed();
        console.log("export ERC20_TOKEN=%s", ERC20token.address.toLocaleLowerCase());

        const ERC721tokenFactory = await hre.ethers.getContractFactory('TestERC721')
        const ERC721token = await ERC721tokenFactory.deploy()
        await ERC721token.deployed();
        console.log("export ERC721_TOKEN=%s", ERC721token.address.toLocaleLowerCase());

        const ERC1155tokenFactory = await hre.ethers.getContractFactory('TestERC1155')
        const ERC1155token = await ERC1155tokenFactory.deploy()
        await ERC1155token.deployed();
        console.log("export ERC1155token_TOKEN=%s", ERC1155token.address.toLocaleLowerCase());
    });