import "./PostDetail.css";
import Aside from "./Aside";
import Title from "./Title";
import good from "../assets/good.png";
import bad from "../assets/bad.png";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CommentDataContext, PostDataContext } from "../util/context";
import { formattedDate} from "../util/formattedDate";

const PostDetail = () => {
  const { postId } = useParams();
  const posts = useContext(PostDataContext) || [];
  const comments = useContext(CommentDataContext) || [];
  const postData = posts.find((post) => {
    return post.postId === Number(postId);
  });

  if (!postData) {
    window.alert("글이 존재하지 않습니다!");
    return;
  }

  const postDate = formattedDate(postData.createdAt);
  //해당 글에 맞는 댓글 개수
  const commentsList = comments.filter(
    (comment) => comment.postId === postData.postId,
  );

  return (
    //글의 내용만 바뀌고 리랜더링되면서 애니메이션이나 이런것들이 없어져 밋밋해보여서 key값을 주어서 key값이 바뀔 때마다 리액트가 재랜더링 되도록 만들어 주었다.
    <div className="post-detail" key={postId}>
      <Title
        title={`${postData.category === "free" ? "자유" : "공지"}`}
      ></Title>
      <div className="contents-wrapper">
        <Aside></Aside>
        <main className="content-area">
          <article className="post-card">
            <header className="post-card__header">
              <div className="post-card__title-row">
                <h3 className="post-card__title">{postData.title}</h3>
              </div>
              <div className="post-card__meta">
                <div className="post-card__meta-info">
                  <span className="post-card__author">{postData.authorId}</span>
                  <span className="post-card__date">
                    {postDate.date} {postDate.time}
                  </span>
                </div>
                <div className="post-card__stats">
                  <span>추천 {postData.likeCount}</span> |{" "}
                  <span>댓글 {commentsList.length}</span> |{" "}
                  <span>조회수 {postData.viewCount}</span>
                </div>
              </div>
            </header>

            <div className="post-card__content">
              <p className="post-card__text">{postData.content}</p>
            </div>

            <div className="post-card__actions">
              <div className="action-item">
                <button className="btn-vote btn-vote--like">
                  <img src={good} alt="추천" />
                </button>
                <span className="vote-count">13</span>
              </div>
              <div className="action-item">
                <button className="btn-vote btn-vote--dislike">
                  <img src={bad} alt="비추천" />
                </button>
                <span className="vote-count">0</span>
              </div>
            </div>
          </article>
          <CommentList postId={postId}></CommentList>
        </main>
      </div>
    </div>
  );
};

export default PostDetail;
