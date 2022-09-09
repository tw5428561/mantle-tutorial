const fs = require("fs");
import "@nomiclabs/hardhat-web3";
import { task, types } from "hardhat/config";
import { FromL1_ControlL2Greeter__factory, Greeter__factory } from '../typechain-types'

task("setGreeting", "Prints an account's erc20 balance in l1")
  .addParam("address", "The FromL1_ControlL2Greeter's address")
  .addParam("message", "the change message")
  .setAction(async (taskArgs, hre) => {

    const accounts = await hre.ethers.getSigners();
    const FromL1_ControlL2Greeter = await new FromL1_ControlL2Greeter__factory(accounts[0]).attach(taskArgs.address)

    const tx = await FromL1_ControlL2Greeter.setGreeting(taskArgs.message)
    console.log("change message txhash: ", tx.hash)
  });

task("greet", "Prints an account's erc20 balance in l1")
  .addParam("address", "The Greeter's address")
  .setAction(async (taskArgs, hre) => {

    const accounts = await hre.ethers.getSigners();
    const Greeter = await new Greeter__factory(accounts[0]).attach(taskArgs.address)

    const message = await Greeter.greet()
    console.log("message: ", message)
  });
