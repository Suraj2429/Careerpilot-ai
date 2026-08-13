from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
        index=True
    )

    college: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    education_level: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    skills: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list
    )

    interests: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list
    )

    career_goals: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )