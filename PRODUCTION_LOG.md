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