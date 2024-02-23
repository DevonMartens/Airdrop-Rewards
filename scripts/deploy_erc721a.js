const hre = require("hardhat");

async function main() {
  const AirdropERC721A = await hre.ethers.getContractFactory("AirdropERC721A");
  const airdropERC721A = await AirdropERC721A.deploy();

  await airdropERC721A.deployed();

  console.log("AirdropERC721A deployed to:", airdropERC721A.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
