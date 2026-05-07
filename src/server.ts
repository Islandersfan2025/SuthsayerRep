import "dotenv/config";
import express from "express";
import cors from "cors";

import { createOnrampUrl } from "./coinbase/onramp";
import { handleAgentQuery } from "./agent/suthsayerAgent";
import { suthsayerX402Middleware } from "./x402/payment";
import { premiumRouter } from "./routes/premium";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "suthsayer-cdp-agent-x402",
  });
});

app.post("/api/agent/query", async (req, res) => {
  try {
    const input = String(req.body?.input || "");
    const result = await handleAgentQuery(input);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      error: err?.message || "Agent query failed",
    });
  }
});

app.post("/api/onramp-url", async (req, res) => {
  try {
    const walletAddress = String(req.body?.walletAddress || "");

    if (!walletAddress.startsWith("0x")) {
      return res.status(400).json({
        error: "Invalid walletAddress",
      });
    }

    const url = await createOnrampUrl(walletAddress);
    res.json({ url });
  } catch (err: any) {
    res.status(500).json({
      error: err?.message || "Failed to create onramp URL",
    });
  }
});

// Free routes stay above this line.
// x402 protects routes registered below this middleware.
app.use(suthsayerX402Middleware);

app.use("/api/premium", premiumRouter);

export default app;