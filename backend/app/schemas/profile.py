from pydantic import BaseModel, Field


class StudentProfileCreate(BaseModel):
    college: str = Field(
        min_length=2,
        max_length=150
    )

    education_level: str = Field(
        min_length=2,
        max_length=100
    )

    skills: list[str] = Field(
        min_length=1
    )

    interests: list[str] = Field(
        min_length=1
    )

    career_goals: str = Field(
        min_length=5,
        max_length=1000
    )


class StudentProfileResponse(BaseModel):
    id: int
    user_id: int
    college: str
    education_level: str
    skills: list[str]
    interests: list[str]
    career_goals: str