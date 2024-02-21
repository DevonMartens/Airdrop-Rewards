const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AirdropERC721A Contract", function () {
  let AirdropNFT;
  let airdropNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy the contract before each test
    AirdropNFT = await ethers.getContractFactory("AirdropERC721A");
    [owner, addr1, addr2] = await ethers.getSigners();
    airdropNFT = await AirdropNFT.deploy();
    await airdropNFT.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await airdropNFT.owner()).to.equal(owner.address);
    });
  });

  describe("Token URI", function () {
    it("Should return the correct token URI for the given token ID", async function () {
      // Mint a token to test the tokenURI function
      await airdropNFT.airdrop([owner.address]);
      expect(await airdropNFT.tokenURI(0)).to.include("range1/");
    });
  });

  describe("Airdrop", function () {
    it("Should mint tokens to multiple addresses", async function () {
      await airdropNFT.airdrop([addr1.address, addr2.address]);
      expect(await airdropNFT.balanceOf(addr1.address)).to.equal(1);
      expect(await airdropNFT.balanceOf(addr2.address)).to.equal(1);
    });
  });
});
