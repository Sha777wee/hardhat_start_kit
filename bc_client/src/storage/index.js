import React from "react";
import MetamaskStorage from "./metamask.storage";
import ERC20Storage from "./erc20.storage";
class RootStorage {
  constructor() {
    this.metamaskStorage = new MetamaskStorage();
    this.erc20Storage = new ERC20Storage();
  }
}
const rootStorage = new RootStorage();
const context = React.createContext(rootStorage);
const useStore = () => React.useContext(context);

export default useStore;
