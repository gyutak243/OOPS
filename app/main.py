from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine
from app.models.models import Base
from app.api import auth, users, posts, comments

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Oops Board API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(comments.router)

@app.get("/")
def root():
    return {"message": "Oops Board API is running"}