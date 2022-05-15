const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const contractFactory = await hre.ethers.getContractFactory("CallCounter");
  const deployedContract = await contractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.09"),
  });
  await deployedContract.deployed();


  console.log(`Contract Address: ${deployedContract.address}`)
  console.log(`Contract Owner: ${deployer.address}`)
  console.log(`Contract Balance: ${hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(deployedContract.address))} ethers`)
  console.log(`Deploy ✅`)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();