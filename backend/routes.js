const express = require("express");
const multer = require("multer");

const { uploadToIPFS } = require("./ipfs");
const { storeHash } = require("./blockchain");

const router = express.Router();
const upload = multer(); 

/* ============================
   SUBMIT REPORT (ANONYMOUS)
============================ */
router.post("/report", upload.single("evidence"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No evidence file uploaded" });
    }

    // 1️⃣ Upload to IPFS
    const ipfsHash = await uploadToIPFS(
      req.file.buffer,
      req.file.originalname
    );

    // 2️⃣ Store hash on blockchain
    const txHash = await storeHash(ipfsHash);

    res.json({
      success: true,
      ipfsHash,
      blockchainTx: txHash,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   VERIFY REPORT (READ-ONLY)
============================ */
router.get("/verify/:id", async (req, res) => {
  try {
    const { ethers } = require("ethers");

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const abi = [
      "function reports(uint256) view returns (string ipfsHash, uint256 timestamp)"
    ];

    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abi,
      provider
    );

    const report = await contract.reports(req.params.id);

    res.json({
      ipfsHash: report.ipfsHash,
      timestamp: report.timestamp.toString(),
    });
  } catch {
    res.status(400).json({ error: "Invalid report ID" });
  }
});

/* ============================
   ADMIN: TOTAL REPORT COUNT
============================ */
router.get("/admin/count", async (req, res) => {
  try {
    const { ethers } = require("ethers");

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const abi = [
      "function getReportsCount() view returns (uint256)"
    ];

    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abi,
      provider
    );

    const count = await contract.getReportsCount();

    res.json({ totalReports: count.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
