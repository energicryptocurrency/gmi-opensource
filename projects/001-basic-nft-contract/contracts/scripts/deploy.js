const { getAccount, getProvider } = require("./helpers");

task("check-balance", "Prints out the balance of a specified account")
  .addPositionalParam("address", "The address to check the balance of")
  .setAction(async function(taskArguments, hre) {
    const { address } = taskArguments;
    const provider = getProvider(hre);

    // Get the network name
    const network = hre.network.name;

    const balance = await provider.getBalance(address);

    console.log(`Account balance for ${address} on ${network}: ${ethers.utils.formatEther(balance)} NRG`);
  });

task("deploy", "Deploys the NFT.sol contract").setAction(async function(taskArguments, hre) {
  const account = getAccount(hre);
  const nftContractFactory = await hre.ethers.getContractFactory("NFT", account);

  // Get the network name
  const network = hre.network.name;

  // Deploy the contract using the gas configuration from hardhat.config.js
  const nft = await nftContractFactory.deploy();

  // Wait for the deployment transaction to be mined
  await nft.deployTransaction.wait();

  console.log(`Contract deployed to address: ${nft.address} on ${network}`);
  console.log(`Transaction hash: ${nft.deployTransaction.hash}`);
});
