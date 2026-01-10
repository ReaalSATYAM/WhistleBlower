const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const application = express();

// Establish uploads directory
const uploadsFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
}

// Define storage for reports
const REPORTS_STORAGE = path.join(__dirname, "reports.json");

// Initialize reports storage
let storedReports = [];
if (fs.existsSync(REPORTS_STORAGE)) {
  const fileContent = fs.readFileSync(REPORTS_STORAGE);
  try {
    storedReports = JSON.parse(fileContent);
  } catch (parseError) {
    console.error("Error parsing reports.json, initializing empty storage");
    storedReports = [];
  }
}

// Function to persist reports
const persistReports = () => {
  fs.writeFileSync(REPORTS_STORAGE, JSON.stringify(storedReports, null, 2));
};

// Configure middleware
application.use(cors());
application.use(express.json({ limit: "50mb" }));
application.use(express.urlencoded({ limit: "50mb", extended: true }));
application.use("/uploads", express.static("uploads"));

// Configure file upload
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});
const fileUpload = multer({ storage: fileStorage });

// Define API endpoints

// Endpoint to submit a new report
application.post("/api/report", fileUpload.any(), (request, response) => {
  try {
    const { title, description } = request.body;

    let attachedFiles = [];
    if (request.files && request.files.length > 0) {
      attachedFiles = request.files.map((file) => file.filename);
    }

    const uniqueId = Math.floor(Math.random() * 1000000).toString();

    const reportEntry = {
      id: uniqueId,
      title,
      description,
      dept: "Vigilance Department",
      evidence: attachedFiles,
      status: "Pending",
      adminNote: "Awaiting review by administrator.",
      createdAt: new Date().toISOString(),
    };

    storedReports.push(reportEntry);
    persistReports();

    console.log(`Report submitted: ${uniqueId} | Department: Vigilance Department`);
    response.json({ success: true, reportId: uniqueId, department: "Vigilance Department" });
  } catch (submissionError) {
    console.error("Submission error:", submissionError);
    response.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Endpoint to retrieve all reports
application.get("/api/reports", (request, response) => {
  response.json(storedReports);
});

// Endpoint to modify report status
application.post("/api/update-status", (request, response) => {
  const { reportId, status, note } = request.body;
  const targetReport = storedReports.find((r) => r.id === reportId);
  if (targetReport) {
    targetReport.status = status;
    targetReport.adminNote = note;
    persistReports();
    response.json({ success: true });
  } else {
    response.status(404).json({ success: false, message: "Report not located" });
  }
});

// Endpoint to check report status
application.get("/api/status/:id", (request, response) => {
  const targetReport = storedReports.find((r) => r.id === request.params.id);
  if (targetReport) {
    response.json({
      found: true,
      status: targetReport.status,
      dept: targetReport.dept,
      note: targetReport.adminNote,
    });
  } else {
    response.json({ found: false });
  }
});

// Launch the server
const SERVER_PORT = process.env.PORT || 5000;
application.listen(SERVER_PORT, () => {
  console.log(`Application running on port ${SERVER_PORT}`);
});
