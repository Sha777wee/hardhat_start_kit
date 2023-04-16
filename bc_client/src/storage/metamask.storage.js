import { makeAutoObservable } from "mobx";

class MetamaskStorage {
  address = "";
  chainId = "";
  provider = "";
  constructor() {
    makeAutoObservable(this);
  }
  setAddress = (_address) => {
    this.address = _address;
  };
  v;
  setChainId = (_chainId) => {
    this.chainId = _chainId;
  };
  setProvider = (_provider) => {
    this.provider = _provider;
  };
  clear = () => {
    this.address = "";
    this.chainId = "";
    this.provider = "";
  };

  get isConnected() {
    return this.address && this.address.length > 0;
  }
}

export default MetamaskStorage;
