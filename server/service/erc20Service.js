const ethers = require("ethers");
const contractConfig = require("../config/contract-config.json");
const contractInfo = require("../contracts/contractInfo.json");
const ERC20Model = require("../models/ERC20Model.js");

function saveLog(operation, from, to, value) {
  let erc20Model = new ERC20Model({ operation, from, to, value });
  erc20Model.save();
}

module.exports = async function erc20Service() {
  let reuslt = ERC20Model.deleteMany().then((result) => {});
  let provider = new ethers.JsonRpcProvider("http://localhost:8545");
  let contractName = contractConfig.ERC20;
  let address = contractInfo[contractName].address;
  let {
    abi,
  } = require(`../contracts/${contractName}.sol/${contractName}.json`);
  let contract = new ethers.Contract(address, abi, provider);

  contract.on("Transfer", (from, to, value) => {
    saveLog("转账", from, to, value);
  });

  contract.on("Approval", (from, to, value) => {
    saveLog("授权", from, to, value);
  });
};
