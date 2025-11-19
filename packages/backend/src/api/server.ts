// backend/src/api/server.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

const envPath = path.resolve(__dirname, "../../../../.env");
dotenv.config({ path: envPath });

// ES
import { fetchAllEmails, getEmailById } from "../elasticsearch/esClient";

// Gmail OAuth
import gmailAuthRouter from "../gmail/gmailAuthRouter";

// AI Reply
import { suggestReply } from "../vector/ragService";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/health", (_req, res) => res.send({ status: "ok" }));

// Gmail OAuth routes
app.use("/gmail", gmailAuthRouter);

/* ---------------------------------------------------------
 * TEMP SYNC ROUTE (run once to fill ES)
 * --------------------------------------------------------- */
import { fetchInboxEmails } from "../gmail/gmailClient";

app.get("/sync", async (_req, res) => {
  const emails = await fetchInboxEmails();
  return res.json({ synced: emails.length });
});

/* ---------------------------------------------------------
 * Emails from Elasticsearch
 * --------------------------------------------------------- */
app.get("/emails", async (_req, res) => {
  try {
    const emails = await fetchAllEmails();
    res.json(emails);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------------------------------------
 * Single email
 * --------------------------------------------------------- */
app.get("/emails/:id", async (req, res) => {
  try {
    const email = await getEmailById(req.params.id);
    res.json(email);
  } catch (err) {
    res.status(404).json({ error: "Email not found" });
  }
});

/* ---------------------------------------------------------
 * Suggest Reply
 * --------------------------------------------------------- */
app.post("/suggest-reply/:id", async (req, res) => {
  try {
    const email = await getEmailById(req.params.id);
    const body = email?.body || "";

    const reply = await suggestReply(body);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
