import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ChatUI from "./ChatUI";
import DocumentLoader from "./DocumentLoader";

const BACKEND_URL = "http://localhost:8000";

/* -------------------- Home Page -------------------- */
function Home() {
  return (
    <div className="container">
      <h1>AI Portfolio Assistant</h1>
      <p>
        AI-powered assistant for portfolio analysis, market insights, and emerging risk monitoring.
      </p>

      <h2>Purpose</h2>
      <p>
        This web app uses live financial and news APIs, keyword + semantic search, hybrid retrieval, and RAG-based AI to generate insights and summaries.
      </p>

      <h2>Explore Features</h2>
      <ul>
        <li><Link to="/chatbot">Financial Advice Chatbot</Link></li>
        <li><Link to="/news">Market / Company News Explorer</Link></li>
        <li><Link to="/portfolio">Portfolio Breakdown / Risk Assessment (Coming Soon)</Link></li>
        <li><Link to="/risk">Emerging Risk Monitor (Coming Soon)</Link></li>
      </ul>
    </div>
  );
}

/* -------------------- Financial Advice Chatbot Page -------------------- */
function ChatbotPage() {
  return (
    <div className="container">
      <h1>Financial Advice Chatbot</h1>
      <p>
        Ask questions about investing or finance. This feature uses RAG-based retrieval from your uploaded financial documents and an LLM to provide context-aware answers.
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

/* -------------------- Market / Company News Explorer Page -------------------- */
function NewsPage() {
  return (
    <div className="container">
      <h1>Market / Company News Explorer</h1>
      <p>
        Explore news by company, ticker, or topic. Uses both keyword and semantic search to retrieve relevant articles, then summarizes them via RAG.
      </p>

      <ChatUI
        title="News Explorer"
        endpoint="news"
        placeholder="Ask about news or companies..."
      />
    </div>
  );
}

/* -------------------- Portfolio Breakdown / Risk Assessment Page -------------------- */
function PortfolioPage() {
  return (
    <div className="container">
      <h1>Portfolio Breakdown / Risk Assessment</h1>
      <p>
        Planned feature: Users will upload or input portfolio data (CSV or chat). The system will use structured + hybrid search to evaluate holdings and assign risk scores.
      </p>
      <div className="coming-soon">Coming Soon</div>
    </div>
  );
}

/* -------------------- Emerging Risk Monitor Page -------------------- */
function RiskPage() {
  return (
    <div className="container">
      <h1>Emerging Risk Monitor</h1>
      <p>
        Planned feature: A dashboard highlighting rising risks in portfolios or sectors using hybrid search + RAG summarization to detect early warning signals.
      </p>
      <div className="coming-soon">Coming Soon</div>
    </div>
  );
}

/* -------------------- Main App -------------------- */
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* NAVBAR */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/news">News</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/risk">Risk</Link>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/risk" element={<RiskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;