import { ethers } from "hardhat";
import * as mantle from "@mantlenetworkio/sdk"
import { predeploys } from '@mantlenetworkio/contracts'
import { should, getSigners, expect, getContracts, get_L2_ETH_TOKEN, get_L1_Standard_Bridge, get_L2_Standard_Bridge } from '../utils/setup'
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, Wallet, Contract, ContractTransaction } from "ethers";
import {execSync} from 'child_process';

import dotenv from "dotenv"
import { L2StandardERC20__factory } from "../typechain-types";
dotenv.config()

let crossChainMessenger: mantle.CrossChainMessenger
let response: ContractTransaction
let l1Signer: Wallet
let l2Signer: Wallet
let l1DSigner: Wallet
let l2DSigner: Wallet
let L1_Standard_Bridge: Contract
let L2_Standard_Bridge: Contract
let L2_ETH_TOKEN: Contract
let l1cdm: any
let l2cdm: any
let l1sb: any
let l2sb: any
let l1b: BigNumber
let l2b: BigNumber
let alnc: BigNumber

const reportBalances = async () => {
  let l1tb = await crossChainMessenger.l1Signer.getBalance()
  let l2tb = await crossChainMessenger.l2Signer.getBalance()

  return [l1tb, l2tb]
}


describe('depositETH and withdrawETH', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    [l1Signer, l2Signer, l1DSigner, l2DSigner] = await getSigners();
    [l1cdm, l2cdm, l1sb, l2sb] = await getContracts();
    L1_Standard_Bridge = await get_L1_Standard_Bridge();
    L2_Standard_Bridge = await get_L2_Standard_Bridge();
    L2_ETH_TOKEN = await get_L2_ETH_TOKEN();

    // console.log(l1Signer, l2Signer)
    crossChainMessenger = new mantle.CrossChainMessenger({
        l1ChainId: process.env.L1CHAINID!,   // For Kovan, it's 1 for Mainnet
        l2ChainId: process.env.L2CHAINID!,
        l1SignerOrProvider: l1DSigner,
        l2SignerOrProvider: l2DSigner
    })
  });

  describe('通过 sdk depositETH, 验证event', () => {
    it('判断是否触发event, 及参数验证', async () => {
      await expect(crossChainMessenger.depositETH(100000))
        .to.emit(l1sb, 'ETHDepositInitiated')
        .withArgs(
          await l1DSigner.getAddress(),
          await l1DSigner.getAddress(),
          100000,
          '0x'
        )
    })
  })

  describe('通过 sdk withdrawETH时, 验证event', () => {
    it('判断是否触发event, 及参数验证', async () => {
      await expect(crossChainMessenger.withdrawETH(100000))
        .to.emit(l2sb, 'WithdrawalInitiated')
        .withArgs(
          ethers.constants.AddressZero,
          predeploys.BVM_ETH,
          await l2DSigner.getAddress(),
          await l2DSigner.getAddress(),
          100000,
          '0x'
        )
    })
  })

  describe('通过 sdk depositETH, 验证是否到账',()=>{

    it('should l1 and l2 balances are both greater than 0', async () => {
      [l1b,l2b] = await reportBalances()
      console.log(l1b,l2b)

      l1b.should.be.at.least(0)
      l2b.should.be.at.least(0)
    })

    it('should all depositETH\'s response is correct', async () => {
      response = await crossChainMessenger.depositETH(ethers.utils.parseEther('0.01001'))
      await response.wait()
      // console.log(response)
      response.type!.should.to.equal(2)
      response.chainId.should.to.equal(+process.env.L1CHAINID!)
      response.hash.should.to.have.lengthOf(66)
    })

    // UNCONFIRMED_L1_TO_L2_MESSAGE 0
    // FAILED_L1_TO_L2_MESSAGE 1
    // STATE_ROOT_NOT_PUBLISHED 2
    // IN_CHALLENGE_PERIOD 3
    // READY_FOR_RELAY 4
    // RELAYED 5
    it('should MessageStatus is UNCONFIRMED_L1_TO_L2_MESSAGE', async () => {

      await crossChainMessenger.waitForMessageStatus(
        response.hash,mantle.MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE)
      let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
      gms.should.to.equal(0)
    })

    it('should function toCrossChainMessage can get message', async () => {

      const ccm = await crossChainMessenger.toCrossChainMessage(response.hash)

      ccm.transactionHash.should.to.equal(response.hash)
    })

    it('should MessageStatus is RELAYED', async () => {

      await crossChainMessenger.waitForMessageStatus(
        response.hash,mantle.MessageStatus.RELAYED)
      let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
      gms.should.to.equal(5)
    })

    it('should l1 and l2 balances changes are correct', async () => {
      execSync('sleep 10');

      let [nl1b,nl2b] = await reportBalances()
      // console.log(l1b,l2b)
      // console.log(nl1b,nl2b)
      nl1b.should.to.below(l1b.sub(ethers.utils.parseEther('0.01001')))
      nl2b.should.to.equal(l2b.add(ethers.utils.parseEther('0.01001')))
    })

  })

  describe('通过 sdk withdrawETH, 验证是否到账',()=>{

    it('should l1 and l2 balances are both greater than 0', async () => {
      [l1b,l2b] = await reportBalances()

      l1b.should.be.at.least(0)
      l2b.should.be.at.least(0)
    })

    it('should all withdrawETH\'s response is correct', async () => {
      response = await crossChainMessenger.withdrawETH(ethers.utils.parseEther('0.01'))

      response.chainId.should.to.equal(+process.env.L2CHAINID!)
      response.hash.should.to.have.lengthOf(66)
    })

    it('should MessageStatus is UNCONFIRMED_L1_TO_L2_MESSAGE', async () => {
      // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))
      await crossChainMessenger.waitForMessageStatus(
        response.hash, mantle.MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE)
    })

    it('should function toCrossChainMessage can get message', async () => {
      await response.wait()
      const ccm = await crossChainMessenger.toCrossChainMessage(response.hash)

      ccm.transactionHash.should.to.equal(response.hash)
    })

    // it('should MessageStatus is STATE_ROOT_NOT_PUBLISHED', async () => {
    //   // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

    //   await crossChainMessenger.waitForMessageStatus(
    //     response.hash,mantle.MessageStatus.STATE_ROOT_NOT_PUBLISHED)
    //   gms = await crossChainMessenger.getMessageStatus(response.hash)
      
    //   gms.should.to.equal(2)
    // })

    it('should MessageStatus is IN_CHALLENGE_PERIOD', async () => {
      // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

      await crossChainMessenger.waitForMessageStatus(
        response.hash,mantle.MessageStatus.IN_CHALLENGE_PERIOD)
    })

    it('should MessageStatus is READY_FOR_RELAY', async () => {
      // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

      await crossChainMessenger.waitForMessageStatus(
        response.hash,mantle.MessageStatus.READY_FOR_RELAY)
    })

    it('should finalizeMessage is success', async () => {
      const finalizeMessageResponse = await crossChainMessenger.finalizeMessage(response)

      finalizeMessageResponse.type!.should.to.equal(2)
    })

    it('should MessageStatus is RELAYED', async () => {
      // console.log('===>', await crossChainMessenger.getMessageStatus(response.hash))

      await crossChainMessenger.waitForMessageStatus(
        response.hash,mantle.MessageStatus.RELAYED)
      let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
      gms.should.to.equal(5)
    })

    it('should l1 and l2 balances changes are correct', async () => {
      let [nl1b,nl2b] = await reportBalances()
      
      // 因为手续费，实际的值均比期望的值小
      nl1b.should.to.below(l1b.add(ethers.utils.parseEther('0.01')))
      nl2b.should.to.below(l2b.sub(ethers.utils.parseEther('0.01')))
    })
  })

  describe('depositETH 通过 l1 sb 合约', () => {

    it('should get balance before', async () => {

      l1b = await l1Signer.getBalance()
      // console.log("l1 balance: ", l1b)
      
      l2b = await L2_ETH_TOKEN.balanceOf(l2Signer.address)
      // console.log("l2 balance: ", l2b)

      l1b.should.be.at.least(0)
      l2b.should.be.at.least(0)
    })

    it('should trigger the deposit ETH function with the given amount', async () => {

      response = await L1_Standard_Bridge.depositETH(
        300000,
        '0x' + '22'.repeat(32),
        {
          value: ethers.utils.parseEther('5')
        }
      )
      // console.log("txhash: ", response.hash)
      response.type!.should.to.equal(2)
      response.chainId.should.to.equal(+process.env.L1CHAINID!)
      response.hash.should.to.have.lengthOf(66)
      let rcpt = await response.wait()
      // console.log("rcpt status: ", rcpt.status)
      // console.log("rcpt to: ", rcpt.to)
      rcpt.status.should.to.equal(1)
      rcpt.to.should.to.equal(process.env.L1_Standard_Bridge!)

      execSync('sleep 5');
    })

    it('should get balance after', async () => {

      const nl1b = await l1Signer.getBalance()
      const nl2b = await L2_ETH_TOKEN.balanceOf(l2Signer.address)
      // console.log("l1 balance: ", nl1b)
      // console.log("l2 balance: ", nl1b)

      nl1b.should.to.below(l1b.sub(ethers.utils.parseEther('5')))
      nl2b.should.to.equal(l2b.add(ethers.utils.parseEther('5')))
    })
  })

  describe('withdrawETH 使用 l2 sb 合约', () => {

    it('should get balance before', async () => {

      l1b = await l1Signer.getBalance()
      l2b = await L2_ETH_TOKEN.balanceOf(l2Signer.address)
      // console.log("l1 balance: ", l1b)
      // console.log("l2 balance: ", l2b)

      l1b.should.be.at.least(0)
      l2b.should.be.at.least(0)
    })

    // it('should approve to standardBridge', async () => {

    //   let tx = await L2_ETH_TOKEN.approve(
    //     process.env.L2_Standard_Bridge!,
    //     ethers.utils.parseEther('100')
    //   )

    //   tx.chainId.should.to.equal(+process.env.L2CHAINID!)
    //   tx.hash.should.to.have.lengthOf(66)
    // })

    // it('should query standardBridge allowance', async () => {
    //   execSync('sleep 5');

    //   alnc = await L2_ETH_TOKEN.allowance(
    //     l2Signer.address,
    //     process.env.L2_Standard_Bridge!
    //   )
      
    //   alnc.should.to.equal(ethers.utils.parseEther('100'))
    // })
    
    it('should trigger the withdraw ETH function with the given amount', async () => {

      response = await L2_Standard_Bridge.withdraw(
        process.env.L2_ETH_Token!,
        ethers.utils.parseEther('5.12313'),
        1500000,
        '0x' + '22'.repeat(32))
      // console.log("response: ", response)
      // 返回的type为null，可能需要关注
      // response.type!.should.to.equal(2)
      response.chainId.should.to.equal(+process.env.L2CHAINID!)
      response.hash.should.to.have.lengthOf(66)

      let rcpt = await response.wait()
      // console.log("rcpt status: ", rcpt.status)
      // console.log("rcpt to: ", rcpt.to)
      rcpt.status.should.to.equal(1)
      rcpt.to.should.to.equal(process.env.L2_Standard_Bridge!)
    
      execSync('sleep 5');
    })

    // it('should updated allowance', async () => {
    //   execSync('sleep 5');

    //   let nalnc = await L2_ETH_TOKEN.allowance(
    //     l2Signer.address,
    //     process.env.L2_Standard_Bridge!
    //   )
      
    //   alnc.should.to.equal(alnc.sub(ethers.utils.parseEther('5.12313')))
    // })

    it('should finalizeMessage is success', async () => {
      const finalizeMessageResponse = await crossChainMessenger.finalizeMessage(response)

      finalizeMessageResponse.type!.should.to.equal(2)
    })

    it('should MessageStatus is RELAYED', async () => {

      await crossChainMessenger.waitForMessageStatus(
        response.hash,mantle.MessageStatus.RELAYED)
      let gms = await crossChainMessenger.getMessageStatus(response.hash)
      
      gms.should.to.equal(5)
    })

    it('should get balance after', async () => {
      execSync('sleep 10');

      const nl1b = await l1Signer.getBalance()
      const nl2b = await L2_ETH_TOKEN.balanceOf(l2Signer.address)
      // console.log("l1 balance: ", l1b)
      // console.log("l2 balance: ", l2b)
      // console.log("nl1 balance: ", nl1b)
      // console.log("nl2 balance: ", nl2b)

      nl1b.should.to.equal(l1b.add(ethers.utils.parseEther('5.12313')))
      nl2b.should.to.equal(l2b.sub(ethers.utils.parseEther('5.12313')))
    })
  })

});