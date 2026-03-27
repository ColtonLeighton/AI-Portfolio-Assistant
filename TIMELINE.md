# Project Timeline

High-level roadmap for building the AI Portfolio Assistant.

![Project Timeline](timeline.png)

---

## Phase 1 — Local AI Setup
- Installed Ollama + LlamaIndex
- Set up local LLM (`dolphin-phi`)
- Configured embedding model (`mxbai-embed-large`)
- Built initial document pipeline (`/data`)
- Verified embeddings could be generated and searched locally

---

## Phase 2 — RAG Chatbot (Minimum Viable Product)
- Implemented Financial Advice Chatbot
- Built vector index over local documents
- Connected retrieval → LLM (RAG pipeline)
- Tested responses with local financial documents

Result:
- Working, fully local AI chatbot
- Vector search and RAG pipeline functional

---

## Phase 3 — Hybrid Search (CURRENT)
Goal:
- Improve retrieval quality across the system by combining keyword and semantic search

Remaining work:
- Add keyword search (BM25 or simple matching)
- Combine keyword + semantic results
- Tune ranking of retrieved documents
- Apply hybrid search consistently across all modules:
  - Chatbot
  - Portfolio analysis
  - News search

---

## Phase 4 — Core Feature Expansion

### 1. Portfolio Breakdown / Risk Assessment
- Input: portfolio (CSV or manual)
- Combine:
  - structured data
  - hybrid search
- Output:
  - risk score
  - sector exposure
  - actionable insights
- Goal: allow investors to evaluate holdings intelligently

---

### 2. Market / Company News Explorer
- Integrate external APIs (NewsAPI, Finnhub)
- Implement:
  - keyword + semantic search
  - local storage of news (SQLite prototype)
- Goal:
  - fast, relevant news retrieval
  - support for company/ticker-specific exploration

---

### 3. Emerging Risk Monitor
- Combine:
  - financial data
  - news signals
  - RAG summarization
- Goal:
  - highlight potential risks early
  - enable proactive risk assessment in portfolios

---

## Phase 5 — Backend Development
- Build API (FastAPI)
- Connect AI pipeline to endpoints
- Handle:
  - user queries
  - portfolio inputs
  - data fetching
- Include database connections:
  - SQLite for prototyping
  - PostgreSQL planned for production

---

## Phase 6 — Vector Database Upgrade
- Replace in-memory store with **Pinecone**
- Why:
  - persistence
  - scalability
  - faster retrieval
- Enable:
  - larger datasets
  - cloud-hosted hybrid search
  - production-ready AI pipelines

---

## Phase 7 — Frontend UI
- Build interface (React)
- Features:
  - Chatbot UI
  - Portfolio dashboard
  - News explorer
  - Risk monitoring visualizations
- Goal:
  - integrate backend AI services
  - provide real-time interactive interface

---

## Phase 8 — Deployment (Future)
- Deploy backend + frontend
- Connect to cloud services
- Optimize performance
- Prepare for user access and scalability

---

## Summary
- RAG chatbot: complete  
- Hybrid search: in progress  
- Core platform features: upcoming  
- Production system: planned  