import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const generateAIResponse = async (prompt, mode) => {
  const { data } = await API.post("/api/ai/generate", { prompt, mode });
  return data;
};

export const getHistoryData = async () => {
  const { data } = await API.get("/api/ai/history");
  return data;
};
