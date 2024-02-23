const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");

describe("AirdropERC1155", function () {
  let airdropERC1155;
  let owner, addr1, addr2, burner;

  beforeEach(async function () {
    // Deploy the contract before each test
    const AirdropERC1155 = await ethers.getContractFactory("AirdropERC1155");
    [owner, addr1, addr2, burner] = await ethers.getSigners();
    airdropERC1155 = await AirdropERC1155.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await airdropERC1155.owner()).to.equal(owner.address);
    });
  });

  describe("Airdrop", function () {
    it("Should allow owner to airdrop tokens", async function () {
      await airdropERC1155.airdrop([addr1.address], [1]);
      expect(await airdropERC1155.balanceOf(addr1.address, 1)).to.equal(1);
    });

    it("Should revert if inputs lengths do not match", async function () {
      await expectRevert(airdropERC1155.airdrop([addr1.address], [1, 2]),
        "MismatchedInputLengths()"
        );
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      expect(await airdropERC1155.uri(1)).to.equal("https://example.com/metadata/1");
    });

    it("Owner can update token URI", async function () {
      const newURI = "https://newexample.com/metadata/1";
      await airdropERC1155.setTokenURI(1, newURI);
      expect(await airdropERC1155.uri(1)).to.equal(newURI);
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      await airdropERC1155.setBurnerAddress(burner.address);
    });

    it("Allowed burner can burn tokens", async function () {
      await airdropERC1155.airdrop([addr1.address], [1]);
      await airdropERC1155.connect(burner).burn(addr1.address, 1);
      expect(await airdropERC1155.balanceOf(addr1.address, 1)).to.equal(0);
    });

    it("Non-allowed address cannot burn tokens", async function () {
        await airdropERC1155.airdrop([burner.address], [1]);
      await expectRevert(airdropERC1155.connect(addr1).burn(burner.address, 1),
      "CallerNotAllowedToBurn()"
      );
  });
});
});
