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
- **Goal:** Provide context-aware, AI-assisted answers based off provided documents.

### Market / Company News Explorer
- Explore news by company, ticker, or topic.
- **Search:** Keyword + Semantic (vector) search
- **Goal:** Retrieve relevant news articles quickly.

### Emerging Risk Monitor
- Dashboard that highlights rising risks in portfolios or sectors.
- **Search:** Structured data + Hybrid search + RAG summarization
- **Goal:** Identify early warning signals for investors.

---

## AI Stack (Current)
- LLM: Ollama (local models, e.g. dolphin-phi)
- RAG Framework: LlamaIndex
- Search: Currently **vector (semantic) search + RAG**
- Embeddings: Ollama embedding models (local)

---

## Tech Stack (Planned)
- **Frontend:** React (Next.js or Vite)
- **Backend:** Python (FastAPI)
- **Vector Database:** Pinecone (planned)
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

## Concepts

### What is a Vector Database?
A vector database stores embeddings (numerical representations of text) and allows similarity search based on meaning instead of exact keywords.

### What is RAG (Retrieval-Augmented Generation)?
RAG retrieves relevant documents from a dataset and passes them to an LLM to generate more accurate, context-aware responses.

### What data is used for RAG?
Currently:
- Local `/data` text files containing financial information

---

## Status
This project is currently in active development.  
Core features and AI pipeline are being built incrementally.

---

## Setup

### 1. Install dependencies
pip install -r requirements.txt

### 2. Install and run Ollama
Download Ollama: https://ollama.com

Pull required models:
ollama pull dolphin-phi  
ollama pull mxbai-embed-large  

Start Ollama (if not already running):
ollama run dolphin-phi

### 3. Run the chatbot
python chatbot.py

---

## Current Development Status (IMPORTANT)

- Current stage: **Financial Related Chatbot using RAG (local setup)**
- Hybrid search is **NOT fully implemented yet**
  - Missing:
    - keyword search
    - combining keyword + vector results
- Chatbot is fully **usable locally**

Project timeline can be found in:
- TIMELINE.md

 Small development updates are being tracked in:
- PRODUCTION_LOG.md

---

## Future Improvements

### Financial Advice Chatbot (Current Focus)
- Current:
  - RAG pipeline is working locally using Ollama + LlamaIndex
  - Uses vector (semantic) search over `/data` documents
- Missing:
  - True hybrid search
    - keyword-based retrieval
    - combining keyword + vector results
- Next Steps:
  - Implement keyword search layer
  - Merge results with vector search (true hybrid retrieval)
  - Improve prompt structure and response quality

---

### Vector Database Upgrade
- Current:
  - LlamaIndex built-in in-memory vector store (local only)

- Planned:
  - Pinecone (cloud vector database)

- Why Pinecone:
  - scalable for large datasets
  - faster retrieval performance
  - persistent storage (not lost on restart)
  - production-ready infrastructure

---

### Portfolio Analysis Feature
- Build CSV upload + parsing system
- Implement structured data analysis (Pandas)
- Add hybrid search + RAG for:
  - company insights
  - risk scoring
- Output:
  - portfolio breakdown
  - risk metrics

---

### Market / News Explorer
- Integrate APIs (NewsAPI, Finnhub, etc.)
- Implement:
  - keyword search (fast filtering)
  - semantic search (relevance ranking)
- Add RAG summarization for:
  - company news
  - market trends

---

### Emerging Risk Monitor
- Combine:
  - portfolio data
  - news signals
- Use:
  - hybrid search + RAG summarization
- Goal:
  - detect early risk signals
  - surface insights in dashboard

---

### Full Application Build (Backend + Frontend)
- Backend:
  - FastAPI for API endpoints
  - connect RAG + search pipelines
- Frontend:
  - React (dashboard UI)
  - portfolio visualization
  - chatbot interface

---

### Deployment
- Move from local → cloud deployment
- Host backend + frontend
- Connect Pinecone vector DB
- Prepare for real-world usage