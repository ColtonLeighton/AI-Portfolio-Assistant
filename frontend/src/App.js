import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ChatUI from "./ChatUI";
import DocumentLoader from "./DocumentLoader";

/* -------------------- Home Page -------------------- */
function Home() {
  return (
    <div className="container">
      <h1>AI Portfolio Assistant</h1>

      <p>
        An AI-powered system for financial insights, market news, and portfolio
        analysis using <b>Gemini AI + real-time News APIs</b> and retrieval-augmented generation (RAG).
      </p>

      <h2>How it works</h2>
      <p>
        This system uses Google's Gemini model to analyze financial context.
        It combines:
      </p>
      <ul>
        <li>Live NewsAPI data for real-world market updates</li>
        <li>Document-based retrieval (you paste knowledge manually for now)</li>
        <li>Semantic search + embeddings for relevance ranking</li>
        <li>AI-generated summaries and explanations</li>
      </ul>

      <h2>Explore Features</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <Link to="/chatbot">Financial Advice Chatbot</Link>
          <p>Ask investing questions using Gemini + your uploaded knowledge.</p>
        </div>

        <div className="feature-card">
          <Link to="/news">Market / Company News Explorer</Link>
          <p>Search and summarize real-time financial news using NewsAPI.</p>
        </div>

        <div className="feature-card">
          Portfolio Breakdown / Risk Assessment (Coming Soon)
        </div>

        <div className="feature-card">
          Emerging Risk Monitor (Coming Soon)
        </div>
      </div>
    </div>
  );
}

/* -------------------- Chatbot Page -------------------- */
function ChatbotPage() {
  return (
    <div className="container">
      <h1>Financial Advice Chatbot</h1>

      <p>
        This chatbot uses <b>Google Gemini AI</b> with a retrieval system (RAG).
      </p>

      <p>
        <b>How it works:</b>
      </p>

      <ul>
        <li>You can paste financial notes or research into the document box below</li>
        <li>Right now, documents are manually added (uploads coming soon)</li>
        <li>The AI retrieves relevant context and combines it with its own reasoning</li>
        <li>Gemini then generates investment-focused responses</li>
      </ul>

      <ChatUI
        title="Chatbot"
        endpoint="chatbot"
        placeholder="Ask about finance..."
      />

      <DocumentLoader />
    </div>
  );
}

/* -------------------- News Page -------------------- */
function NewsPage() {
  return (
    <div className="container">
      <h1>Market / Company News Explorer</h1>

      <p>
        This feature pulls real-time articles using NewsAPI, then uses Gemini
        to summarize and connect related stories.
      </p>

      <ChatUI
        title="News Explorer"
        endpoint="news"
        placeholder="Ask about markets, companies..."
      />
    </div>
  );
}

/* -------------------- About Page (NEW) -------------------- */
function AboutPage() {
  return (
    <div className="container">
      <h1>About the Creator</h1>

      <p><b>Colton Leighton</b></p>
      <p>Email: coltonmleighton@gmail.com</p>

      <p>
        Computer Science major graduating from NAU in Spring 2026.
      </p>

      <p>
        I am a CS student and aspiring software engineer passionate about AI,
        web development, and collaborative projects. I enjoy building systems
        that combine machine learning, APIs, and real-world applications.
      </p>

      <p>
        My goal is to contribute to innovative software solutions that improve
        how people interact with data and AI systems.
      </p>
    </div>
  );
}

/* -------------------- Portfolio Page -------------------- */
function PortfolioPage() {
  return (
    <div className="container">
      <h1>Portfolio Breakdown / Risk Assessment</h1>
      <div className="coming-soon">Coming Soon</div>
    </div>
  );
}

/* -------------------- Risk Page -------------------- */
function RiskPage() {
  return (
    <div className="container">
      <h1>Emerging Risk Monitor</h1>
      <div className="coming-soon">Coming Soon</div>
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
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/risk">Risk</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
