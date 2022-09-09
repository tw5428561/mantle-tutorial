import { ethers } from "hardhat";
import * as mantle from "@mantlenetworkio/sdk"
import { should, getSigners, expect } from '../utils/setup'
import { BigNumber, ContractTransaction, Wallet } from "ethers";
import {execSync} from 'child_process';

import { Greeter, Greeter__factory, FromL1_ControlL2Greeter, FromL1_ControlL2Greeter__factory, FromL2_ControlL1Greeter, FromL2_ControlL1Greeter__factory } from '../typechain-types'

import dotenv from "dotenv"
dotenv.config()

let response: ContractTransaction
let l1Signer: Wallet
let l2Signer: Wallet
let l1Greeter: Greeter
let l2Greeter: Greeter
let fromL1_ControlL2Greeter: FromL1_ControlL2Greeter
let fromL2_ControlL1Greeter: FromL2_ControlL1Greeter
let crossChainMessenger: mantle.CrossChainMessenger


describe('Communication between contracts on L1 and L2', function () {

  this.timeout(150000);
  this.slow(150000);
  
  before(async() => {
    [l1Signer, l2Signer] = await getSigners()

    crossChainMessenger = new mantle.CrossChainMessenger({
        l1ChainId: process.env.L1CHAINID!,   // For Kovan, it's 1 for Mainnet
        l2ChainId: process.env.L2CHAINID!,
        l1SignerOrProvider: l1Signer,
        l2SignerOrProvider: l2Signer
    })

    l1Greeter = await new Greeter__factory(l1Signer).deploy("l1 default messages!");
    await l1Greeter.deployed();
    // console.log("l1Greeter address: ", l1Greeter.address)
    
    l2Greeter = await new Greeter__factory(l2Signer).deploy("l2 default messages!");
    await l2Greeter.deployed();
    // console.log("l2Greeter address: ", l2Greeter.address)

    fromL1_ControlL2Greeter = await new FromL1_ControlL2Greeter__factory(l1Signer).deploy(process.env.L1_CROSS_DOMAIN_MESSENGER!, l2Greeter.address);
    await fromL1_ControlL2Greeter.deployed();
    // console.log("fromL1_ControlL2Greeter address: ", fromL1_ControlL2Greeter.address)

    fromL2_ControlL1Greeter = await new FromL2_ControlL1Greeter__factory(l2Signer).deploy(process.env.L2_CROSS_DOMAIN_MESSENGER!, l1Greeter.address);
    await fromL2_ControlL1Greeter.deployed();
    // console.log("fromL2_ControlL1Greeter address: ", fromL2_ControlL1Greeter.address)

  });

    describe('L1 message to L2',()=>{

      it('should get l2 greeter message', async () => {
        let message = await l2Greeter.greet()

        message.should.be.equal("l2 default messages!")
      })

      it('should l1 can cross message to l2', async () => {
        
        let tx = await fromL1_ControlL2Greeter.setGreeting("l1 have updated l2 message!")
        let rcpt = await tx.wait()
        // console.log(rcpt)

        execSync('sleep 5');
      })

      it('should get l2 updated greeter message', async () => {
        let m2 = await l2Greeter.greet()

        m2.should.be.equal("l1 have updated l2 message!")
      })
    })

    describe('L2 message to L1',()=>{

      it('should get l1 greeter message', async () => {
        let message = await l1Greeter.greet()

        message.should.be.equal("l1 default messages!")
      })

      it('should l2 can cross message to l1', async () => {

        response = await fromL2_ControlL1Greeter.setGreeting("l2 have updated l1 message!")
        let rcpt = await response.wait()
        // console.log(response.hash, rcpt.to)

        execSync('sleep 20');
      })

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

      it('should get l1 updated greeter message', async () => {
        let m1 = await l1Greeter.greet()

        m1.should.be.equal("l2 have updated l1 message!")
      })
    })
   });