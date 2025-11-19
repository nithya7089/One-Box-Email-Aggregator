// backend/src/elasticsearch/esClient.ts
import { Client } from "@elastic/elasticsearch";
import { ELASTICSEARCH } from "../config";

export const client = new Client({
  node: ELASTICSEARCH.host,
  auth: {
    username: process.env.ES_USERNAME || "elastic",
    password: process.env.ES_PASSWORD || "",
  },
  tls: { rejectUnauthorized: false },
});

/* ---------------------------------------------------------
 * Ensure index exists
 * --------------------------------------------------------- */
export async function ensureIndex() {
  const exists = await client.indices.exists({ index: ELASTICSEARCH.index });

  if (!exists) {
    await client.indices.create({
      index: ELASTICSEARCH.index,
      body: {
        mappings: {
          properties: {
            id: { type: "keyword" },
            gmailId: { type: "keyword" },
            subject: { type: "text" },
            from: { type: "text" },
            to: { type: "text" },
            body: { type: "text" },
            date: { type: "date" },
            snippet: { type: "text" }
          }
        }
      }
    });

    console.log(`✔ Created index: ${ELASTICSEARCH.index}`);
  }
}

/* ---------------------------------------------------------
 * Index Email
 * --------------------------------------------------------- */
export async function indexEmail(doc: any) {
  await client.index({
    index: ELASTICSEARCH.index,
    id: doc.gmailId,
    document: doc,
    refresh: true
  });

  return doc.gmailId;
}

/* ---------------------------------------------------------
 * Fetch all emails
 * --------------------------------------------------------- */
export async function fetchAllEmails() {
  console.log("🔍 ES → Fetching all emails...");

  const result = await client.search({
    index: ELASTICSEARCH.index,
    size: 200,
    query: { match_all: {} }
  });

  const emails = result.hits.hits.map((h) => h._source);

  console.log(`🔍 ES → Found ${emails.length} emails`);
  return emails;
}

/* ---------------------------------------------------------
 * Fetch Single
 * --------------------------------------------------------- */
export async function getEmailById(id: string) {
  const resp = await client.get({ index: ELASTICSEARCH.index, id });
  return resp._source;
}

ensureIndex().catch(console.error);
