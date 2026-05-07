import { Router } from "express";
import axios from "axios";
import { getMarketSummary } from "../agent/suthsayerTools";

export const premiumRouter = Router();

premiumRouter.get("/market-report", async (_req, res) => {
  const feedApi =
    process.env.BLUESKY_FEED_API || "http://localhost:8787/api/suthsayer-feed";

  let feed: any = null;
  let marketSummary: any = null;

  try {
    const response = await axios.get(feedApi, { timeout: 5000 });
    feed = response.data;
  } catch {
    feed = {
      posts: [],
      warning: "Could not reach Bluesky feed API",
    };
  }

  try {
    marketSummary = await getMarketSummary();
  } catch {
    marketSummary = {
      reply: "Could not read market summary.",
      markets: [],
    };
  }

  const posts = Array.isArray(feed?.posts) ? feed.posts : [];

  const report = {
    product: "Suthsayer Premium Market Report",
    generatedAt: new Date().toISOString(),
    summary: {
      suthsayerTaggedPosts: posts.length,
      creStatus:
        "Chainlink CRE market-resolution workflow remains the source of truth for settlement.",
      recommendation:
        posts.length > 0
          ? "Review recent #Suthsayer predictions and link strong candidates to onchain markets."
          : "No recent #Suthsayer posts detected. Seed demo posts from Bluesky.",
    },
    recentPredictions: posts.slice(0, 10).map((post: any) => ({
      uri: post.uri,
      authorDid: post.authorDid,
      text: post.text,
      createdAt: post.createdAt,
    })),
    markets: marketSummary,
  };

  res.json(report);
});