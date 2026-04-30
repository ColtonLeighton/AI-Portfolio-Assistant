# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import chatbot
import news_explorer
import sqlite3

# -------------------- Load API Keys --------------------
GOOGLE_GENAI_API_KEY = os.environ.get("GOOGLE_GENAI_API_KEY")
NEWS_API_KEY = os.environ.get("NEWS_API_KEY")

if not GOOGLE_GENAI_API_KEY or not NEWS_API_KEY:
    raise ValueError(
        "API keys not set! Please check your environment variables "
        "(GOOGLE_GENAI_API_KEY and NEWS_API_KEY)."
    )

chatbot.init_api_key(GOOGLE_GENAI_API_KEY)
news_explorer.init_api_key(GOOGLE_GENAI_API_KEY)  # Gemini (for embeddings)
news_explorer.init_news_key(NEWS_API_KEY)         # News API (for fetching news)

# -------------------- FastAPI App --------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AI Portfolio Assistant Backend Running"}

# -------------------- Models --------------------
class ChatRequest(BaseModel):
    query: str

class NewsRequest(BaseModel):
    topic: str

class DocumentRequest(BaseModel):
    text: str

# -------------------- Endpoints --------------------
@app.post("/chatbot")
def chatbot_endpoint(request: ChatRequest):
    print("CHATBOT ENDPOINT HIT")
    try:
        response = chatbot.get_response(request.query)
        return {"response": response}
    except Exception as e:
        print("CHATBOT ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/news")
def news_endpoint(request: NewsRequest):
    print("NEWS ENDPOINT HIT")
    try:
        response = news_explorer.get_news_response(request.topic)
        return {"response": response}
    except Exception as e:
        print("NEWS ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/add_document")
def add_document(request: DocumentRequest):
    try:
        DB_PATH = "chatbot.db"
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO documents (text) VALUES (?)", (request.text,))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "Document added!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =========================================================
# NEW DEBUG ENDPOINT (ADDED FOR NEWS INSPECTION)
# =========================================================
@app.get("/debug/news")
def debug_news():
    """
    Returns raw rows stored in news.db AFTER fetch_news() runs.
    This shows EXACT data pulled from NewsAPI before Gemini processing.
    """
    conn = sqlite3.connect("news.db")
    c = conn.cursor()
    c.execute("SELECT * FROM news")
    rows = c.fetchall()
    conn.close()

    print("DEBUG /news HIT - rows:", len(rows))

    return {
        "count": len(rows),
        "rows": rows
    }
