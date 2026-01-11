import axios from "axios";

const apiClient = axios.create({
  // server endpoint
  baseURL: "http://localhost:5000/api",
});

export const sendSubmission = (dataPackage) =>
  apiClient.post("/report", dataPackage);

export const checkSubmission = (identifier) =>
  apiClient.get(`/status/${identifier}`);

export const loginAdmin = (password) =>
  apiClient.post("/login", { password });

export const fetchReports = () =>
  apiClient.get("/reports");

export const updateReportStatus = (reportId, status, note) =>
  apiClient.post("/update-status", { reportId, status, note });

