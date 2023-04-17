import { makeAutoObservable } from "mobx";

class ERC20Storage {
  chainId = "---";
  address = "--------------------";
  name = "---";
  symbol = "---";
  decimals = 0;
  totalSupply = 0;
  contract = "";
  constructor() {
    makeAutoObservable(this);
  }
  setChainId = (_chainId) => {
    this.chainId = _chainId;
  };
  setAddress = (_address) => {
    this.address = _address;
  };
  setName = (_name) => {
    this.name = _name;
  };
  setSymbol = (_symbol) => {
    this.symbol = _symbol;
  };
  setDecimals = (_decimals) => {
    this.decimals = _decimals;
  };
  setTotalSupply = (_totalSupply) => {
    this.totalSupply = _totalSupply;
  };
  setContract = (_contract) => {
    this.contract = _contract;
  };
  clear = () => {
    this.name = "---";
    this.symbol = "---";
    this.decimals = 0;
    this.totalSupply = 0;
  };
}
export default ERC20Storage;
