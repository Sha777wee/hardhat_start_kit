import { Button, Modal, message } from "antd";
import {
  ImportOutlined,
  CopyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./index.scss";
import { useState } from "react";
import useStore from "@/storage";
import { ethers } from "ethers";
import { observer } from "mobx-react-lite";

function HeaderBlock() {
  const store = useStore();
  const [showModel, setShowModel] = useState(false);

  const accounts = require("@/contracts/account.json");

  const requectAccount = async () => {
    if (!window.ethereum) {
      message.error("未检测到Metamask，请检查您的Metamask是否在正常工作。");
    }
    let accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch(() => {
        message.error("连接失败，请检查您的Metamask是否在正常工作或稍后重试。");
      });
    if (accounts && accounts.length > 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      store.metamaskStorage.setProvider(provider);
      store.metamaskStorage.setAddress(accounts[0]);
      store.metamaskStorage.setChainId(
        (await provider.getNetwork()).chainId.toString()
      );

      window.ethereum.on("accountsChanged", (accounts) => {
        store.metamaskStorage.setAddress(accounts[0]);
        message.info(`账号切换为： ${accounts[0]}`);
      });
      window.ethereum.on("chainChanged", (chainId) => {
        store.metamaskStorage.setChainId(parseInt(chainId, 16));
        message.info(`网络ID切换为： ${parseInt(chainId, 16)}`);
      });
    }
  };

  const logout = () => {
    store.metamaskStorage.clear();
  };

  const copyHandler = (value, result) => {
    if (result) {
      message.success("复制成功！");
    } else {
      message.error("复制失败！");
    }
  };

  return (
    <>
      <div className="header-block">
        <span className="title">hardhat 账号：</span>
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={() => setShowModel(true)}
        >
          打开
        </Button>
        {store.metamaskStorage.isConnected ? (
          <span className="account-info">
            <span className="info-block">
              当前网络Id：{store.metamaskStorage.chainId}
            </span>
            <span className="info-block">
              当前地址：{store.metamaskStorage.address}
              <CopyToClipboard
                text={store.metamaskStorage.address}
                onCopy={copyHandler}
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={<CopyOutlined className="white-icon" />}
                />
              </CopyToClipboard>
            </span>
            <Button
              type="text"
              shape="circle"
              icon={<LogoutOutlined className="white-icon" />}
              onClick={logout}
            />
          </span>
        ) : (
          <Button
            className="connect-btn"
            type="primary"
            shape="round"
            size="large"
            icon={<ImportOutlined />}
            onClick={requectAccount}
          >
            连接Metamask
          </Button>
        )}
      </div>
      <Modal
        title="hardhat 账号："
        centered
        open={showModel}
        onOk={() => setShowModel(false)}
        onCancel={() => setShowModel(false)}
        width={650}
      >
        {accounts.map((item, index) => {
          return (
            <div key={index}>
              <p>账号{index}</p>
              <p>
                地址：{item.address}{" "}
                <CopyToClipboard text={item.address} onCopy={copyHandler}>
                  <Button shape="circle" icon={<CopyOutlined />} />
                </CopyToClipboard>
              </p>
              <p>
                私钥：{item.privateKey}{" "}
                <CopyToClipboard text={item.privateKey} onCopy={copyHandler}>
                  <Button shape="circle" icon={<CopyOutlined />} />
                </CopyToClipboard>
              </p>
              <hr />
            </div>
          );
        })}
      </Modal>
    </>
  );
}
export default observer(HeaderBlock);
