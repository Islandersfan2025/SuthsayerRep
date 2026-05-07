import axios from "axios";
import { ethers } from "ethers";
import { CONTRACTS, SIMPLE_MARKET_ABI } from "../config/contracts";

function getMarketContract() {
  if (!CONTRACTS.simpleMarket) {
    throw new Error("Missing SIMPLE_MARKET_ADDRESS");
  }

  const provider = new ethers.JsonRpcProvider(CONTRACTS.rpcUrl);
  return new ethers.Contract(CONTRACTS.simpleMarket, SIMPLE_MARKET_ABI, provider);
}

export async function getBlueskySuthsayerFeed() {
  const res = await axios.get(CONTRACTS.blueskyFeedApi, { timeout: 5000 });

  return {
    reply: "Fetched recent #Suthsayer Bluesky prediction posts.",
    feed: res.data,
  };
}

export async function verifyPredictionPost(text: string) {
  const normalized = String(text || "").toLowerCase();
  const valid = normalized.includes("#suthsayer");

  return {
    valid,
    reply: valid
      ? "This post contains #Suthsayer and can be displayed in the prediction feed."
      : "This post does not contain #Suthsayer.",
  };
}

export async function getMarketSummary() {
  const market = getMarketContract();

  let count: bigint;

  try {
    count = await market.getNextMarketId();
  } catch {
    return {
      reply:
        "Could not read getNextMarketId(). Check SIMPLE_MARKET_ADDRESS and ABI.",
    };
  }

  const markets = [];

  for (let i = 0n; i < count && i < 10n; i++) {
    try {
      const m = await market.getMarket(i);

      markets.push({
        id: m.marketId.toString(),
        question: m.question,
        strikePrice: m.strikePrice.toString(),
        expirationTime: m.expirationTime.toString(),
        disputeDeadline: m.disputeDeadline.toString(),
        status: Number(m.status),
        outcome: Number(m.outcome),
        resolutionPrice: m.resolutionPrice.toString(),
        resolvedAt: m.resolvedAt.toString(),
      });
    } catch {
      markets.push({
        id: i.toString(),
        error: "Could not read market",
      });
    }
  }

  return {
    reply: `Suthsayer sees ${count.toString()} markets.`,
    markets,
  };
}

export async function prepareSettlementRequest(marketId: string) {
  return {
    reply:
      "CRE handles settlement. To trigger settlement, use your CRE workflow or the contract function configured for settlement requests.",
    marketId,
    nextAction: "Run the CRE market-resolution workflow.",
  };
}

export async function prepareDispute(marketId: string, reason: string) {
  return {
    reply:
      "A dispute can be raised onchain, then the CRE dispute workflow can re-check the market.",
    marketId,
    reason,
    nextAction: "call raiseDispute(uint256 marketId,string reason)",
  };
}