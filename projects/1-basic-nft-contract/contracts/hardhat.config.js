/** @type import('hardhat/config').HardhatUserConfig **/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("./scripts/deploy.js");
require("./scripts/mint.js");

const { RPC_URL, ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      evmVersion: 'istanbul',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 40000000,
    },
    energiMainnet: {
      chainId: 39797,
      url: String(RPC_URL || "https://nodeapi.energi.network"),
      gas: 2000000,
      gasPrice: 20000000000, // 20 GWei
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
    energiTestnet: {
      chainId: 49797,
      url: String(RPC_URL || "https://nodeapi.test.energi.network"),
      gas: 2000000,
      gasPrice: 20000000000, // 20 GWei
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      energiTestnet: 'xxxxx-no-api-key-needed-xxxxx',
      energiMainnet: 'xxxxx-no-api-key-needed-xxxxx'
    },
    customChains: [
      {
        network: "energiMainnet",
        chainId: 39797,
        urls: {
          apiURL: "https://explorer.energi.network/api",
          browserURL: "https://explorer.energi.network"
        },
      },
      {
        network: "energiTestnet",
        chainId: 49797,
        urls: {
          apiURL: "https://explorer.test.energi.network/api",
          browserURL: "https://explorer.test.energi.network"
        },
      },
    ]
  },
  // Custom task for verification with specified network
  customTasks: {
    verify: {
      description: "Verifies a contract on a specified network",
      task: async function(args, hre) {
        const { run } = hre;
        const { network } = args;

        // Check if the specified network exists in the configuration
        if (!hre.config.networks[network]) {
          throw new Error(`Network '${network}' is not defined in the hardhat.config.js file.`);
        }

        // Set the specified network as the default network for this task
        hre.network.name = network;

        // Run the verification task with the specified network
        await run("verify:contract", args);
      },
    },
  },
};
