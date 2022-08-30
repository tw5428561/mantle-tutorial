import {expect} from "chai"
import {ethers} from "hardhat"
import { TestERC1155__factory } from '../typechain-types'
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("ERC1155 contract", () =>{

    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const erc1155 = await new TestERC1155__factory(owner).deploy();
        await erc1155.deployed();
        return { erc1155, owner, addr1, addr2 };
      }

    describe("Deployment", () => {

        it("Should set the right owner", async () => {
            const { erc1155, owner } = await loadFixture(deployTokenFixture);
            expect(await erc1155.owner()).to.equal(owner.address);
        });
    });

    describe("mint", ()=>{
        it("Should mint a token with token ID 1 & 2 to account1", async  () => {
            const { erc1155, owner } = await loadFixture(deployTokenFixture);

            await erc1155.mint(owner.address, 1,1,"https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address,1)).to.equal(1);

            await erc1155.mint(owner.address, 2,2,"https://baseUrl.com");
            expect(await erc1155.balanceOf(owner.address,2)).to.equal(2);

            const svg = await erc1155.uri(2)
            console.log("svg:", svg)
          });
    })
})
