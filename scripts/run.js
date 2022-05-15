const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const counterContractFactory = await hre.ethers.getContractFactory("CallCounter");
  const counterContract = await counterContractFactory.deploy({
    value: hre.ethers.utils.parseEther("10"),
  });
  await counterContract.deployed()


  console.log(`Contract: ${counterContract.address}`)
  console.log(`Owner: ${owner.address}`)
  console.log(`Contract Balance: ${hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(counterContract.address))} ethers`)
  console.log(`Deploy ✅`)

  // get a total of `calls`
  await counterContract.getCalls();

  // owner call's the counter
  const call = await counterContract.call()
  await call.wait();

  // random person call's the couter
  const personCall = await counterContract.connect(randomPerson).call()
  await personCall.wait();

  // get a total of `calls`
  await counterContract.getCalls();
}


const start = async () => {
  try {
    await main()
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()