# news_explorer.py
# Market / Company News Explorer using Keyword + Semantic search + RAG with Gemini

import sqlite3
import requests
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from google import genai

# -------------------- Setup --------------------
client = None
NEWS_API_KEY = None
DB_PATH = "news.db"

def init_api_key(api_key):
    global client
    client = genai.Client(api_key=api_key)

def init_news_key(api_key):
    global NEWS_API_KEY
    NEWS_API_KEY = api_key

# -------------------- Fetch Latest News --------------------
def fetch_news(topic):
    if not NEWS_API_KEY:
        raise ValueError("News API key not initialized")

    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={NEWS_API_KEY}"
    data = requests.get(url).json()

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Clear old data (fresh each query like CLI version)
    c.execute("DELETE FROM news")

    for a in data.get("articles", [])[:15]:
        title = a.get("title", "")
        desc = a.get("description", "")
        c.execute(
            "INSERT INTO news (title, description) VALUES (?, ?)",
            (title, desc)
        )

    conn.commit()
    conn.close()

# -------------------- Load Articles --------------------
def load_articles():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT title, description FROM news")
    rows = c.fetchall()
    conn.close()

    return [f"{r[0]}\n{r[1]}" for r in rows]

# -------------------- Embeddings --------------------
def embed_texts(texts):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=texts
    )
    return [np.array(e.values) for e in result.embeddings]

# -------------------- Query News (Keyword + Semantic + RAG) --------------------
def get_news_response(topic):

    if not client:
        raise ValueError("Gemini client not initialized")

    fetch_news(topic)
    articles = load_articles()

    print("get_news_response() called")

    if not articles:
        return "No news found."

    # ---- Keyword Search ----
    keyword_matches = [
        a for a in articles if topic.lower() in a.lower()
    ]

    # ---- Semantic Search ----
    embeddings = embed_texts(articles)
    query_emb = embed_texts([topic])[0]

    sims = cosine_similarity([query_emb], embeddings)[0]
    top_indices = sims.argsort()[-3:][::-1]
    semantic_matches = [articles[i] for i in top_indices]

    # ---- Combine Results (like old version) ----
    combined_context = "\n\n".join(
        keyword_matches[:2] + semantic_matches[:3]
    )

    # ---- Prompt ----
    prompt = f"""
Use this context:

{combined_context}

Answer this question:
{topic}

Give a clear summary of the news:
"""

    # ---- Generate Answer ----
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text
