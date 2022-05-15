const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test `call` counter contract", function () {
  it("Should be return 0 for first `call`", async function () {
    const contract = await ethers.getContractFactory("CallCounter");
    const deployedContract = await contract.deploy();
    await deployedContract.deployed();

    expect(await deployedContract.totalCalls()).to.equal(0);

    const callMe = await deployedContract.call();

    // wait until the transaction is mined
    await callMe.wait();
    const callers = await deployedContract.allCallers();
    console.log(callers)
    expect(await deployedContract.totalCalls()).to.equal(1);
  });
});
