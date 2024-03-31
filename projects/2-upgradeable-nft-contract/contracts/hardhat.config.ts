import { HardhatUserConfig } from "hardhat/types";
import type { HttpNetworkUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();
const { MNEMONIC, PK } = process.env;

const DEFAULT_MNEMONIC =
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const sharedNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  sharedNetworkConfig.accounts = [PK];
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
  };
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    development: {
      ...sharedNetworkConfig,
      url: "http://127.0.0.1:7545",
    },
    energi: {
      ...sharedNetworkConfig,
      chainId: 39797,
      url: "https://nodeapi.energi.network",
      gas: 30000000,
      gasPrice: 20000000000, // 20 GWei
    },
    energiTestnet: {
      ...sharedNetworkConfig,
      chainId: 49797,
      url: "https://nodeapi.test.energi.network",
      gas: 1000000,
      gasPrice: 20000000000, // 20 GWei
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      energiTestnet: "xxxxx-no-api-key-needed-xxxxx",
      energi: "xxxxx-no-api-key-needed-xxxxx",
    },
    customChains: [
      {
        network: "energi",
        chainId: 39797,
        urls: {
          apiURL: "https://explorer.energi.network/api",
          browserURL: "https://explorer.energi.network",
        },
      },
      {
        network: "energiTestnet",
        chainId: 49797,
        urls: {
          apiURL: "https://explorer.test.energi.network/api",
          browserURL: "https://explorer.test.energi.network",
        },
      },
    ],
  },
};

export default config;
