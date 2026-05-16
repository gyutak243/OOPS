from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.schemas import UserCreate, UserResponse, Token
from app.services.auth_service import register, login, check_username

router = APIRouter(prefix="/auth", tags=["계정"])


@router.post("/signup", response_model=UserResponse, status_code=201)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    return register(db, user_data)


@router.post("/login", response_model=Token)
def login_user(form_data: UserCreate, db: Session = Depends(get_db)):
    return login(db, form_data.username, form_data.password)


@router.get("/check-id", )
def check_id(username: str, db: Session = Depends(get_db)):
    return check_username(db, username)