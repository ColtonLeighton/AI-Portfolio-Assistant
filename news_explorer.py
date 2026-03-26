# news_explorer.py
# Market / Company News Explorer using Keyword + Semantic search + RAG with Ollama
# Fetches latest news using NewsAPI (free API key)

import requests
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.core.schema import TextNode
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding


# Fetch latest news from API
API_KEY = "959cf88c08104505b92dee192829a195"
query_topic = "stock market"

url = f"https://newsapi.org/v2/everything?q={query_topic}&apiKey={API_KEY}"
response = requests.get(url).json()
articles = response.get("articles", [])

# save to /data/news.txt
with open("data/news.txt", "w", encoding="utf-8") as file:
    for article in articles[:20]:  # limit to top 20 articles
        title = article.get("title") or ""
        description = article.get("description") or ""
        file.write(title + "\n")
        file.write(description + "\n\n")

# setup Ollama LLM + Embeddings
llm_model_name = "dolphin-phi:latest"
embedding_model_name = "mxbai-embed-large"

llm = Ollama(model=llm_model_name)
embedding_model = OllamaEmbedding(model_name=embedding_model_name)

# load documents and create vector index with chunking
def chunk_text(text, max_len=500):
    """Split text into smaller chunks for embedding."""
    chunks = []
    start_index = 0
    while start_index < len(text):
        chunk = text[start_index:start_index + max_len]
        chunks.append(chunk)
        start_index += max_len
    return chunks

documents = SimpleDirectoryReader("data").load_data()
nodes = []

for document in documents:
    text_chunks = chunk_text(document.text, max_len=500)
    nodes.extend([TextNode(text=chunk) for chunk in text_chunks])

index = VectorStoreIndex(nodes, embed_model=embedding_model)

# chat / query loop
print("Market / Company News Explorer (type 'exit' or 'quit' to quit)")

while True:
    query = input("Enter a topic or company: ")
    if query.lower() in ["exit", "quit"]:
        print("Goodbye!")
        break

    # Keyword search
    keyword_docs = [document.text for document in documents if query.lower() in document.text.lower()]

    # Semantic (vector) search
    retriever = index.as_retriever()
    semantic_nodes = retriever.retrieve(query)
    semantic_docs = [node.text for node in semantic_nodes]

    # Combine keyword and semantic results
    combined_context = "\n".join(keyword_docs[:2] + semantic_docs[:3])  # top 2 keyword + top 3 semantic

    # Custom prompt for LLM
    prompt = f"""
Use this context:
{combined_context}

Answer:
{query}
"""

    # Generate answer with LLM
    response = llm.complete(prompt)

    print("\nAI:", response)
    print("-" * 50)