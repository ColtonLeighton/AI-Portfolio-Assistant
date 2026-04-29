import React, { useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function DocumentLoader() {
  const [docText, setDocText] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/add_document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: docText }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("Document added!");
      setDocText("");
    } catch (err) {
      setStatus("Error adding document");
      console.error(err);
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
