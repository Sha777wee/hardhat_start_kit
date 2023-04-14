# 1.整体概览

该项目矿建用于快速搭建 web3 服务,用到的技术栈如下:

- **语言:** javascript + solidy

- **智能合约框架:** hardhat

- **前端:** react+antd

- **后端:** express+mongodb

- **开发 IDE:** VSCode

- **js 库:** ethers

```shell
# 区块链相关服务目录
mkdir bc_server
# 前端目录
mkdir bc_client
#excalidraw  后端目录
mkdir server
```

# 2. 初始化 bc_server

```shell
# 区块链服务目录初始化
cd bc_server
npm init -y
npm install hardhat --save-dev
npx hardhat init
```

选择 javaScript 项目构建,其他选项保持默认

```shell
# 用到的其他库
# openzepplin 安全智能合约库
npm install @openzeppelin/contracts

# rimraf 用于rm -rf
npm install rimraf --save-dev
```

修改 package.json,添加常用命令

```json
"scripts": {
    "compile": "npx hardhat compile",
    "build": "npx hardhat compile",
    "deploy": "npx hardhat run scripts/deploy.js && npm run copy",
    "copy": "rimraf ../bc_client/src/contracts && cp -R ./artifacts/contracts ../bc_client/src/contracts",
    "server": "npx hardhat node --port 8545",
    "test": "npx hardhat test",
    "clean" :"npx hardhat clean"
  },
```

修改部署脚本 deploy.js

```js
const { ethers, config } = require("hardhat");
const fs = require("fs");
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
        [chainId]: contractInstance.address,
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
```

修改 hardhat.config.js 添加 networks

```js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_MAINNET_API_KEY = "";
const ALCHEMY_GOERLI_API_KEY = "";
const ALCHEMY_SEPOLIA_API_KEY = "";
const privateKey = "";
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
```

# 3. 初始化 bc_client

```shell
# 前端目录初始化
cd bc_client
npx create-react-app ./
# 安装路由库
npm install react-router-dom
# antd蚂蚁组件库
npm install antd
# mobx方便统一管理状态变量
npm install mobx mobx-react-lite
# 安装sass支持
npm install sass
# ethers库用于与区块链交互
npm install ethers
# craco可以方便自定义配置项目
npm install @craco/craco
```

安装 craco 之后需要修改配置

craco.config.js 配置文件：

```js
const path = require("path");
module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用@来表示src文件所在路径
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

package.json 文件修改：

```js
"scripts": {
	"start": "craco start",
	"build": "craco build",
	"test": "craco test",
	"eject": "craco eject"
},
```

在项目根目录下创建 jsconfig.json 配置文件，这个可以让 vscode 识别@路径并给出路径提示
在配置下添加以下配置,vscode 会自动读取该配置

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

# 3. 初始化 server

```shell
# 服务端目录初始化
cd server
npm init -y
npm install express
npm isntall mongoose
# ethers库用于与区块链交互
npm install ethers
# 用nodemon启动项目可以立即响应修改内容
npm install nodemon --save-dev
```

修改 package.json,增加 nodemon 启动

```json
 "scripts": {
    "serve": "nodemon server.js"
  },
```
