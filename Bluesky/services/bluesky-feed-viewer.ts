import "dotenv/config";
import express from "express";
import cors from "cors";
import WebSocket from "ws";

type SuthsayerPost = {
  id: string;
  uri: string;
  cid?: string;
  authorDid: string;
  text: string;
  createdAt?: string;
  indexedAt: number;
};

const PORT = Number(process.env.PORT || 8787);
const HASHTAG = (process.env.SUTHSAYER_HASHTAG || "#Suthsayer").toLowerCase();

const JETSTREAM_URL =
  process.env.JETSTREAM_URL ||
  "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post";

const MAX_POSTS = Number(process.env.MAX_POSTS || 100);

const posts: SuthsayerPost[] = [];
const seen = new Set<string>();

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function isSuthsayerPrediction(text: string): boolean {
  const lower = text.toLowerCase();
  return lower.includes(HASHTAG.toLowerCase());
}

function toAtUri(event: any): string | null {
  const did = event?.did;
  const rkey = event?.commit?.rkey;

  if (!did || !rkey) return null;

  return `at://${did}/app.bsky.feed.post/${rkey}`;
}

function addPost(event: any) {
  const record = event?.commit?.record;
  if (!record || typeof record.text !== "string") return;

  const text = normalize(record.text);
  if (!isSuthsayerPrediction(text)) return;

  const uri = toAtUri(event);
  if (!uri) return;

  if (seen.has(uri)) return;
  seen.add(uri);

  const post: SuthsayerPost = {
    id: uri,
    uri,
    cid: event?.commit?.cid,
    authorDid: String(event?.did || ""),
    text,
    createdAt: record.createdAt,
    indexedAt: Math.floor(Date.now() / 1000),
  };

  posts.unshift(post);

  if (posts.length > MAX_POSTS) {
    const removed = posts.pop();
    if (removed) seen.delete(removed.uri);
  }

  console.log("Suthsayer feed post detected:", {
    uri: post.uri,
    text: post.text,
  });
}

function startJetstream() {
  console.log("Connecting to Bluesky Jetstream:", JETSTREAM_URL);

  const ws = new WebSocket(JETSTREAM_URL);

  ws.on("open", () => {
    console.log("Connected to Jetstream");
  });

  ws.on("message", (raw) => {
    try {
      const event = JSON.parse(raw.toString());

      if (event?.kind && event.kind !== "commit") return;
      if (event?.commit?.collection !== "app.bsky.feed.post") return;
      if (event?.commit?.operation && event.commit.operation !== "create") return;

      addPost(event);
    } catch (err) {
      console.error("Jetstream parse error:", err);
    }
  });

  ws.on("close", () => {
    console.warn("Jetstream closed. Reconnecting in 3 seconds...");
    setTimeout(startJetstream, 3000);
  });

  ws.on("error", (err) => {
    console.error("Jetstream error:", err);
    ws.close();
  });
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "suthsayer-bluesky-feed-viewer",
    hashtag: HASHTAG,
    posts: posts.length,
  });
});

app.get("/api/suthsayer-feed", (_req, res) => {
  res.json({
    hashtag: HASHTAG,
    count: posts.length,
    posts,
  });
});

app.listen(PORT, () => {
  console.log(`Suthsayer feed viewer running on http://localhost:${PORT}`);
  startJetstream();
});