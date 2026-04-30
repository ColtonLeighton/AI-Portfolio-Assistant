import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ChatUI from "./ChatUI";
import DocumentLoader from "./DocumentLoader";

/* -------------------- Home -------------------- */
function Home() {
  return (
    <div className="container">
      <h1>AI Portfolio Assistant</h1>

      <p>
        A modular AI system that combines <b>RAG (Retrieval-Augmented Generation)</b>,
        semantic search, keyword search, and a custom-prompted Gemini-based LLM pipeline
        to generate financial and market insights.
      </p>

      <h2>Purpose</h2>
      <p>
        This project is designed to demonstrate how modern AI systems combine
        structured data (SQL), unstructured data (news/articles/documents),
        and LLM reasoning to produce actionable insights.
      </p>

      <h2>Explore Features</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <Link to="/chatbot"><b>Financial Advice Chatbot</b></Link>
          <p>RAG-based system using your uploaded documents + custom Gemini prompting.</p>
        </div>

        <div className="feature-card">
          <Link to="/news"><b>Market / Company News Explorer</b></Link>
          <p>Hybrid keyword + semantic search over live NewsAPI + AI summarization.</p>
        </div>

        <div className="feature-card">
          Portfolio Breakdown / Risk Assessment (Coming Soon)
        </div>

        <div className="feature-card">
          Emerging Risk Monitor (Coming Soon)
        </div>

        <div className="feature-card">
          <Link to="/about"><b>About / Creator</b></Link>
          <p>Information about the developer and project architecture.</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Chatbot -------------------- */
function ChatbotPage() {
  return (
    <div className="container">
      <h1>Financial Advice Chatbot</h1>

      <p className="about-highlight">
        This chatbot uses a <b>custom Gemini LLM pipeline</b> with Retrieval-Augmented Generation (RAG).
        You can paste or enter text directly into the document box below. That text is stored in a SQLite
        database and retrieved dynamically to provide context-aware financial answers.
      </p>

      <p>
        The system blends:
        <br />• Your uploaded knowledge (SQLite + embeddings)
        <br />• Custom Gemini prompt engineering
        <br />• AI reasoning for finance-related responses
      </p>

      <ChatUI
        title="Chatbot"
        endpoint="chatbot"
        placeholder="Ask about finance..."
      />

      <DocumentLoader />
    </div>
  );
}

/* -------------------- News -------------------- */
function NewsPage() {
  return (
    <div className="container">
      <h1>Market / Company News Explorer</h1>

      <p className="about-highlight">
        This feature uses NewsAPI to fetch live articles, stores them in SQLite,
        then applies keyword + semantic search before sending context to a
        custom Gemini-based summarization model.
      </p>

      <ChatUI
        title="News Explorer"
        endpoint="news"
        placeholder="Ask about news or companies..."
      />
    </div>
  );
}

/* -------------------- About Page -------------------- */
function AboutPage() {
  return (
    <div className="container about-box">
      <h1>About / Creator</h1>

      <p><b>Colton Leighton</b></p>
      <p>Email: coltonmleighton@gmail.com</p>

      <p>
        Computer Science major graduating from NAU (Spring 2026).
        Passionate about AI systems, web development, and building
        production-style full-stack applications.
      </p>

      <h2>Project Overview</h2>

      <p>
        This project (<b>AI Portfolio Assistant</b>) is a full-stack AI system
        designed to explore how modern artificial intelligence pipelines work
        in real-world applications.
      </p>

      <p>
        It combines:
        <br />• Keyword search
        <br />• Semantic vector search
        <br />• RAG (Retrieval-Augmented Generation)
        <br />• Structured SQL storage
        <br />• Custom-prompted Gemini LLM reasoning layer
      </p>

      <h2>AI System Design Goal</h2>

      <p>
        The goal of this project is to demonstrate how AI systems can:
      </p>

      <ul>
        <li>Combine real-time data (NewsAPI) with stored knowledge (SQLite)</li>
        <li>Use embedding-based retrieval to improve LLM accuracy</li>
        <li>Implement hybrid search pipelines (keyword + semantic)</li>
        <li>Simulate real financial AI advisory systems</li>
      </ul>

      <h2>Current Status</h2>

      <p>
        The system is actively under development and will continue to expand into:
      </p>

      <ul>
        <li>Portfolio risk scoring dashboard</li>
        <li>AI-driven investment analysis tools</li>
        <li>Vector database migration (Pinecone)</li>
        <li>Advanced multi-source news aggregation</li>
      </ul>

      <h2>Repository</h2>
      <p>
        GitHub:{" "}
        <a
          href="https://github.com/ColtonLeighton/AI-Portfolio-Assistant"
          target="_blank"
          rel="noreferrer"
        >
          AI-Portfolio-Assistant Repo
        </a>
      </p>

      <p>
        This repository contains the full backend (FastAPI), frontend (React),
        and AI pipeline implementations including RAG, embeddings, and news processing.
      </p>
    </div>
  );
}

/* -------------------- Main App -------------------- */
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/news">News</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
