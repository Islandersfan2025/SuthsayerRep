import app from "./server";

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Suthsayer CDP/x402 service running on http://localhost:${port}`);
});