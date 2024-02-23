const hre = require("hardhat");

async function main() {
  const AirdropERC1155 = await hre.ethers.getContractFactory("AirdropERC1155");
  const airdropERC1155 = await AirdropERC1155.deploy();

  await airdropERC1155.deployed();

  console.log("AirdropERC1155 deployed to:", airdropERC1155.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
