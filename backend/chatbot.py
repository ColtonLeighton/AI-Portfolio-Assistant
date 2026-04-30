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
    print("Initializing Gemini client...")
    client = genai.Client(api_key=api_key)

# -------------------- SQLite DB --------------------
DB_PATH = "chatbot.db"

def load_documents():
    """
    Loads documents from SQLite and removes empty/invalid entries.
    """
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    try:
        c.execute("SELECT text FROM documents")
        rows = c.fetchall()
    except Exception as e:
        print("DB ERROR in load_documents:", e)
        return []
    finally:
        conn.close()

    docs = []

    for r in rows:
        if r and r[0] and str(r[0]).strip():
            docs.append(str(r[0]).strip())

    print("Loaded documents:", len(docs))
    return docs

# -------------------- Embedding Helper --------------------
def embed_texts(texts):
    """
    Calls Gemini embeddings safely and validates input.
    """
    if not texts:
        raise ValueError("embed_texts received empty list")

    cleaned = [str(t).strip() for t in texts if t and str(t).strip()]

    if not cleaned:
        raise ValueError("All embedding inputs were empty after cleaning")

    print("Embedding items:", len(cleaned))

    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=cleaned
    )

    return [np.array(e.values) for e in result.embeddings]

# -------------------- Query Chatbot (RAG) --------------------
def get_response(query):

    print("get_response called")
    print("QUERY:", repr(query))

    if not client:
        raise ValueError("Gemini client not initialized")

    if not query or not str(query).strip():
        return "Please enter a valid question."

    query = str(query).strip()

    docs = load_documents()

    print("Docs preview:", docs[:3])

    if len(docs) == 0:
        return "No documents loaded yet. Please add knowledge first."

    docs = [d for d in docs if d and d.strip()]

    if len(docs) == 0:
        return "All documents were empty after cleaning."

    try:
        doc_embeddings = embed_texts(docs)
        query_embedding = embed_texts([query])[0]
    except Exception as e:
        print("Embedding error:", e)
        raise

    sims = cosine_similarity([query_embedding], doc_embeddings)[0]

    top_indices = sims.argsort()[-3:][::-1]
    top_docs = [docs[i] for i in top_indices]

    print("Top docs used:", top_docs)

    context = "\n\n".join(top_docs)

    prompt = f"""
Use this context to answer the question.

Context:
{context}

Question:
{query}

Answer like a helpful financial advisor:
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
    except Exception as e:
        print("Generation error:", e)
        raise

    print("Response generated successfully")

    return response.text
