from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.database.dependency import get_db
from app.exception.exceptions import AppException
from app.models.role import UserRole
from app.models.user import User
from app.schemas.auth import UserLogin, UserRegister
from app.schemas.response import LoginResponse, RegisterResponse
from app.utils.password import hash_password, verify_password


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


# User Registration

@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED
)
def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise AppException(
            message="Email is already registered",
            status_code=status.HTTP_409_CONFLICT
        )

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        role=UserRole.STUDENT.value
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }


# User Login

@router.post(
    "/login",
    response_model=LoginResponse
)
def login_user(
    user_data: UserLogin,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if not user:
        raise AppException(
            message="Invalid email or password",
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    if not verify_password(
        user_data.password,
        user.password
    ):
        raise AppException(
            message="Invalid email or password",
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    # Generate JWT after successful password verification
    access_token = create_access_token(
        {
            "sub": str(user.id),
            "role": user.role
        }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }