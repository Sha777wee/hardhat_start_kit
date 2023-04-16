import { makeAutoObservable } from "mobx";

class ERC20Storage {
  chainId = "---";
  address = "--------------------";
  name = "---";
  symbol = "---";
  decimals = 0;
  totalSupply = 0;
  constructor() {
    makeAutoObservable(this);
  }
}
export default ERC20Storage;
