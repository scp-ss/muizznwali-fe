from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="MuizzNwali API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to MuizzNwali FastAPI Backend"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Vercel serverless function handler
def handler(event, context):
    # This is for Vercel serverless functions
    from mangum import Mangum
    handler = Mangum(app)
    return handler(event, context)

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))