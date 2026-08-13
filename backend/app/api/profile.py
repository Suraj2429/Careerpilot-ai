from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.dependency import get_db
from app.dependencies.auth import get_current_user
from app.models.student_profile import StudentProfile
from app.models.user import User
from app.schemas.profile import (
    StudentProfileCreate,
    StudentProfileResponse,
)


router = APIRouter(
    prefix="/api/profile",
    tags=["Student Profile"],
)


@router.post(
    "",
    response_model=StudentProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_profile(
    profile_data: StudentProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_profile = (
        db.query(StudentProfile)
        .filter(
            StudentProfile.user_id == current_user.id
        )
        .first()
    )

    if existing_profile:
        return {
            "id": existing_profile.id,
            "user_id": existing_profile.user_id,
            "college": existing_profile.college,
            "education_level": existing_profile.education_level,
            "skills": existing_profile.skills,
            "interests": existing_profile.interests,
            "career_goals": existing_profile.career_goals,
        }

    profile = StudentProfile(
        user_id=current_user.id,
        college=profile_data.college,
        education_level=profile_data.education_level,
        skills=profile_data.skills,
        interests=profile_data.interests,
        career_goals=profile_data.career_goals,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "college": profile.college,
        "education_level": profile.education_level,
        "skills": profile.skills,
        "interests": profile.interests,
        "career_goals": profile.career_goals,
    }


@router.get(
    "",
    response_model=StudentProfileResponse,
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = (
        db.query(StudentProfile)
        .filter(
            StudentProfile.user_id == current_user.id
        )
        .first()
    )

    if not profile:
        return {
            "id": 0,
            "user_id": current_user.id,
            "college": "",
            "education_level": "",
            "skills": [],
            "interests": [],
            "career_goals": "",
        }

    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "college": profile.college,
        "education_level": profile.education_level,
        "skills": profile.skills,
        "interests": profile.interests,
        "career_goals": profile.career_goals,
    }