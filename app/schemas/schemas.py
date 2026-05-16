from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ── 계정 ──────────────────────────────────────────
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    profile_image: Optional[str] = None

    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    profile_image: Optional[str] = None

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    
class UserLogin(BaseModel):
    username: str
    password: str


# ── 게시글 ─────────────────────────────────────────
class PostCreate(BaseModel):
    title: str
    content: str
    category: str = "free"

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    author_id: int
    like_count: int = 0
    comment_count: int = 0
    category: str = "free"

    class Config:
        from_attributes = True


# ── 댓글 ──────────────────────────────────────────
class CommentCreate(BaseModel):
    content: str

class CommentResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    author_id: int
    post_id: int

    class Config:
        from_attributes = True