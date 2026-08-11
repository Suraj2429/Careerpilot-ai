from fastapi import FastAPI

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