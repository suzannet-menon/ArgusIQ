from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()  # loads .env file automatically

from api.routes import router

app = FastAPI(
    title="ArgusIQ API",
    description="AI-Powered Supplier Risk Intelligence — Gappy AI Hackathon 2026",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow the React frontend to call this API
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "service":     "ArgusIQ API",
        "status":      "live",
        "description": "AI-Powered Supplier Risk Intelligence for Indian E-Commerce",
        "docs":        "/docs",
        "endpoints": [
            "/api/v1/health",
            "/api/v1/portfolio",
            "/api/v1/suppliers/{id}",
            "/api/v1/alerts",
            "/api/v1/chat",
            "/api/v1/compare?id1=S001&id2=S010",
        ],
    }