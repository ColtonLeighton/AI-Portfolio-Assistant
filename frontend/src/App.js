import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Pages

function Home() {
  return (
    <div className="container">
      <h1>AI Portfolio Assistant</h1>

      <p>
        AI-powered assistant for portfolio analysis, market insights, and emerging risk monitoring.
      </p>

      <h2>Purpose</h2>
      <p>
        This web app uses financial + news APIs, hybrid search, and RAG to turn data into insights.
      </p>

      <h2>Project Repository</h2>
      <p>
        View development progress and run locally:
      </p>

      <a
        href="https://github.com/ColtonLeighton/AI-Portfolio-Assistant"
        target="_blank"
        rel="noreferrer"
      >
        GitHub Repository
      </a>

      <h3>Run Locally</h3>
      <p>
        Clone the repo and run the local version to explore features.
      </p>
    </div>
  );
}

function ComingSoon({ title, description, search, goal }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{description}</p>

      <h3>Search Type</h3>
      <p>{search}</p>

      <h3>Goal</h3>
      <p>{goal}</p>

      <div className="coming-soon">Coming Soon</div>
    </div>
  );
}

// Main App

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        
        {/* NAVBAR */}
        <div className="navbar">
          <Link className="button-19" to="/">Home</Link>
          <Link className="button-19" to="/portfolio">Portfolio</Link>
          <Link className="button-19" to="/chatbot">Chatbot</Link>
          <Link className="button-19" to="/news">News</Link>
          <Link className="button-19" to="/risk">Risk</Link>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/portfolio"
            element={
              <ComingSoon
                title="Portfolio Breakdown / Risk Assessment"
                description="Upload or input portfolio data (CSV or chat)."
                search="Structured retrieval + Hybrid search"
                goal="Evaluate holdings and assign risk scores."
              />
            }
          />

          <Route
            path="/chatbot"
            element={
              <ComingSoon
                title="Financial Advice Chatbot"
                description="Ask questions about investing or finance."
                search="Hybrid search + RAG"
                goal="Provide AI-assisted answers."
              />
            }
          />

          <Route
            path="/news"
            element={
              <ComingSoon
                title="Market / Company News Explorer"
                description="Explore news by company or topic."
                search="Keyword + Semantic search"
                goal="Retrieve relevant articles quickly."
              />
            }
          />

          <Route
            path="/risk"
            element={
              <ComingSoon
                title="Emerging Risk Monitor"
                description="Dashboard for rising risks."
                search="Structured + Hybrid + RAG"
                goal="Identify early warning signals."
              />
            }
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;