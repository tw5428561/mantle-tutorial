import {expect} from "chai"
import {ethers} from "hardhat"
import { TestERC721__factory } from '../typechain-types'
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("ERC721 contract", () =>{

    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const erc721 = await new TestERC721__factory(owner).deploy();
        await erc721.deployed();
        return { erc721, owner, addr1, addr2 };
      }

    describe("Deployment", () => {

        it("Should set the right name", async () => {
            const { erc721 } = await loadFixture(deployTokenFixture);
            expect(await erc721.name()).to.equal("TestNFT");
        });

        it("Should set the right owner", async () => {
            const { erc721, owner } = await loadFixture(deployTokenFixture);
            expect(await erc721.owner()).to.equal(owner.address);
        });

        it("Should set the right symbol", async () => {
            const { erc721 } = await loadFixture(deployTokenFixture);
            expect(await erc721.symbol()).to.equal("TNFT");
        });

        it("Should assign the total supply of tokens to the owner", async  () => {
            const { erc721, owner } = await loadFixture(deployTokenFixture);
            const ownerBalance = await erc721.balanceOf(owner.address);
            expect(await erc721.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("mint", ()=>{
        it("Should mint a token with token ID 1 & 2 to account1", async  () => {
            const { erc721, owner } = await loadFixture(deployTokenFixture);

            await erc721.safeMint(owner.address, 1);
            expect(await erc721.ownerOf(1)).to.equal(owner.address);

            await erc721.safeMint(owner.address, 2);
            expect(await erc721.ownerOf(2)).to.equal(owner.address);

            expect(await erc721.balanceOf(owner.address)).to.equal(2);

            const svg = await erc721.tokenURI(2)
            console.log("svg: ", svg)
          });

    })
})

