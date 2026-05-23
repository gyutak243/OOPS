import "./PostDetail.css";
import Aside from "./Aside";
import Title from "./Title";
import good from "../assets/good.png";
import bad from "../assets/bad.png";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CommentDataContext, LoginStateContext, PostDataContext, PostDispatchContext, UserDataContext, UserDispatchContext } from "../util/context";
import { formattedDate } from "../util/formattedDate";
import { getStoredUser, setStoredUser } from "../api/authStorage";
import * as postsApi from "../api/posts";

function isLoggedIn() {
  const stored = getStoredUser();
  if (!stored?.userName) return false;
  return Boolean(stored.accessToken);
}

function resolveLoginUser(users) {
  const stored = getStoredUser();
  if (!stored?.userName) return null;

  const fromContext = users.find((user) => user.userName === stored.userName);
  if (fromContext) return fromContext;

  if (stored.id != null) {
    return {
      id: stored.id,
      userName: stored.userName,
      likedPosts: stored.likedPosts ?? [],
      badPosts: stored.badPosts ?? [],
    };
  }

  return null;
}

const PostDetail = () => {
  const { postId } = useParams();
  const posts = useContext(PostDataContext) || [];
  const comments = useContext(CommentDataContext) || [];
  const users = useContext(UserDataContext) || [];
  const { onFetchPost, onUpdatePostLocal } = useContext(PostDispatchContext) || {};
  const { onUpdateUserInfo } = useContext(UserDispatchContext);

  const postData = posts.find((post) => {
    return post.postId === Number(postId);
  });

  const loginUserInfo = resolveLoginUser(users);
  const isClickLike = loginUserInfo?.likedPosts?.includes(Number(postId)) ?? false;
  const isClickBad = loginUserInfo?.badPosts?.includes(Number(postId)) ?? false;

  useEffect(() => {
    onFetchPost(postId);
  }, [postId]);

  if (!postData) {
    window.alert("글이 존재하지 않습니다!");
    return;
  }

  const currentUser = users.find((user)=>{
    return user.id === postData.authorId; 
  }); 

  const postDate = formattedDate(postData.createdAt);
  //해당 글에 맞는 댓글 개수
  const commentsList = comments.filter(
    (comment) => comment.postId === postData.postId,
  );

  const onClickLike = async () => {
    if (!isLoggedIn()) {
      window.alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (!loginUserInfo) {
      window.alert("로그인 후 이용 가능합니다.");
      return;
    }

    const stored = getStoredUser();
    const isContainLike = loginUserInfo.likedPosts?.includes(Number(postId));
    const isContainBad = loginUserInfo.badPosts?.includes(Number(postId));

    let nextLikedPosts;
    let nextLikeCount;

    let nextBadPosts = [...(loginUserInfo.badPosts || [])];
    let nextBadCount = postData.badCount;

    if (isContainLike) {
      nextLikedPosts = loginUserInfo.likedPosts.filter((item) => item !== Number(postId));
      nextLikeCount = postData.likeCount - 1;
    } else {
      nextLikedPosts = [Number(postId), ...(loginUserInfo.likedPosts || [])];
      nextLikeCount = postData.likeCount + 1;

      if (isContainBad) {
        nextBadPosts = nextBadPosts.filter((item) => item !== Number(postId));
        nextBadCount = postData.badCount - 1;
      }
    }

    const userInfo = {
      ...loginUserInfo,
      likedPosts: nextLikedPosts,
      badPosts: nextBadPosts,
    };

    const postInfo = {
      ...postData,
      likeCount: nextLikeCount,
      badCount: nextBadCount,
    };

    onUpdatePostLocal(postInfo);
    onUpdateUserInfo(userInfo);
    setStoredUser({
      ...stored,
      likedPosts: nextLikedPosts,
      badPosts: nextBadPosts,
    });

    try {
      if (isContainLike) {
        await postsApi.unlikePost(Number(postId));
      } else {
        await postsApi.likePost(Number(postId));
      }
    } catch (err) {
      onUpdatePostLocal(postData);
      onUpdateUserInfo(loginUserInfo);
      setStoredUser({ ...stored, likedPosts: loginUserInfo.likedPosts, badPosts: loginUserInfo.badPosts });
      window.alert(err.message ?? "좋아요 처리에 실패했습니다.");
    }
  };

  const onClickBad = () => {
    if (!isLoggedIn()) {
      window.alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (!loginUserInfo) {
      window.alert("로그인 후 이용 가능합니다.");
      return;
    }

    const stored = getStoredUser();
    const isContainLike = loginUserInfo.likedPosts?.includes(Number(postId));
    const isContainBad = loginUserInfo.badPosts?.includes(Number(postId));

    let nextBadPosts;
    let nextLikedPosts = [...(loginUserInfo.likedPosts || [])];

    let nextLikeCount = postData.likeCount;
    let nextBadCount;

    if (isContainBad) {
      nextBadPosts = loginUserInfo.badPosts.filter((item) => item !== Number(postId));
      nextBadCount = postData.badCount - 1;
    } else {
      nextBadPosts = [Number(postId), ...(loginUserInfo.badPosts || [])];
      nextBadCount = postData.badCount + 1;

      if (isContainLike) {
        nextLikedPosts = nextLikedPosts.filter((item) => item !== Number(postId));
        nextLikeCount = postData.likeCount - 1;
      }
    }

    const userInfo = {
      ...loginUserInfo,
      likedPosts: nextLikedPosts,
      badPosts: nextBadPosts,
    };

    const postInfo = {
      ...postData,
      likeCount: nextLikeCount,
      badCount: nextBadCount,
    };

    onUpdatePostLocal(postInfo);
    onUpdateUserInfo(userInfo);
    setStoredUser({
      ...stored,
      likedPosts: nextLikedPosts,
      badPosts: nextBadPosts,
    });
  };

  

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
                  {/* 게시자가 탈퇴했을 경우를 포함 */}
                  <span className="post-card__author">{currentUser ? currentUser.userName : "알수 없음"}</span>
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
                <button className={`btn-vote btn-vote--like ${isClickLike ? "active" : ""}`} onClick={onClickLike}>
                  <img src={good} alt="추천" />
                </button>
                <span className="vote-count">{postData.likeCount}</span>
              </div>
              <div className="action-item">
                <button className={`btn-vote btn-vote--dislike ${isClickBad ? "active" : ""}`} onClick={onClickBad}>
                  <img src={bad} alt="비추천" />
                </button>
                <span className="vote-count">{postData.badCount}</span>
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
