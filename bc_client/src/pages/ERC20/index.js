import "./index.scss";
import useStore from "@/storage";
function ERC20() {
  const store = useStore();
  const contractConfig = require("@/common/contract-config.json");
  const contractName = contractConfig.ERC20;
  const contractInfo = require("@/contracts/contractInfo.json");
  console.log(contractInfo[contractName]);
  return (
    <div>
      <div className="basic-block">
        <div className="title">Token 基本信息</div>
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
    </div>
  );
}

export default ERC20;
