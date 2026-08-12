from fastapi import FastAPI
from sqlalchemy import text

from app.api.auth import router as auth_router
from app.database.base import Base
from app.database.connection import engine
from app.models.user import User
from app.api.users import router as users_router
from app.api.admin import router as admin_router

app = FastAPI(
    title="CareerPilot AI",
    description="AI-powered Career Guidance and Internship Recommendation Platform",
    version="1.0.0"
)


Base.metadata.create_all(bind=engine)


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(admin_router)

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