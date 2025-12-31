require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// --- 1. SETUP UPLOADS FOLDER ---
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// --- 2. PERSISTENCE FILE ---
const DATA_FILE = path.join(__dirname, "reports.json");

// Load reports from file
let reportsDatabase = [];
if (fs.existsSync(DATA_FILE)) {
  const rawData = fs.readFileSync(DATA_FILE);
  try {
    reportsDatabase = JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to parse reports.json, starting fresh");
    reportsDatabase = [];
  }
}

// Save reports to file
const saveReports = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(reportsDatabase, null, 2));
};

// --- 3. MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads")); // Public access to files

// --- 4. MULTER CONFIG ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// --- 5. ROUTES ---

// POST: Save Report
app.post("/api/report", upload.any(), (req, res) => {
  try {
    const { title, description } = req.body;

    let evidencePaths = [];
    if (req.files && req.files.length > 0) {
      evidencePaths = req.files.map((file) => file.filename);
    }

    const newId = Math.floor(Math.random() * 1000000).toString();

    const newReport = {
      id: newId,
      title,
      description,
      dept: "Vigilance Department",
      evidence: evidencePaths,
      status: "Pending",
      adminNote: "Waiting for admin review.",
      createdAt: new Date().toISOString(),
    };

    reportsDatabase.push(newReport);
    saveReports();

    console.log(`New report saved: ${newId} | Dept: Vigilance Department`);
    res.json({ success: true, reportId: newId, department: "Vigilance Department" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: Fetch all reports
app.get("/api/reports", (req, res) => {
  res.json(reportsDatabase);
});

// POST: Update Status (AdminDashboard)
app.post("/api/update-status", (req, res) => {
  const { reportId, status, note } = req.body;
  const report = reportsDatabase.find((r) => r.id === reportId);
  if (report) {
    report.status = status;
    report.adminNote = note;
    saveReports();
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "Report not found" });
  }
});

// GET: Check Status
app.get("/api/status/:id", (req, res) => {
  const report = reportsDatabase.find((r) => r.id === req.params.id);
  if (report) {
    res.json({
      found: true,
      status: report.status,
      dept: report.dept,
      note: report.adminNote,
    });
  } else {
    res.json({ found: false });
  }
});

// --- 6. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
