import axios from "axios";

export async function createOnrampUrl(walletAddress: string): Promise<string> {
  const apiKey = process.env.CDP_API_KEY;

  if (!apiKey) {
    throw new Error("Missing CDP_API_KEY");
  }

  const response = await axios.post(
    "https://api.developer.coinbase.com/onramp/v1/token",
    {
      addresses: [
        {
          address: walletAddress,
          blockchains: ["base"],
        },
      ],
      assets: ["USDC"],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return `https://pay.coinbase.com/buy/select-asset?sessionToken=${response.data.token}`;
}