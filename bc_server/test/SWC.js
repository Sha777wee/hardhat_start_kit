const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SWC", () => {
  let contract;
  let signer0, signer1, signer2;
  let deployer, address1, address2;

  beforeEach(async () => {
    const factory = await ethers.getContractFactory("SWC");
    contract = await factory.deploy();
    [signer0, signer1, signer2] = await ethers.getSigners();
    deployer = signer0.address;
    address1 = signer1.address;
    address2 = signer2.address;
  });

  describe("deploy", () => {
    it("check name", async () => {
      const result = await contract.name();
      expect(result).to.equal("SW Coin");
    });

    it("check symbol", async () => {
      const result = await contract.symbol();
      expect(result).to.equal("SWC");
    });

    it("check decimals", async () => {
      const result = await contract.decimals();
      expect(result).to.equal(18);
    });

    it("check total supply", async () => {
      const result = await contract.totalSupply();
      expect(result).to.equal(1000);
    });

    it("check deployer balance", async () => {
      const result = await contract.balanceOf(deployer);
      expect(result).to.equal(1000);
    });
  });
  describe("mint", () => {
    it("mint", async () => {
      const amount = 100;
      const deployerBalance = await contract.balanceOf(deployer);
      const address1Balance = await contract.balanceOf(address1);
      await contract.mint(deployer);
      await contract.mint(address1);
      const _deployerBalance = await contract.balanceOf(deployer);
      const _address1Balance = await contract.balanceOf(address1);

      expect(_deployerBalance).to.equal(
        parseInt(deployerBalance) + parseInt(amount)
      );
      expect(_address1Balance).to.equal(
        parseInt(address1Balance) + parseInt(amount)
      );
    });
  });
  describe("transfer", () => {
    it("sufficient sender balance", async () => {
      const amount = 10;
      const fromBalance = await contract.balanceOf(deployer);
      const toBalance = await contract.balanceOf(address1);
      const tx = await contract.transfer(address1, amount);
      expect(tx).to.emit(contract, "Transfer");
      const _fromBalance = await contract.balanceOf(deployer);
      expect(_fromBalance).to.equal(fromBalance - amount);
      const _toBalance = await contract.balanceOf(address1);
      expect(_toBalance).to.equal(toBalance + amount);
    });

    it("insufficient sender balance", async () => {
      const amount = 10;
      const fromBalance = await contract.balanceOf(deployer);
      const toBalance = await contract.balanceOf(address1);
      try {
        const tx = await contract.connect(signer1).transfer(address1, amount);
      } catch (e) {}
      const _fromBalance = await contract.balanceOf(deployer);
      expect(_fromBalance).to.equal(fromBalance);
      const _toBalance = await contract.balanceOf(address1);
      expect(_toBalance).to.equal(toBalance);
    });
  });

  describe("approve", () => {
    it("sufficient sender balance", async () => {
      const amount = 10;
      const allowance = await contract.allowance(deployer, address1);
      const tx = await contract.approve(address1, amount);
      expect(tx).to.emit(contract, "Approve");
      const _allowance = await contract.allowance(deployer, address1);
      expect(_allowance).to.equal(allowance + amount);
    });

    it("insufficient sender balance", async () => {
      const amount = 10;
      const allowance = await contract.allowance(address1, deployer);
      try {
        const tx = await contract.connect(signer1).approve(deployer, amount);
      } catch (e) {}
      const _allowance = await contract.allowance(address1, deployer);
      expect(_allowance).to.equal(allowance);
    });
  });

  describe("transferFrom", () => {
    beforeEach(async () => {
      const allowanceAmount = 1000;
      const tx = await contract.approve(address1, allowanceAmount);
    });
    it("sufficient allowance and balance", async () => {
      const amount = 10;
      const fromBalance = await contract.balanceOf(deployer);
      const allowance = await contract.allowance(deployer, address1);
      const tx = await contract
        .connect(signer1)
        .transferFrom(deployer, address2, amount);
      expect(tx).to.emit(contract, "Transfer");
      const _fromBalance = await contract.balanceOf(deployer);
      expect(_fromBalance).to.equal(fromBalance - amount);
      const _allowance = await contract.allowance(deployer, address1);
      expect(_allowance).to.equal(allowance - amount);
    });

    it("insufficient allowance", async () => {
      const amount = 1001;
      const fromBalance = await contract.balanceOf(deployer);
      const allowance = await contract.allowance(deployer, address1);
      try {
        const tx = await contract
          .connect(signer1)
          .transferFrom(deployer, address2, amount);
      } catch (e) {}
      const _fromBalance = await contract.balanceOf(deployer);
      expect(_fromBalance).to.equal(fromBalance);
      const _allowance = await contract.allowance(deployer, address1);
      expect(_allowance).to.equal(allowance);
    });

    it("insufficient balance", async () => {
      await contract.transfer(address2, 100);
      const amount = 1001;
      const fromBalance = await contract.balanceOf(deployer);
      const allowance = await contract.allowance(deployer, address1);
      try {
        const tx = await contract
          .connect(signer1)
          .transferFrom(deployer, address2, amount);
      } catch (e) {}
      const _fromBalance = await contract.balanceOf(deployer);
      expect(_fromBalance).to.equal(fromBalance);
      const _allowance = await contract.allowance(deployer, address1);
      expect(_allowance).to.equal(allowance);
    });
  });
});
