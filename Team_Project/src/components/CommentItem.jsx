import "./CommentItem.css";
import { useContext, useState } from "react";
import good from "../assets/good.png";
import { formattedDate } from "../util/formattedDate";
import { UserDataContext } from "../util/context";
import CommentInput from "./CommentInput";
import * as commentsApi from "../api/comments";
import { getStoredUser } from "../api/authStorage";

const CommentItem = ({id, postId, authorId, content, createdAt, parentId, likeCount}) => {
  const postDate = formattedDate(createdAt);
  const users = useContext(UserDataContext);
  const postUser = users?.find((user) => user.id === authorId);
  const name = postUser?.userName || "알 수 없음";

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [numLike, setNumLike] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const onUpdateLike = async () => {
    if (!getStoredUser()?.accessToken) {
      window.alert("로그인 후에 이용 가능합니다.");
      return;
    }

    const nextLike = isLiked ? numLike - 1 : numLike + 1;
    setNumLike(nextLike);
    setIsLiked(!isLiked);

    try {
      await commentsApi.toggleLikeComment(postId, id);
    } catch (err) {
      setNumLike(numLike);
      setIsLiked(isLiked);
      window.alert(err.message ?? "좋아요 처리에 실패했습니다.");
    }
  };

  return (
    <>
      <div className={`comment-box ${parentId ? "comment-box--reply" : ""}`}>
        <div className="comment-box__header">
          <div className="comment-box__user-info">
            <span className="comment-box__author">
              {parentId ? `↳ ${name}` : name}
            </span>
            <span className="comment-box__date">{`${postDate.date} ${postDate.time}`}</span>
            <span className="comment-box__like-indicator">
              <img src={good} alt="추천수" className="comment-mini-icon" />{" "}
              {numLike}
            </span>
          </div>
          <div className="comment-box__actions">
            {parentId ? (
              ""
            ) : (
              <button
                className="comment-box__btn-reply"
                onClick={() => setIsReplyOpen(!isReplyOpen)}
              >
                {isReplyOpen ? "취소" : "대댓글"}
              </button>
            )}

            <button
              className={`comment-capsule-btn ${isLiked ? "comment-capsule-btn--active" : ""}`}
              onClick={onUpdateLike}
            >
              <img
                src={good}
                alt="좋아요"
                className="comment-capsule-btn__icon"
              />
              <span className="comment-capsule-btn__text">
                {isLiked ? "추천 완료" : "좋아요"}
              </span>
            </button>
          </div>
        </div>
        <p className="comment-box__text">{content}</p>
      </div>

      {isReplyOpen && (
        <CommentInput
          postId={postId}
          parentId={id}
          onSuccess={() => setIsReplyOpen(false)}
        />
      )}
    </>
  );
};

export default CommentItem;
