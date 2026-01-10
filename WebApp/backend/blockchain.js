require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = [
  "function submitReport(string _ipfsHash)",
  "function getReportsCount() view returns (uint256)"
];

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

async function storeHash(ipfsHash) {
  const tx = await contract.submitReport(ipfsHash);
  await tx.wait();
  return tx.hash;
}

module.exports = { storeHash };
