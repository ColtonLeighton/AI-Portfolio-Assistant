# Production Log

A running log of key decisions, issues, and progress while building the AI Portfolio Assistant.

---

## March 22–23, 2026 — Initial RAG Chatbot (Local MVP)

Started building the **Financial Advice Chatbot** as the first working piece of the overall system.

### LLM Setup
Initially attempted:
- Llama 3.1 (8B) via Ollama

Issue:
- Required more RAM (~20GB+) than my system could handle

Decision:
- Switched to `dolphin-phi`

Reason:
- Runs reliably on 16GB RAM
- Fast and lightweight for local development
- Good enough for an MVP

Note:
- This is temporary — plan is to use a stronger hosted model later ( OpenAI API)

---

### Embeddings

Initial approach:
- HuggingFace embeddings

Issue:
- Constant warnings about authentication / usage limits
- Slowed down development flow

Decision:
- Switched to Ollama embeddings (`mxbai-embed-large`)

Reason:
- Fully local (no API keys)
- Cleaner setup
- Keeps entire stack consistent (Ollama for both LLM + embeddings)

---

### What’s Working

- RAG pipeline (retrieve + generate)
- Vector (semantic) search over `/data`
- Fully local chatbot using:
  - Ollama (LLM)
  - Ollama embeddings
  - LlamaIndex

---

### What’s Not Done Yet

Hybrid search is not complete.

Missing:
- Keyword-based retrieval
- Combining keyword + semantic results

---

### Context in the Bigger Project

This chatbot is just one part of the system:

- Portfolio Risk Assessment (planned)
- Market / News Explorer (planned)
- Emerging Risk Monitor (planned)

The goal is to reuse this same:
- RAG pipeline
- Retrieval system
across all features.

---

### Takeaways

- Local-first setup works well for prototyping
- Embeddings are just as important as the LLM
- Simpler models are fine early — speed > perfection
- LlamaIndex API changes required adapting (no ServiceContext / LLMPredictor)

---

### Next Step

- Implement true hybrid search (keyword + vector)

---

## March 25, 2026 — News Explorer + Web App (Local + Docker MVP)

### Market / Company News Explorer (Local Feature)

Built a working **news_explorer.py** feature locally using:
- Ollama (`dolphin-phi`)
- Ollama embeddings (`mxbai-embed-large`)
- NewsAPI (free API key)

How it works:
- Fetches top ~20 articles from NewsAPI
- Stores title + description into `news.txt`
- Uses:
  - Keyword search (basic string matching)
  - Semantic (vector) search via embeddings
- Combines both into a simple hybrid retrieval pipeline
- Feeds results into LLM for answers (RAG-style)

Notes:
- Keyword search works especially well for exact terms like tickers (e.g. AAPL)
- Semantic search helps fill in gaps when keyword matches are weak

---

### Issues / Limitations (NewsAPI)

- Articles are not always very recent
- Limited number of results
- Only using title + description (not full article)

Conclusion:
- Good enough for a prototype
- Not reliable for real-time or production-level insights

Future improvements:
- Pull more articles (pagination / multiple requests)
- Use more recent / real-time news sources
- Possibly:
  - Use keyword first -> fetch relevant articles via web search
  - Then run keyword + semantic search on those results

---

### Web App (Docker MVP)

Built a **basic full-stack web app** using:
- React (frontend)
- FastAPI (backend)
- Caddy (reverse proxy)
- Docker + Docker Compose

What’s working:
- App runs locally via Docker
- Accessible at `localhost`
- Multiple pages set up:
  - Home (project overview)
  - Portfolio
  - Chatbot
  - News
  - Risk

Current state:
- No real features implemented yet
- Pages are placeholders (“Coming Soon”)
- Mainly a structural/demo UI

---

### Why This Matters

- First step toward turning local AI tools into a real web product
- Confirms full-stack setup works (frontend + backend + routing)
- Sets foundation for deploying features later

---

### Next Steps

#### Web App
- Deploy online (likely Render for free hosting)
- Replace local-only components:
  - Ollama -> OpenAI API (or similar hosted LLM)
- Connect backend APIs to frontend pages
- Gradually implement each feature into the UI

---

#### Market / Company News Explorer (Next Iteration)

To make it production-ready:

- Replace local Ollama with hosted LLM (OpenAI API)
- Improve data pipeline:
  - Fetch more articles
  - Ensure more recent data
- Possibly integrate:
  - Web search -> retrieve relevant articles dynamically
- Improve retrieval:
  - Better keyword matching
  - More robust hybrid search logic
- Store data in database (instead of flat text file)

---

### Takeaways

- Hybrid search (keyword + semantic) works well even in simple form
- Data quality (news freshness + volume) is a major limitation right now
- Dockerized web app proves the architecture is viable
- Next phase is moving from local -> hosted system