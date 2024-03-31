const { task, hardhatArguments } = require("hardhat/config");
const { getContract, getProvider } = require("./helpers");
const fetch = require("node-fetch");

task("mint", "Mints from the NFT contract")
  .addParam("address", "The address to receive a token")
  .setAction(async function(taskArguments, hre) {
    const { address } = taskArguments;
    const network = hre.network.name;

    const contract = await getContract("NFT", hre);

    // Get the MINT_PRICE value from the NFT contract
    const mintPriceInWei = await contract.MINT_PRICE();

    // Set the msg.value to the MINT_PRICE value in wei
    const transactionResponse = await contract.mintTo(address, {
      gasLimit: 500_000,
      gasPrice: 120000000000, // 120 GWei
      value: mintPriceInWei,
    });

    console.log(`Transaction Hash on ${network}: ${transactionResponse.hash}`);
  });

task("set-base-token-uri", "Sets the base token URI for the deployed smart contract")
  .addParam("baseUrl", "The base of the tokenURI endpoint to set")
  .setAction(async function(taskArguments, hre) {
    const { baseUrl } = taskArguments;
    const network = hre.network.name;

    const contract = await getContract("NFT", hre);

    // Get gasLimit from hardhat.config.js
    const gasLimit = hre.network.config.gas || 500_000;

    const transactionResponse = await contract.setBaseTokenURI(baseUrl, {
      gasLimit,
    });

    console.log(`Transaction Hash on ${network}: ${transactionResponse.hash}`);
  });

task("token-uri", "Fetches the token metadata for the given token ID")
  .addParam("tokenId", "The tokenID to fetch metadata for")
  .setAction(async function(taskArguments, hre) {
    const { tokenId } = taskArguments;
    const network = hardhatArguments.network || "hardhat"; // Use the specified network or default to "hardhat"

    // Temporarily switch the network for this task
    const originalNetworkName = hre.network.name;
    hre.network.name = network;

    const contract = await getContract("NFT", hre);
    const response = await contract.tokenURI(tokenId, {
      gasLimit: 500_000,
    });

    const metadata_url = response;
    console.log(`Metadata URL on ${network}: ${metadata_url}`);

    const metadata = await fetch(metadata_url).then((res) => res.json());
    console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);

    // Restore the original network name
    hre.network.name = originalNetworkName;
  });
