from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.models import Comment, Post
from app.schemas.schemas import CommentCreate, CommentResponse


def get_comments(db: Session, post_id: int) -> list[CommentResponse]:
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="게시글이 없습니다"
        )
    return db.query(Comment).filter(Comment.post_id == post_id).order_by(Comment.created_at.asc()).all()


def create_comment(db: Session, post_id: int, comment_data: CommentCreate, author_id: int) -> Comment:
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="게시글이 없습니다"
        )
    comment = Comment(
        content=comment_data.content,
        post_id=post_id,
        author_id=author_id
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def update_comment(db: Session, post_id: int, comment_id: int, comment_data: CommentCreate, user_id: int) -> Comment:
    comment = db.query(Comment).filter(
        Comment.id == comment_id,
        Comment.post_id == post_id
    ).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="댓글이 없습니다"
        )
    if comment.author_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="권한이 없습니다"
        )
    comment.content = comment_data.content
    db.commit()
    db.refresh(comment)
    return comment


def delete_comment(db: Session, post_id: int, comment_id: int, user_id: int) -> dict:
    comment = db.query(Comment).filter(
        Comment.id == comment_id,
        Comment.post_id == post_id
    ).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="댓글이 없습니다"
        )
    if comment.author_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="권한이 없습니다"
        )
    db.delete(comment)
    db.commit()
    return {"message": "댓글이 삭제됐습니다"}