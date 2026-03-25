# Project Timeline

High-level roadmap for building the AI Portfolio Assistant.

---

## Phase 1 — Local AI Setup
- Installed Ollama + LlamaIndex
- Set up local LLM (`dolphin-phi`)
- Configured embedding model (`mxbai-embed-large`)
- Built initial document pipeline (`/data`)

---

## Phase 2 — RAG Chatbot (Minimum Viable Product)
- Implemented Financial Advice Chatbot
- Built vector index over local documents
- Connected retrieval → LLM (RAG pipeline)

Result:
- Working, fully local AI chatbot

---

## Phase 3 — Hybrid Search (CURRENT)
Goal:
Improve retrieval quality across the system

Remaining work:
- Add keyword search (BM25 or simple matching)
- Combine keyword + semantic results
- Tune ranking of retrieved documents

This will be reused across:
- chatbot
- portfolio analysis
- news search

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
  - insights

---

### 2. Market / Company News Explorer
- Integrate external APIs (NewsAPI, Finnhub)
- Implement:
  - keyword + semantic search
- Goal:
  - fast, relevant news retrieval

---

### 3. Emerging Risk Monitor
- Combine:
  - financial data
  - news signals
  - RAG summarization
- Goal:
  - highlight potential risks early

---

## Phase 5 — Backend Development
- Build API (FastAPI)
- Connect AI pipeline to endpoints
- Handle:
  - user queries
  - portfolio inputs
  - data fetching

---

## Phase 6 — Vector Database Upgrade
- Replace in-memory store with **Pinecone**

Why:
- persistence
- scalability
- faster retrieval

---

## Phase 7 — Frontend UI
- Build interface (React)
- Features:
  - chatbot UI
  - portfolio dashboard
  - news explorer

---

## Phase 8 — Deployment (Future)
- Deploy backend + frontend
- Connect to cloud services
- Optimize performance

---

## Summary

- RAG chatbot: complete  
- Hybrid search: in progress  
- Core platform features: upcoming  
- Production system: planned  