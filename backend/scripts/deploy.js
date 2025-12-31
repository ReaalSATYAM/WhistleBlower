const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Whistleblower");

  await contract.waitForDeployment();

  console.log("Whistleblower deployed to:");
  console.log(await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
