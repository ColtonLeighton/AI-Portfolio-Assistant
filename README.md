# AI-Portfolio-Assistant

AI-powered assistant for portfolio analysis, market insights, and emerging risk monitoring.

## Purpose
Web app built to use live financial and news APIs, keyword search, vector-based semantic search, hybrid retrieval, and RAG-based answer generation to turn real-time data into portfolio insights, risk analysis, and market intelligence.

## Project Context
This is a personal project built independently to explore how modern AI systems—particularly hybrid search and RAG pipelines—can be applied to financial analysis, risk assessment, and market insight generation.

---

## Overview
AIPortfolioAssistant helps users:
- Analyze portfolios and evaluate company holdings.
- Explore market and company news intelligently.
- View an interactive dashboard showing portfolio risk, sector exposure, and emerging market trends.

---

## Features / Demonstrated AI Searches

### Portfolio Breakdown / Risk Assessment
- Users upload or input portfolio data (CSV or chat).
- **Search:** Structured retrieval + Hybrid search (keyword + semantic)
- **Goal:** Evaluate holdings and assign risk scores.

### Financial Advice Chatbot
- Ask questions about investing or finance.
- **Search:** Hybrid search + RAG (retrieval-augmented generation)
- **Goal:** Provide context-aware, AI-assisted answers.

### Market / Company News Explorer
- Explore news by company, ticker, or topic.
- **Search:** Keyword + Semantic (vector) search
- **Goal:** Retrieve relevant news articles quickly.

### Emerging Risk Monitor
- Dashboard that highlights rising risks in portfolios or sectors.
- **Search:** Structured data + Hybrid search + RAG summarization
- **Goal:** Identify early warning signals for investors.

---

## AI Stack (Planned)
- LLM: Llama 3 (via Ollama)
- RAG Framework: LlamaIndex
- Search: Hybrid (keyword + vector)
- Embeddings: Local embedding models

---

## Tech Stack (Planned)
- **Frontend:** React (Next.js or Vite)
- **Backend:** Python (FastAPI)
- **Vector Database:** Pinecone or Chroma
- **Database:** PostgreSQL
- **Data Processing:** Pandas / NumPy

---

## Data Sources (Planned)
- Financial data: yfinance, Alpha Vantage, Polygon.io
- News data: NewsAPI, Finnhub

(See `docs/DATA_SOURCES.md` for details)

---

## Architecture & AI Pipeline
- See `docs/ARCHITECTURE.md` for system design
- See `docs/AI_PIPELINE.md` for retrieval + RAG pipeline

---

## Status
This project is currently in active development.  
Core features and AI pipeline are being built incrementally.

---

## Setup
TBD
