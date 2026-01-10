import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // server endpoint
});

export const sendSubmission = (dataPackage) =>
  apiClient.post("/report", dataPackage);

export const checkSubmission = (identifier) =>
  apiClient.get(`/verify/${identifier}`);

/*
Future AI endpoints:
export const analyzeSubmission = (inputData) => apiClient.post("/ml/analyze", inputData);
*/
