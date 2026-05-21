import "./CommentItem.css";
import { useContext, useState } from "react";
import good from "../assets/good.png";
import { formattedDate } from "../util/formattedDate";
import { CommentDispatchContext, UserDataContext } from "../util/context";
import CommentInput from "./CommentInput";

const CommentItem = ({
  id,
  postId,
  authorId,
  content,
  createdAt,
  parentId,
  likeCount,
}) => {
  const postDate = formattedDate(createdAt);
  const users = useContext(UserDataContext);
  const { onUpdateComment } = useContext(CommentDispatchContext);
  const postUser = users?.find((user) => user.id === authorId);
  const name = postUser?.userName || "알 수 없음";

  // 대댓글 창 열림/닫힘 상태
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [numLike, setNumLike] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const onUpdateLike = () => {
    const nextLike = isLiked ? numLike - 1 : numLike + 1;
    setNumLike(nextLike);
    setIsLiked(!isLiked);

    const commentInfo = {
      postId: postId,
      authorId: authorId,
      content: content,
      createdAt: createdAt,
      parentId: parentId,
      likeCount: nextLike,
    };

    onUpdateComment(id, commentInfo);
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

            {/* 💡 핵심 수정: 버튼 태그 자체에 onClick과 disabled를 부여합니다 */}
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

      {/* 대댓글 창이 열렸을 때 대댓글창을 보여준다 */}
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
