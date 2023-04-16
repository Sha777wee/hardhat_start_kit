const { ethers, config } = require("hardhat");
const fs = require("fs");
let contractToDeploy = [
  {
    name: "SWC",
    params: [],
  },
];

let contractDeployedInfo = {};
let accountInfo = [];

async function main() {
  [deployer, addr1, addr2] = await ethers.getSigners();
  console.log(`========== Deploy contract by ${deployer.address} ==========`);

  const chainId = (await ethers.provider.getNetwork()).chainId;

  for (let contract of contractToDeploy) {
    const contracFactory = await ethers.getContractFactory(contract.name);
    const contractInstance = await contracFactory.deploy(...contract.params);
    await contractInstance.deployed();
    contractDeployedInfo = {
      ...contractDeployedInfo,
      [contract.name]: {
        chainId: chainId,
        address: contractInstance.address,
      },
    };
    console.log(
      `success deploy contract: ${contract.name} | chainId: ${chainId} | address: ${contractInstance.address}`
    );
  }
  exportDeployedContractInfo();
  exportAccountInfo();
}

// 导出所有已部署合约地址
function exportDeployedContractInfo() {
  fs.writeFile(
    "./artifacts/contracts/contractInfo.json",
    JSON.stringify(contractDeployedInfo, "", "\t"),
    (err) => {
      if (err) {
        console.log(
          "=========== Faied to export deplyed contract info! ==========",
          err
        );
      } else {
        console.log(
          "=========== Success to export deployed contract info! =========="
        );
      }
    }
  );
}

// 导出hardhat中的账户地址和私钥
async function exportAccountInfo() {
  const accounts = config.networks.hardhat.accounts;
  for (let i = 0; i < 20; i++) {
    const wallet = ethers.Wallet.fromMnemonic(
      accounts.mnemonic,
      accounts.path + `/${i}`
    );
    const address = wallet.address;
    const privateKey = wallet.privateKey;
    accountInfo.push({ address: address, privateKey: privateKey });
  }

  fs.writeFile(
    "./artifacts/contracts/account.json",
    JSON.stringify(accountInfo, "", "\t"),
    (err) => {
      if (err) {
        console.log(
          "=========== Faied to export account info! ==========",
          err
        );
      } else {
        console.log("=========== Success to export account info! ==========");
      }
    }
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
