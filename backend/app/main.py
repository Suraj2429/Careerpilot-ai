from fastapi import FastAPI
from sqlalchemy import text

from app.database.connection import engine


app = FastAPI(
    title="CareerPilot AI",
    description="AI-powered Career Guidance and Internship Recommendation Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "CareerPilot AI API is running",
        "status": "success"
    }


@app.get("/health/database")
def database_health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "database": "SQLite",
        "status": "connected"
    }