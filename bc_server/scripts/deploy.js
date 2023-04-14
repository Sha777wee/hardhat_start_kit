const { ethers } = require("hardhat");

let contractToDeploy = [
  {
    name: "Lock",
    params: [
      Math.round(Date.now() / 1000) + 60,
      { value: hre.ethers.utils.parseEther("0.001") },
    ],
  },
];

let contractDeployedInfo = {};

async function main() {
  [deployer, addr1, addr2] = await ethers.getSigners();
  console.log(`========== Deploy contract by ${deployer.address} ==========`);

  const chainId = ethers.provider.network.chainId;
  for (let contract of contractToDeploy) {
    const contracFactory = await ethers.getContractFactory(contract.name);
    const contractInstance = await contracFactory.deploy(...contract.params);
    await contractInstance.deployed();
    contractDeployedInfo = {
      ...contractDeployedInfo,
      [contract.name]: {
        [chainId]: contractInstance.address,
      },
    };
    console.log(
      `success deploy contract: ${contract.name} | chainId: ${chainId} | address: ${contractInstance.address}`
    );
  }
  exportDeployedContractInfo();
}

// 部署合约脚本执行完,导出所有已部署合约地址
function exportDeployedContractInfo() {
  const fs = require("fs");
  fs.writeFile(
    "./artifacts/contracts/contractInfo.json",
    JSON.stringify(contractDeployedInfo),
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
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
