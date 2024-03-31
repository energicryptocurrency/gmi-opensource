const { ethers, network } = require("hardhat");

async function main() {
  const nftProxyAdmin = await ethers.deployContract("NFTProxyAdmin", [], {
    gasLimit: "0x1000000",
  });
  await nftProxyAdmin.waitForDeployment();

  console.log(
    `NFTProxyAdmin is deployed at ${await nftProxyAdmin.getAddress()}`
  );

  const nft = await ethers.deployContract("NFTUpgradeable", [], {
    gasLimit: "0x1000000",
  });
  await nft.waitForDeployment();

  console.log(`NFTUpgradeable is deployed at ${await nft.getAddress()}`);

  const nftProxy = await ethers.deployContract(
    "NFTProxy",
    [await nft.getAddress(), await nftProxyAdmin.getAddress(), "0x"],
    { gasLimit: "0x1000000" }
  );
  await nftProxy.waitForDeployment();

  console.log(`NFTProxy is deployed at ${await nft.getAddress()}`);

  const nftContract = await ethers.getContractAt(
    "NFTUpgradeable",
    await nftProxy.getAddress()
  );
  await nftContract.initialize({ gasLimit: "0x1000000" });

  console.log(`Contract initialized`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
