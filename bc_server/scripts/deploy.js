// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

let contractInfo = {};

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();
  let chainId = hre.ethers.provider.network.chainId;
  let address = lock.address;

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
  recordDeployedContract("Lock", chainId, address);

  exportDeployedContractInfo();
}

// 每部署一个合约调用一次,记录合约地址
function recordDeployedContract(contractName, chainId, address) {
  contractInfo = {
    ...contractInfo,
    [contractName]: {
      [chainId]: address,
    },
  };
}

// 部署合约脚本执行完,导出所有已部署合约地址
function exportDeployedContractInfo() {
  const fs = require("fs");
  fs.writeFile(
    "./artifacts/contracts/contractInfo.json",
    JSON.stringify(contractInfo),
    (err) => {
      if (err) {
        console.log("=========== 导出部署合约信息失败! ==========");
        console.log(err);
      } else {
        console.log("=========== 导出部署合约信息成功! ==========");
      }
    }
  );
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
