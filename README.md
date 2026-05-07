# Suthsayer - Demo here: https://islandersfan2025.github.io/SuthsayerRep/

Sonic Testnet Contract Address: 0x59De9918eE0cba2a60368104C289bE9EB8973E34

Suthsayer is a social-native prediction market platform that combines:

* Bluesky / AT Protocol social prediction discovery
* Chainlink CRE automation workflows
* Onchain prediction market settlement
* Coinbase CDP + AgentKit integrations
* Optional x402-powered premium AI market intelligence

The goal of Suthsayer is to transform social predictions into verifiable, decentralized prediction markets with automated settlement and AI-enhanced tooling.

---

# Core Concept

Users post predictions on Bluesky using:

```text
#Suthsayer
```

Example:

```text
Will BTC be above $100k by the end of 2026? #Suthsayer
```

These predictions can then:

* appear in the Suthsayer feed,
* be linked to onchain prediction markets,
* and eventually be resolved automatically through Chainlink CRE workflows.

---

# Architecture Overview

```text
Bluesky / AT Protocol
        ↓
Suthsayer Feed Viewer
        ↓
Frontend Prediction Feed
        ↓
PredictionMarket.sol
        ↓
Chainlink CRE Workflows
        ↓
Automated Settlement + Dispute Resolution
```

---

# Technologies Used

## Chainlink CRE

Chainlink CRE powers:

* market creation workflows,
* market resolution workflows,
* dispute workflows,
* and future AI verification pipelines.

CRE acts as the trusted automation and settlement layer for Suthsayer prediction markets.

---

## Bluesky / AT Protocol

Bluesky integration is used as the:

* social discovery layer,
* prediction feed source,
* and future social identity layer.

The current MVP watches for posts containing:

```text
#Suthsayer
```

---

## Coinbase Developer Platform (CDP)

Coinbase CDP powers:

* fiat onramp/offramp flows,
* wallet onboarding,
* AI-agent integrations,
* and future autonomous market tooling.

---

## Coinbase AgentKit

The Suthsayer AI agent uses AgentKit-style architecture to:

* read prediction market state,
* verify prediction posts,
* summarize active markets,
* prepare disputes,
* assist with market resolution workflows,
* and eventually support autonomous user interactions.

---

## AWS + x402

A lightweight x402 integration is included for hackathon/demo purposes.

This allows Suthsayer to expose:

* premium AI-generated market intelligence,
* monetized market reports,
* and future agent-to-agent commerce APIs.

The x402 integration is intentionally minimal for the MVP.

---

# Smart Contracts

Main contract:

```text
src/PredictionMarket.sol
```

This contract:

* stores prediction markets,
* accepts CRE workflow reports,
* manages market status,
* handles disputes,
* and emits settlement events.

The contract is intentionally simple for the MVP/hackathon demo.

---

# CRE Workflows

The project uses multiple Chainlink CRE workflows:

## Market Creation Workflow

Creates new markets.

## Market Resolution Workflow

Reads market state and resolves expired markets.

## Market Dispute Workflow

Re-checks disputed markets during the dispute window.

---

# Source Folder Overview

All core application logic exists in the `src/` directory.

---

# `src/agent/`

Contains the Suthsayer AI agent layer.

## `suthsayerAgent.ts`

Main AI-agent routing logic.

Handles:

* market summaries,
* feed queries,
* prediction verification,
* settlement/dispute preparation.

## `suthsayerTools.ts`

Core market utilities and contract interaction helpers.

Reads:

* Bluesky feed data,
* prediction market state,
* and CRE-compatible market information.

---

# `src/coinbase/`

Contains Coinbase CDP integrations.

## `onramp.ts`

Generates Coinbase Onramp session URLs.

Used for:

* fiat → crypto onboarding,
* wallet funding,
* future frontend wallet integrations.

---

# `src/x402/`

Contains the AWS/Coinbase x402 payment integration.

## `payment.ts`

Protects premium API routes using x402 payment middleware.

Used for:

* premium AI market reports,
* monetized APIs,
* and future agent commerce.

---

# `src/routes/`

Contains Express API routes.

## `premium.ts`

Provides:

* premium market reports,
* Bluesky feed summaries,
* and CRE market intelligence.

Protected via x402 middleware.

---

# `src/config/`

Contains contract and network configuration.

## `contracts.ts`

Defines:

* contract addresses,
* ABIs,
* RPC endpoints,
* and Bluesky feed API configuration.

---

# `src/server.ts`

Main backend server entrypoint.

Initializes:

* AgentKit integrations,
* Coinbase CDP routes,
* x402 middleware,
* and Suthsayer APIs.

---

# `src/local.ts`

Local development runner.

Used for:

* local testing,
* hackathon demos,
* and development environments.

---

# `src/lambda.ts`

AWS Lambda-compatible entrypoint.

Used for:

* serverless deployment,
* AWS integration,
* and future cloud scaling.

---

# Running the Project

Install dependencies:

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Run locally:

```bash
npm run dev
```

---

# Example Endpoints

## Health Check

```text
GET /health
```

## Agent Query

```text
POST /api/agent/query
```

Example body:

```json
{
  "input": "summarize markets"
}
```

## Coinbase Onramp

```text
POST /api/onramp-url
```

## Premium x402 Report

```text
GET /api/premium/market-report
```

---

# MVP Scope

The current hackathon MVP focuses on:

* social prediction discovery,
* CRE-based market automation,
* AI-assisted tooling,
* and modular integrations.

Some integrations are intentionally lightweight for demo purposes and designed to expand after the hackathon.

---

# Future Roadmap

Potential future upgrades include:

* autonomous AI market creation,
* real Bluesky identity linking,
* full frontend trading,
* crosschain deployment,
* x402 agent commerce,
* and advanced CRE AI workflows.

---

# Suthsayer Vision

Suthsayer aims to become a decentralized social prediction network where:

* social consensus,
* AI tooling,
* and decentralized automation

combine to create transparent and trust-minimized forecasting markets.

