from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app instance
app = FastAPI()

# Add CORS middleware so frontend React can make requests
# note: in production limit allow_origins to domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint to check if backend is running
@app.get("/")
def root():
    return {"message": "AI Portfolio Assistant Backend Running"}