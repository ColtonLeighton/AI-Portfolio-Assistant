# System Architecture

## Overview
The application follows a modern full-stack architecture:

Frontend (React) → Backend API (FastAPI) → AI Pipeline → Data Layer

The system combines real-time financial data, AI retrieval systems, and LLM-based reasoning to generate insights.

---

## High-Level Architecture

User  
 ↓  
Frontend (React)  
 ↓  
FastAPI Backend (Python)  
 ↓  
AI Pipeline (Hybrid Search + RAG)  
 ↓   
Data Layer
- Financial APIs
- News APIs
- PostgreSQL (app data)
- Vector DB (embeddings)

---

## Components

### 1. Frontend (React)
- User interface for:
  - Portfolio input (CSV / manual)
  - Chat interface
  - News exploration
  - Risk dashboard
- Communicates with backend via REST API

---

### 2. Backend (FastAPI)
- Handles:
  - API routing
  - User requests
  - Portfolio parsing
  - Calls to AI pipeline
- Acts as the central orchestrator

---

### 3. AI Layer

- LLM: Llama 3 (via Ollama)
- Framework: LlamaIndex

#### Responsibilities:
- Query processing
- Hybrid retrieval (keyword + vector)
- RAG-based response generation

📄 See `AI_PIPELINE.md` for detailed pipeline design.

---

### 4. Data Layer

#### Structured Data (External APIs)
- Financial metrics:
  - prices
  - volatility
  - fundamentals
  - sector data
- Retrieved in real-time from APIs

---

#### Application Database (PostgreSQL)
- Stores:
  - user data (future)
  - saved portfolios
  - session data
- Used for:
  - persistence
  - fast retrieval of user-specific data

---

#### Unstructured Data (Vector Database)
- Stores:
  - news articles
  - financial documents
  - reports

- Data is:
  - converted into embeddings
  - stored for semantic search

- Enables:
  - vector search
  - hybrid retrieval

---

## Example Flow (Portfolio Analysis)

1. User uploads portfolio
2. Backend parses tickers and weights
3. Fetch structured financial data from APIs
4. Retrieve relevant documents using hybrid search
5. Combine structured + unstructured data
6. Pass context into LLM (RAG)
7. Generate risk analysis response
8. Return results to frontend

---

## Design Principles

- Separation of concerns (frontend / backend / AI / data)
- Hybrid retrieval for accuracy + context
- Real-time data integration (APIs)
- Scalable architecture for future prototypes
