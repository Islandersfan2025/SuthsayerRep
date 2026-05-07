export const CONTRACTS = {
  rpcUrl: process.env.RPC_URL || "https://rpc.blaze.soniclabs.com",
  simpleMarket: process.env.SIMPLE_MARKET_ADDRESS || "",
  blueskyFeedApi:
    process.env.BLUESKY_FEED_API || "http://localhost:8787/api/suthsayer-feed",
};

export const SIMPLE_MARKET_ABI = [
  "function getNextMarketId() view returns (uint256)",
  "function getMarket(uint256 marketId) view returns (tuple(uint256 marketId,string question,uint256 strikePrice,uint256 expirationTime,uint256 disputeDeadline,uint8 status,uint8 outcome,int256 resolutionPrice,uint256 resolvedAt))",
  "function getMarketStatus(uint256 marketId) view returns (uint8)",
  "function isExpired(uint256 marketId) view returns (bool)",
  "function isResolvable(uint256 marketId) view returns (bool)",
  "function raiseDispute(uint256 marketId,string reason) external"
];