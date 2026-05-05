from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.base import UserUpdate, PasswordChange, UserBase
from app.database import get_db
from app.auth.jwt import get_current_user, verify_password, get_password_hash
from app.models.user import User

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.put("/me", response_model=UserBase)
def update_profile(
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # update fields...
    return current_user

@router.put("/me/password")
def change_password(
    payload: PasswordChange,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # verify + update password...
    return {"message": "Password updated"}
