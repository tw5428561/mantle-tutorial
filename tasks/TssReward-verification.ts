import { task} from "hardhat/config"

/**
 * hh queryReward --tssrewardcontract 0x4200000000000000000000000000000000000020 --network btl2
 */
task("queryReward", "queryReward")
  .addParam("tssrewardcontract", "tssRewardContractaddress")
  .setAction(async (taskArgs, hre) => {
    const tssRewardContract = await hre.ethers.getContractFactory('TssRewardContract')
    const slidingWindowOracleContracts = await tssRewardContract.attach(taskArgs.tssrewardcontract)
    const deadAddress =await slidingWindowOracleContracts.deadAddress()
    console.log("queryReward->", deadAddress)
    const queryRewardres= await slidingWindowOracleContracts.queryReward()
    console.log("queryReward->", queryRewardres)
  })


module.exports = {}
