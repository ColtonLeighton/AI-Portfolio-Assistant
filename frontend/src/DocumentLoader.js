import React, { useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function DocumentLoader() {
  const [docText, setDocText] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    console.log("BACKEND_URL =", BACKEND_URL);

    if (!docText.trim()) {
      setStatus("Please enter some text before submitting.");
      return;
    }

    try {
      const res = await fetch(
        `${BACKEND_URL.replace(/\/$/, "")}/add_document`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: docText }),
        }
      );

      const data = await res.json();

      console.log("BACKEND RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.detail || "Failed to add document");
      }

      setStatus("Document added successfully.");
      setDocText("");
    } catch (err) {
      console.error("Document upload error:", err);
      setStatus("Error adding document");
    }
  };

  return (
    <div className="container">
      <h3>Add Knowledge (for Chatbot)</h3>

      <textarea
        rows={4}
        value={docText}
        onChange={(e) => setDocText(e.target.value)}
        placeholder="Paste financial info here..."
      />

      <button onClick={handleSubmit}>Add Document</button>

      <div className="ai-response-box">{status}</div>
    </div>
  );
}
