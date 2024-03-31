const { ethers, network } = require("hardhat");

async function main() {
  const nft = await ethers.deployContract("NFT", [], {
    gasLimit: "0x1000000",
  });
  await nft.waitForDeployment();

  console.log(`NFT is deployed at ${await nft.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
