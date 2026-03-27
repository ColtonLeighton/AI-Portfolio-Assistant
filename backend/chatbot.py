# chatbot.py  
# Financial Advice Chatbot using Gemini embeddings + Gemini LLM (RAG style)

import sqlite3
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from google import genai

# -------------------- Gemini Client --------------------
client = None

def init_api_key(api_key):
    global client
    client = genai.Client(api_key=api_key)

# -------------------- SQLite DB --------------------
DB_PATH = "chatbot.db"

def load_documents():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT text FROM documents")
    rows = c.fetchall()
    conn.close()
    return [r[0] for r in rows]

# -------------------- Embedding Helper --------------------
def embed_texts(texts):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=texts
    )
    return [np.array(e.values) for e in result.embeddings]

# -------------------- Query Chatbot (RAG) --------------------
def get_response(query):

    if not client:
        raise ValueError("Gemini client not initialized")

    docs = load_documents()

    if not docs:
        return "No documents loaded yet."

    # ---- Semantic Search (Vector Search) ----
    doc_embeddings = embed_texts(docs)
    query_embedding = embed_texts([query])[0]

    sims = cosine_similarity([query_embedding], doc_embeddings)[0]

    # Top 3 most relevant docs (like old RAG)
    top_indices = sims.argsort()[-3:][::-1]
    top_docs = [docs[i] for i in top_indices]

    # ---- Combine Context ----
    context = "\n\n".join(top_docs)

    # Prompt
    prompt = f"""
Use this context to answer the question.

Context:
{context}

Question:
{query}

Answer like a helpful financial advisor:
"""

    # ---- Generate Response ----
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text