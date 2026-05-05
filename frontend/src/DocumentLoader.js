import React, { useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function DocumentLoader() {
  const [docText, setDocText] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!docText.trim()) {
      setStatus("Enter text first.");
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

      await res.json();

      setStatus("Document added.");
      setDocText("");
    } catch (err) {
      setStatus("Error adding document.");
    }
  };

  return (
    <div className="container">
      <h3>Add Knowledge</h3>

      <textarea
        rows={4}
        value={docText}
        onChange={(e) => setDocText(e.target.value)}
        placeholder="Paste text..."
      />

      <br /><br />

      <button onClick={handleSubmit}>Add Document</button>

      <p>{status}</p>
    </div>
  );
}
