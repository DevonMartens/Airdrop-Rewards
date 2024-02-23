const hre = require("hardhat");

async function main() {
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const AirdropERC721A = await hre.ethers.getContractFactory("AirdropERC721A");
  const airdropERC721A = await AirdropERC721A.attach(contractAddress);

  const addresses = [
        "0x74288E13582b3aD474Bc100Bb06616FF44724F3d", 
        "0x9625209a3447625C8864f443754Bc721DAE015b3",
        "0x6D2eb34A25F949D6A25FF19A473eb87E91a006a0",
        "0x10393828A9B27339F286D0FAE8a9F3689d51b7FE",
        "0x4aCB93CE5DD12f196a284EC640BEcd5a1Fafa5AA",
        "0x2e93959BA53AF3Ae309261E093b28ce8673D438F",
        "0x49F66A611d2015d29F78b6898e20B40d9b5a59A8",
        "0xD0AaDbAF3c7f5ff6b6481c553c8B2C442b5e75eE",
        "0xDaDb20c3E958671aB05130a8979Ab61b09F1045B",
        "0x14036908dEfea47116c943AE1dF4612F34A7f99A",
      ];

  const tx = await airdropERC721A.airdrop(addresses);
  await tx.wait();

  console.log("Airdrop executed to 10 addresses");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
