import {expect} from "chai"
import {ethers} from "hardhat"
import { TestERC20, TestERC20__factory } from '../typechain-types'
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { check } from "prettier";

describe("ERC20Token contract", () =>{

    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const erc20 = await new TestERC20__factory(owner).deploy("Testcoin", "abiton");
        await erc20.deployed();
        return { erc20, owner, addr1, addr2 };
      }

    describe("Deployment", function () {
        
        it("Should set the right name", async () => {
            const { erc20 } = await loadFixture(deployTokenFixture);
            expect(await erc20.name()).to.equal("Testcoin");
        });
        
        it("Should set the right owner", async () => {
            const { erc20, owner } = await loadFixture(deployTokenFixture);
            expect(await erc20.owner()).to.equal(owner.address);
        });
    
        it("Should set the right symbol", async () => {
            const { erc20 } = await loadFixture(deployTokenFixture);
            expect(await erc20.symbol()).to.equal("abiton");
        });
        
        it("Should set the right decimals", async () => {
            const { erc20 } = await loadFixture(deployTokenFixture);
            expect(await erc20.decimals()).to.equal(18);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const { erc20, owner } = await loadFixture(deployTokenFixture);
            const ownerBalance = await erc20.balanceOf(owner.address);
            expect(await erc20.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("ERC20 Ownership",()=>{
        
        it("Should transferOwnership to add1", async () => {
            const { erc20, addr1 } = await loadFixture(deployTokenFixture);
            await erc20.transferOwnership(addr1.address)
            expect(await erc20.owner()).to.equal(addr1.address);
        });
        
        // it("Should fail if add1 transferOwnership to add2", async () => {
        //     const { erc20, addr1, addr2 } = await loadFixture(deployTokenFixture);
        //     await expect(
        //         await erc20.connect(addr1).transferOwnership(addr2.address)
        //       ).to.be.revertedWith("Ownable: caller is not the owner");
        // });

        it("Should set owner to nullAddress after renounceOwnership", async () => {
            const nullAddress = "0x0000000000000000000000000000000000000000";
            const { erc20 } = await loadFixture(deployTokenFixture);
            await erc20.renounceOwnership()
            expect(await erc20.owner()).to.equal(nullAddress);
        });

        // it("Should fail if add1 renounceOwnership", async () => {
        //     const { erc20, addr1 } = await loadFixture(deployTokenFixture);
        //     await expect(
        //         await erc20.connect(addr1).renounceOwnership()
        //       ).to.be.revertedWith("Ownable: caller is not the owner");
        // });
    })

    describe("ERC20 allowance",()=>{

        it("Should default allowance is 0", async () => {
            const spender = "0x387F83710c848Ead3047B2cDF85Ad87127309A49";
            const { erc20, owner } = await loadFixture(deployTokenFixture);
            const ownerAllowance = await erc20.allowance(owner.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from(0));
        });
    
        it("Should approve allowance to spender", async () => {
            const spender = "0x387F83710c848Ead3047B2cDF85Ad87127309A49";
            const { erc20, owner } = await loadFixture(deployTokenFixture);
            await erc20.approve(spender, ethers.BigNumber.from("1000000000000000000"))
            const ownerAllowance = await erc20.allowance(owner.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from("1000000000000000000"));
        });

        it("Should transferFrom the all allowances", async () => {
            const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);
            const spender = addr2.address
            await erc20.approve(spender, ethers.BigNumber.from("1000000000000000000"))
            let ownerAllowance = await erc20.allowance(owner.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            await erc20.mint(owner.address, ethers.BigNumber.from("2000000000000000000"))
            let ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(ethers.BigNumber.from("2000000000000000000"));

            await erc20.connect(addr2).transferFrom(owner.address, addr1.address, ethers.BigNumber.from("1000000000000000000"))
            ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            let addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            ownerAllowance = await erc20.allowance(owner.address, spender);
            expect(ownerAllowance).to.equal(ethers.BigNumber.from(0));
        });
    
        it("Should decrease and increase allowance to spender", async () => {
            const spender = "0x387F83710c848Ead3047B2cDF85Ad87127309A49";
            const { erc20, owner } = await loadFixture(deployTokenFixture);
            await erc20.increaseAllowance(spender, ethers.BigNumber.from("1000000000000000000"))
            const ownerIncreaseAllowance = await erc20.allowance(owner.address, spender);
            expect(ownerIncreaseAllowance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            await erc20.decreaseAllowance(spender, ethers.BigNumber.from("1000000000000000000"))
            const ownerDecreaseAllowance = await erc20.allowance(owner.address, spender);
            expect(ownerDecreaseAllowance).to.equal(ethers.BigNumber.from(0));
        });
    })

    describe("ERC20 mint",()=>{
        it("Should mint owner balances", async () => {
            const { erc20, owner } = await loadFixture(deployTokenFixture);
            await erc20.mint(owner.address, ethers.BigNumber.from("1000000000000000000"))
            const ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            expect(await erc20.totalSupply()).to.equal(
                ethers.BigNumber.from("1000000000000000000")
              );
        });
    
        it("Should mint owner and addr1 balances", async () => {
            const { erc20, owner, addr1} = await loadFixture(deployTokenFixture);
            await erc20.mint(owner.address, ethers.BigNumber.from("1000000000000000000"))
            const ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(ethers.BigNumber.from("1000000000000000000"));

            await erc20.mint(addr1.address, ethers.BigNumber.from("2000000000000000000"))
            const addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.BigNumber.from("2000000000000000000"));

            expect(await erc20.totalSupply()).to.equal(
                ethers.BigNumber.from("3000000000000000000")
              );
        });
    })

    describe("Transactions", function () {

        it("Should fail if sender doesn't have enough tokens", async function () {
            const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);
            const initialOwnerBalance = await erc20.balanceOf(owner.address);
            await expect(
              erc20.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  
            expect(await erc20.balanceOf(owner.address)).to.equal(
              initialOwnerBalance
            );
          });

        it("Should transfer tokens between accounts", async function () {
          const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);

          await erc20.mint(owner.address, 50)
          const ownerBalance = await erc20.balanceOf(owner.address);
          expect(ownerBalance).to.equal(50);

          await  erc20.transfer(addr1.address, 10)
          const addr1Balance = await erc20.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(10);
        //   await expect(
        //     erc20.transfer(addr1.address, 50)
        //   ).to.changeTokenBalances(erc20, [owner, addr1], [-50, 50]);
    
        await  erc20.connect(addr1).transfer(addr2.address, 10)
        const addr2Balance = await erc20.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(10);
        //   await expect(
        //     erc20.connect(addr1).transfer(addr2.address, 50)
        //   ).to.changeTokenBalances(erc20, [addr1, addr2], [-50, 50]);
        });
    
        it("should emit Transfer events", async function () {
          const { erc20, owner, addr1, addr2} = await loadFixture(deployTokenFixture);

          await erc20.mint(owner.address, 150)
          const ownerBalance = await erc20.balanceOf(owner.address);
          expect(ownerBalance).to.equal(150);

          await expect(erc20.transfer(addr1.address, 50))
            .to.emit(erc20, "Transfer")
            .withArgs(owner.address, addr1.address, 50);
    
          await expect(erc20.connect(addr1).transfer(addr2.address, 50))
            .to.emit(erc20, "Transfer")
            .withArgs(addr1.address, addr2.address, 50);
        });

        // this check before check owner’s balances
        it("Should fail if transfer to 0 address", async () => {
            const { erc20, addr1 } = await loadFixture(deployTokenFixture);
            const nullAddress = "0x0000000000000000000000000000000000000000";
            await expect(
                erc20.transfer(nullAddress, 1)
            ).to.be.revertedWith("ERC20: transfer to the zero address");
        });
    
        it("Should fail if negative value to transfer is given", async () => {
            const { erc20, addr1 } = await loadFixture(deployTokenFixture);
            await expect(erc20.transfer(addr1.address, -1)).to.be.reverted;
        });

        it("Should received the full amount, isn't charged fee", async () => {
            const { erc20, owner, addr1 } = await loadFixture(deployTokenFixture);

            await erc20.mint(owner.address, 100)
            const ownerBalance = await erc20.balanceOf(owner.address);
            expect(ownerBalance).to.equal(100);

            await erc20.transfer(addr1.address, 100);
            expect(await erc20.balanceOf(addr1.address)).to.equal(
              ethers.BigNumber.from(100)
            );
          });
      });
})