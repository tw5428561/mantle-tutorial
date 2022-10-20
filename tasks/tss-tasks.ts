import {task} from 'hardhat/config'
import {HexToBytes} from "../utils/deploy-utils";
import {BigNumberish, ethers} from "ethers";

/**
 * hh getTssGroupInfo --contract 0xAc2C50Af31501370366D243FaeC56F89128f6d96 --network devl1
 */
task("getTssGroupInfo")
  .addParam('contract', "tss group contract address")
  .setAction(async (taskArgs, hre) => {
    const tssGroupManager =await hre.ethers.getContractFactory('TssGroupManager')
    const tssGroupManagerAdd = await tssGroupManager.attach(taskArgs.contract)
    console.log("TssGroupInfo->",await tssGroupManagerAdd.getTssGroupInfo())
    console.log("TssInactiveGroupInfo->",await tssGroupManagerAdd.getTssInactiveGroupInfo())
  })

task("setTssGroupMember")
  .addParam('contract', "tss group contract address")
  .addParam('threshold', "tss threshold")
  .addParam('batchpublickey', "tss group batch publicKey")
  .setAction(async (taskArgs, hre) => {
    const tssGroupManager = await(await hre.ethers.getContractFactory('TssGroupManager')).attach(taskArgs.contract)
    const thresholdP = taskArgs.threshold

    const batchPublicKey = []
    //support parse special array data for batchpublickey
    let re = /\[/gi
    taskArgs.batchpublickey = taskArgs.batchpublickey.replace(re, '')
    re = /\]/gi
    taskArgs.batchpublickey = taskArgs.batchpublickey.replace(re, '')
    taskArgs.batchpublickey = taskArgs.batchpublickey.split(',')
    for (const pk of taskArgs.batchpublickey) {
      const ret = await HexToBytes(pk)
      batchPublicKey.push(ret)
    }
   const res= await tssGroupManager.setTssGroupMember(thresholdP, batchPublicKey)
   console.log(res.hash)
  })

task("setSlashingParams")
  .addParam('contract', "tss staking slashing contract address")
  .addParam('slashamount0', "slash uptime amount")
  .addParam('slashamount1', "slash animus amount")
  .addParam('exincome0', "slash uptime extra income")
  .addParam('exincome1', "slash animus extra income")
  .setAction(async (taskArgs, hre) => {
    const tssStakingSlashing = await (await hre.ethers.getContractFactory('TssStakingSlashing')).attach(taskArgs.contract)
    let slashParams : [BigNumberish,BigNumberish] = [taskArgs.slashamount0, taskArgs.slashamount1]
    let exIncomes : [BigNumberish,BigNumberish]= [taskArgs.exincome0, taskArgs.exincome1]
    await tssStakingSlashing.setSlashingParams(slashParams, exIncomes)
  })

task("clearQuitRequestList")
  .addParam('contract', "tss staking slashing contract address")
  .setAction(async (taskArgs, hre) => {
    const tssStakingSlashing = await (await hre.ethers.getContractFactory('TssStakingSlashing')).attach(taskArgs.contract)
    await tssStakingSlashing.clearQuitRequestList()
  })

task("staking")
  .addParam('contract', "tss staking slashing contract address")
  .addParam('amount')
  .addParam('pubkey')
  .addParam('prikey')
  .setAction(async (taskArgs, hre) => {
    const signer = new hre.ethers.Wallet(
      taskArgs.prikey,
      hre.ethers.provider
    )
    const tssStakingSlashing = await (await hre.ethers.getContractFactory('TssStakingSlashing')).attach(taskArgs.contract)
    await tssStakingSlashing.connect(signer).staking(taskArgs.amount, taskArgs.pubkey)
  })
