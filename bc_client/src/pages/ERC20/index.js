import "./index.scss";
import useStore from "@/storage";
import { Alert, Button, Input, Space, message } from "antd";
import { ethers } from "ethers";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { createRef, useState } from "react";

function ERC20() {
  const store = useStore();
  let contract;
  // 初始化ERC20合约信息
  const initialContractInfo = async () => {
    const contractConfig = require("@/common/contract-config.json");
    const contractName = contractConfig.ERC20;
    const contractInfo = require("@/contracts/contractInfo.json");
    runInAction(() => {
      store.erc20Storage.setChainId(contractInfo[contractName].chainId);
      store.erc20Storage.setAddress(contractInfo[contractName].address);
    });
    const {
      abi,
    } = require(`@/contracts/${contractName}.sol/${contractName}.json`);
    contract = new ethers.Contract(
      store.erc20Storage.address,
      abi,
      await store.metamaskStorage.provider.getSigner()
    );
    store.erc20Storage.setName(await contract.name());
    store.erc20Storage.setSymbol(await contract.symbol());
    store.erc20Storage.setDecimals((await contract.decimals()).toString());
    store.erc20Storage.setTotalSupply(
      (await contract.totalSupply()).toString()
    );
  };
  initialContractInfo();

  //水龙头
  const addressToMint = createRef();
  const mint = async () => {
    try {
      const address = addressToMint.current.input.value;
      const result = await contract.mint(address);
      if (result) {
        message.success("成功发起铸币交易！");
      }
    } catch (e) {
      console.log("mint error", e);
    }
  };

  // 查询账户余额
  const addressToCheckRef = createRef();
  let [balance, setBalance] = useState();
  const checkBalance = async () => {
    try {
      const address = addressToCheckRef.current.input.value;
      const result = (await contract.balanceOf(address)).toString();
      setBalance(result);
      message.info(`账户余额为${result}`);
    } catch (e) {
      console.log("check balance error", e);
    }
  };

  // 转账
  const addressToTransfer = createRef();
  const amountToTransfer = createRef();
  const transfer = async () => {
    try {
      const address = addressToTransfer.current.input.value;
      const amount = amountToTransfer.current.input.value;
      const result = await contract.transfer(address, amount);
      if (result) {
        message.success("成功发起转账交易！");
      }
    } catch (e) {
      console.log("transfer error", e);
    }
  };

  // 授权
  const addressToApproveRef = createRef();
  const amountToApproveRef = createRef();
  const approve = async () => {
    try {
      const address = addressToApproveRef.current.input.value;
      const amount = amountToApproveRef.current.input.value;
      const result = await contract.approve(address, amount);
      if (result) {
        message.success("成功发起授权交易！");
      }
    } catch (e) {
      console.log("approve error", e);
    }
  };
  // 查询授权额度
  const addressAllowanceFromRef = createRef();
  const addressAllowanceToRef = createRef();
  let [allowance, setAllowance] = useState();
  const checkAllowance = async () => {
    try {
      const from = addressAllowanceFromRef.current.input.value;
      const to = addressAllowanceToRef.current.input.value;
      const result = (await contract.allowance(from, to)).toString();
      setAllowance(result);
      message.info(`授权额度为${result}`);
    } catch (e) {
      console.log("check allowance error", e);
    }
  };
  // 提取 一直报insufficent allowance，暂未解决
  const addressExtractFromRef = createRef();
  const addressExtractToRef = createRef();
  const amountToExtractREf = createRef();
  const extract = async () => {
    try {
      const from = addressExtractFromRef.current.input.value;
      const to = addressExtractToRef.current.input.value;
      const amount = amountToExtractREf.current.input.value;
      const result = await contract.transferFrom(from, to, amount);
      console.log(result);
      if (result) {
        message.success("成功发起提取交易！");
      }
    } catch (e) {
      console.log("extract error", e);
    }
  };
  return (
    <div className="erc20-block">
      {store.metamaskStorage.isConnected || (
        <Alert message="请先连接Metamask" type="warning" showIcon closable />
      )}
      <div className="basic-block">
        <div className="title">
          Token 基本信息
          <Button
            className="refresh-btn"
            size="small"
            onClick={initialContractInfo}
          >
            刷新
          </Button>
        </div>
        <div>
          <span className="info">
            部署网络：<span className="info">{store.erc20Storage.chainId}</span>
          </span>
          <span className="info">
            合约地址：<span className="info">{store.erc20Storage.address}</span>
          </span>
        </div>
        <div>
          <span className="info">
            名称:<span className="info">{store.erc20Storage.name}</span>
          </span>
          <span className="info">
            符号:<span className="info">{store.erc20Storage.symbol}</span>
          </span>
          <span className="info">
            精度:<span className="info">{store.erc20Storage.decimals}</span>
          </span>
          <span className="info">
            总供应量:
            <span className="info">{store.erc20Storage.totalSupply}</span>
          </span>
        </div>
      </div>

      <div className="interact-block">
        <div>
          <div className="label">水龙头(一次领取100)</div>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              ref={addressToMint}
              className="input"
              placeholder="请输入接收地址"
              bordered={false}
            />
            <Button size="large" onClick={mint}>
              铸币
            </Button>
          </Space.Compact>
          <hr />
        </div>

        <div>
          <div className="label">查询账户余额： {balance}</div>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              ref={addressToCheckRef}
              className="input"
              placeholder="请输入钱包地址"
              bordered={false}
            />
            <Button size="large" onClick={checkBalance}>
              查询
            </Button>
          </Space.Compact>
          <hr />
        </div>

        <div>
          <div className="label">转账</div>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              ref={addressToTransfer}
              className="input"
              placeholder="转入地址"
              bordered={false}
              style={{
                width: "80%",
              }}
            />
            <Input
              ref={amountToTransfer}
              className="input"
              placeholder="金额"
              type="number"
              min={0}
              bordered={false}
              style={{
                width: "20%",
              }}
            />
            <Button size="large" onClick={transfer}>
              转账
            </Button>
          </Space.Compact>
          <hr />
        </div>

        <div>
          <div className="label">授权</div>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              ref={addressToApproveRef}
              className="input"
              placeholder="授权地址"
              bordered={false}
              style={{
                width: "80%",
              }}
            />
            <Input
              ref={amountToApproveRef}
              className="input"
              placeholder="金额"
              type="number"
              min={0}
              bordered={false}
              style={{
                width: "20%",
              }}
            />
            <Button size="large" onClick={approve}>
              授权
            </Button>
          </Space.Compact>
          <hr />
        </div>

        <div>
          <div className="label">查询授权额度：{allowance} </div>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              ref={addressAllowanceFromRef}
              className="input"
              placeholder="授权人地址"
              bordered={false}
              style={{
                width: "50%",
              }}
            />
            <Input
              ref={addressAllowanceToRef}
              className="input"
              placeholder="被授权人地址"
              bordered={false}
              style={{
                width: "50%",
              }}
            />
            <Button size="large" onClick={checkAllowance}>
              查询
            </Button>
          </Space.Compact>
          <hr />
        </div>

        <div>
          <div className="label">提取</div>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              ref={addressExtractFromRef}
              className="input"
              placeholder="提取源地址"
              bordered={false}
              style={{
                width: "40%",
              }}
            />
            <Input
              ref={addressExtractToRef}
              className="input"
              placeholder="提取目的地址"
              bordered={false}
              style={{
                width: "40%",
              }}
            />
            <Input
              ref={amountToExtractREf}
              className="input"
              placeholder="金额"
              type="number"
              min={0}
              bordered={false}
              style={{
                width: "20%",
              }}
            />
            <Button size="large" onClick={extract}>
              转账
            </Button>
          </Space.Compact>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default observer(ERC20);
