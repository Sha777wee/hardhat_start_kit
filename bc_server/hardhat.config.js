require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_MAINNET_API_KEY = "-";
const ALCHEMY_GOERLI_API_KEY = "";
const ALCHEMY_SEPOLIA_API_KEY = "";
const privateKey =
  "9d210772c2bea208341ea1e2ea39795783de9eec344cc3153c5edf7923c37614";
module.exports = {
  solidity: "0.8.18",
  networks: {
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_MAINNET_API_KEY}`,
      accounts: [privateKey],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_API_KEY}`,
      accounts: [privateKey],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_API_KEY}`,
      accounts: [privateKey],
    },
  },
};
