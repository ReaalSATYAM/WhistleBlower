import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base
});

export const submitReport = (formData) =>
  API.post("/report", formData);

export const verifyReport = (id) =>
  API.get(`/verify/${id}`);

/*
Later ML endpoints:
export const classifyReport = (data) => API.post("/ml/classify", data);
*/
