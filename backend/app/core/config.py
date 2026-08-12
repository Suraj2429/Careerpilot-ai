import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    APP_NAME: str = os.getenv(
        "APP_NAME",
        "CareerPilot AI"
    )

    APP_ENV: str = os.getenv(
        "APP_ENV",
        "development"
    )

    DEBUG: bool = os.getenv(
        "DEBUG",
        "False"
    ).lower() == "true"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL"
    )

    JWT_SECRET_KEY: str = os.getenv(
        "JWT_SECRET_KEY"
    )

    JWT_ALGORITHM: str = os.getenv(
        "JWT_ALGORITHM",
        "HS256"
    )

    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "60"
        )
    )

    FRONTEND_URL: str = os.getenv(
        "FRONTEND_URL",
        "http://localhost:5173"
    )


settings = Settings()