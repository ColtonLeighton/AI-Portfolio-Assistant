# AI / LLM Pipeline

![AI Pipeline](ai_pipeline.png)

---

## Overview
The system uses a hybrid retrieval + RAG (Retrieval-Augmented Generation) pipeline to generate grounded financial insights from both structured market data and unstructured sources such as news and reports.

The goal is to combine:
- Real-time financial data (APIs)
- Contextual document retrieval (hybrid search)
- LLM reasoning (RAG)

to produce accurate, explainable outputs for users.

---

## Core Concepts

### 1. Keyword Search
- Matches exact:
  - tickers (AAPL, NVDA)
  - company names
  - financial terms
- Useful for precise queries and filtering

---

### 2. Vector (Semantic) Search
- Converts text into embeddings (numerical vectors)
- Finds results based on meaning, not exact wording
- Enables:
  - similarity search
  - context-aware retrieval

---

### 3. Hybrid Search
- Combines:
  - keyword search (precision)
  - semantic search (context)
- Primary retrieval method used in the system
- Ensures:
  - exact matches are not missed
  - relevant context is still captured

---

### 4. RAG (Retrieval-Augmented Generation)
- Retrieved documents are passed to the LLM
- LLM generates grounded, context-aware responses
- Prevents hallucination by anchoring responses in real data

---

## LLM & AI Frameworks

### Language Model (LLM)
- **Primary:** Llama 3 (local)
- Runs via: Ollama

#### Why Llama 3?
- Free and open-source
- Can run locally (no API cost)
- Strong performance for general reasoning and RAG
- Good balance between performance and accessibility for a personal project

---

### LLM Runtime
- **Ollama**
  - Runs LLMs locally on machine
  - Provides a simple API interface for backend integration

#### Why Ollama?
- Very easy setup compared to other local LLM tools
- No cloud dependency
- Great for development and demos

---

### RAG / Retrieval Framework
- **Primary:** LlamaIndex

#### Why LlamaIndex?
- Designed specifically for RAG systems
- Easy integration with:
  - vector databases
  - document pipelines
  - LLMs
- Simpler and more focused than alternatives

---

### Future Optional Frameworks
- LangChain
  - For more complex workflows, chaining, and agent-based systems

---

### Embeddings
- Local embedding models (Ollama or HuggingFace)

#### Purpose:
- Convert:
  - news articles
  - financial documents
  - reports
into vector representations

Used for:
- semantic search
- similarity matching

---

## Data Pipeline

The system processes both structured and unstructured data:

### Structured Data
- Stock prices
- Volatility
- Financial ratios
- Sector classifications
- Retrieved from financial APIs

### Unstructured Data
- News articles
- Financial reports
- Analysis content

---

### Data Flow

1. Fetch real-time financial data from APIs
2. Ingest news articles and documents
3. Clean and preprocess text data
4. Generate embeddings
5. Store embeddings in vector database
6. Enable hybrid retrieval for queries

---

## Pipeline Flow

User Query / Portfolio Input  
        ↓  
Query Processing  
        ↓  
Hybrid Retrieval (Keyword + Vector)  
        ↓  
Retrieve Relevant Documents + Data  
        ↓  
Combine with Structured Financial Data  
        ↓  
LLM (RAG) Generates Response  
        ↓  
Return to User  

---

## Use Case Mapping

### Portfolio Analysis
- Structured data + hybrid retrieval + RAG
- Combines:
  - financial metrics
  - contextual news
- Outputs:
  - risk scores
  - explanations

---

### Financial Chatbot
- Hybrid retrieval + RAG
- Answers natural language questions using:
  - retrieved documents
  - financial context

---

### News Explorer
- Keyword + semantic search
- Optional RAG summarization
- Focus on:
  - fast retrieval
  - relevant filtering

---

### Emerging Risk Monitor
- Hybrid retrieval + structured data + RAG summarization
- Continuously analyzes:
  - market data
  - news trends
- Outputs:
  - high-level risk insights
  - recurring patterns

---

## Key Design Principles

- **Grounded Responses:** All outputs are based on retrieved data (RAG)
- **Hybrid Retrieval First:** Combines precision + context
- **Separation of Data Types:** Structured vs unstructured handled differently
- **Local-First AI:** Uses local LLMs to reduce cost and increase control
- **Scalable Design:** Can later integrate cloud models or larger datasets