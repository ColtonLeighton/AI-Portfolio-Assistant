# chatbot.py
# Financial Advice Chatbot using Ollama embeddings + Ollama LLM (fully local)

from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.core.schema import TextNode
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding

# Setup Ollama LLM and Embeddings
llm_model_name = "dolphin-phi:latest"        # If using a different Ollama version, replace with name of downloaded Ollama LLM
embedding_model_name = "mxbai-embed-large"  # Ollama embedding model

# initialize the language model
llm = Ollama(model=llm_model_name)

# initialize embedding model
embedding_model = OllamaEmbedding(model_name=embedding_model_name)

# Load documents from /data folder
documents = SimpleDirectoryReader("data").load_data()

# Convert documents to TextNode objects
nodes = [TextNode(text=d.text) for d in documents]

# Build vector index using OllamaEmbedding
index = VectorStoreIndex(nodes, embed_model=embedding_model)

# Chat loop
print("Financial Advice Chatbot (type 'exit' to quit)")

# Run chatbot continuously until user exits
while True:

    # get user input from the terminal
    query = input("You: ")

    # check if user wants to exit chatbot, if so, break loop and print goodbye
    if query.lower() in ["exit", "quit"]:
        print("Goodbye!")
        break

    # Explicitly pass Ollama LLM to the query engine to avoid OpenAI
    query_engine = index.as_query_engine(llm=llm)

    # display AI-generated response in the terminal
    response = query_engine.query(query)

    # print a separator line for cleaner output
    print("\nAI:", response)
    print("-" * 50)