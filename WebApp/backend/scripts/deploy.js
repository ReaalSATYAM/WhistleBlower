const hre = require("hardhat");

async function deploy() {
  const deployedContract = await hre.ethers.deployContract("Whistleblower");

  await deployedContract.waitForDeployment();

  console.log("Whistleblower contract deployed at:");
  console.log(await deployedContract.getAddress());
}

deploy().catch((deploymentError) => {
  console.error(deploymentError);
  process.exitCode = 1;
});
