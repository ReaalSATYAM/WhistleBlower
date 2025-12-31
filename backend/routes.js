const express = require("express");
const multer = require("multer");

const { uploadToIPFS } = require("./ipfs");
const { storeHash } = require("./blockchain");

const routeHandler = express.Router();
const fileHandler = multer();

// Route for anonymous report submission
routeHandler.post("/report", fileHandler.single("evidence"), async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({ error: "Evidence file is required" });
    }

    // Step 1: Transfer file to IPFS
    const ipfsIdentifier = await uploadToIPFS(
      request.file.buffer,
      request.file.originalname
    );

    // Step 2: Record identifier on blockchain
    const transactionIdentifier = await storeHash(ipfsIdentifier);

    response.json({
      success: true,
      ipfsHash: ipfsIdentifier,
      blockchainTx: transactionIdentifier,
    });
  } catch (processingError) {
    response.status(500).json({ error: processingError.message });
  }
});

// Route for report verification
routeHandler.get("/verify/:id", async (request, response) => {
  try {
    const { ethers } = require("ethers");

    const networkProvider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const contractInterface = [
      "function reports(uint256) view returns (string ipfsHash, uint256 timestamp)"
    ];

    const smartContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractInterface,
      networkProvider
    );

    const retrievedReport = await smartContract.reports(request.params.id);

    response.json({
      ipfsHash: retrievedReport.ipfsHash,
      timestamp: retrievedReport.timestamp.toString(),
    });
  } catch {
    response.status(400).json({ error: "Report identifier is invalid" });
  }
});

// Route for admin report count
routeHandler.get("/admin/count", async (request, response) => {
  try {
    const { ethers } = require("ethers");

    const networkProvider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const contractInterface = [
      "function getReportsCount() view returns (uint256)"
    ];

    const smartContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractInterface,
      networkProvider
    );

    const totalCount = await smartContract.getReportsCount();

    response.json({ totalReports: totalCount.toString() });
  } catch (countError) {
    response.status(500).json({ error: countError.message });
  }
});

module.exports = routeHandler;
