// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  timeout: 8000,
});

console.log("🌐 API baseURL =", API.defaults.baseURL);

/* -------------------- Fetch ALL emails -------------------- */
export async function fetchGmailMessages() {
  console.log("🔥 API → GET /emails");

  try {
    const res = await API.get("/emails");
    console.log("📩 API → /emails response:", res.data);
    return res.data; // should be the array you pasted
  } catch (err) {
    console.error("❌ API ERROR → /emails:", err);
    return [];
  }
}

/* -------------------- Fetch single email -------------------- */
export async function fetchGmailMessageById(id: string) {
  console.log(`🔥 API → GET /emails/${id}`);

  try {
    const res = await API.get(`/emails/${id}`);
    console.log("📧 API → /emails/:id response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ API ERROR → /emails/:id:", err);
    return null;
  }
}

/* -------------------- AI Suggest Reply -------------------- */
export async function suggestEmailReply(id: string) {
  console.log(`🤖 API → POST /suggest-reply/${id}`);

  try {
    const res = await API.post(`/suggest-reply/${id}`);
    console.log("🤖 API → AI reply response:", res.data);
    return res.data.reply;
  } catch (err) {
    console.error("❌ API ERROR → AI reply:", err);
    return "AI failed.";
  }
}
