import "./PostDetail.css";
import Aside from "./Aside";
import Title from "./Title";
import good from "../assets/good.png";
import bad from "../assets/bad.png";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { CommentDataContext, LoginStateContext, PostDataContext, PostDispatchContext, UserDataContext, UserDispatchContext } from "../util/context";
import { formattedDate } from "../util/formattedDate";

const PostDetail = () => {
  const { postId } = useParams();
  const posts = useContext(PostDataContext) || [];
  const comments = useContext(CommentDataContext) || [];
  const users = useContext(UserDataContext) || []; 
  const { onUpdatePost } = useContext(PostDispatchContext) || []; 
  const {onUpdateUserInfo} = useContext(UserDispatchContext); 
  const [isClickLike, setIsClickLike] = useState(false); 
  const [isClickBad, setIsClickBad] = useState(false); 

  const postData = posts.find((post) => {
    return post.postId === Number(postId);
  });


  //메인페이지에 들어올때마다 즉 포스트 아이디가 바뀔 때마다 조회수를 업데이트 해주겠다. 
  useEffect(()=>{
    //postData가 존재하면 조회수를 업데이트 해준다. 
    if(postData){
      onUpdatePost({
        ...postData, 
        viewCount : postData.viewCount + 1, 
      });
    }
     
    //이 주석을 달아주면 의존성 배열 관련 애러가 사라진다. 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
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

  const onClickLike = ()=>{
    const currentLoginUser = localStorage.getItem("currentLoginUser"); 
    const userData = currentLoginUser ? JSON.parse(currentLoginUser) : null; 

    if(!userData){
      window.alert("로그인 후 이용 가능합니다. "); 
      return; 
    }

    //내가 로그인한 계정의 계정정보를 가져온다. 
    const loginUserInfo = users.find((user)=> user.userName === userData.userName);
    if(!loginUserInfo){
      window.alert("로그인 정보를 찾을 수 없음"); 
      return; 
    }

    //내가 로그인한 계정의 likedPosts에 해당 페이지 글의 아이디 값이 들어있는지 확인한다. 
    const isContainLike = loginUserInfo.likedPosts?.includes(Number(postId));
    const isContainBad = loginUserInfo.badPosts?.includes(Number(postId)); 

    let nextLikedPosts; 
    let nextLikeCount; 

    let nextBadPosts = [...(userData.badPosts || [])];
    let nextBadCount = postData.badCount;  


    if (isContainLike) {
      // 팩트 A: 이미 좋아요를 누른 상태 -> 좋아요만 취소
      nextLikedPosts = loginUserInfo.likedPosts.filter((item) => item !== Number(postId));
      nextLikeCount = postData.likeCount - 1;
      setIsClickLike(false); 
    } else {
      // 팩트 B: 좋아요를 새로 누르는 상태 -> 좋아요 추가
      nextLikedPosts = [Number(postId), ...(loginUserInfo.likedPosts || [])];
      nextLikeCount = postData.likeCount + 1;
      setIsClickLike(true); 

      // 이때 싫어요가 눌려있었다면? 싫어요를 강제로 취소시킨다!
      if (isContainBad) {
        nextBadPosts = nextBadPosts.filter((item) => item !== Number(postId));
        nextBadCount = postData.badCount - 1;
        setIsClickBad(false); 
      }
    }

    const userInfo = {
      ...loginUserInfo, 
      likedPosts: nextLikedPosts,
      badPosts: nextBadPosts, // 업데이트된 싫어요 배열도 같이 묶어서 전송
    }

    const postInfo = {
      ...postData, 
      likeCount: nextLikeCount,
      badCount: nextBadCount, // 업데이트된 싫어요 카운트도 같이 묶어서 전송
    }



    onUpdatePost(postInfo); 
    onUpdateUserInfo(userInfo); 
  }

  const onClickBad = () => {
    const currentLoginUser = localStorage.getItem("currentLoginUser"); 
    const userData = currentLoginUser ? JSON.parse(currentLoginUser) : null; 

    if (!userData) {
      window.alert("로그인 후 이용 가능합니다."); 
      return; 
    }

    const loginUserInfo = users.find((user) => user.userName === userData.userName);
    if (!loginUserInfo) {
      window.alert("로그인 정보를 찾을 수 없음"); 
      return; 
    }

    // 1. 현재 내 상태 확인 (좋아요 여부, 싫어요 여부)
    const isContainLike = loginUserInfo.likedPosts?.includes(Number(postId));
    const isContainBad = loginUserInfo.badPosts?.includes(Number(postId));

    let nextBadPosts;
    let nextLikedPosts = [...(loginUserInfo.likedPosts || [])]; // 좋아요 배열 복사본 일단 유지

    let nextLikeCount = postData.likeCount;
    let nextBadCount;

    if (isContainBad) {
      // 팩트 A: 이미 싫어요를 누른 상태 -> 싫어요만 취소
      nextBadPosts = loginUserInfo.badPosts.filter((item) => item !== Number(postId));
      nextBadCount = postData.badCount - 1;
      setIsClickBad(false); 
    } else {
      // 팩트 B: 싫어요를 새로 누르는 상태 -> 싫어요 추가
      nextBadPosts = [Number(postId), ...(loginUserInfo.badPosts || [])];
      nextBadCount = postData.badCount + 1;
      setIsClickBad(true); 

      // ✨ [핵심] 이때 좋아요가 눌려있었다면? 좋아요를 강제로 취소시킨다!
      if (isContainLike) {
        nextLikedPosts = nextLikedPosts.filter((item) => item !== Number(postId));
        nextLikeCount = postData.likeCount - 1;
        setIsClickLike(false); 
      }
    }

    const userInfo = {
      ...loginUserInfo, 
      likedPosts: nextLikedPosts, // 업데이트된 좋아요 배열도 같이 묶어서 전송
      badPosts: nextBadPosts,
    }

    const postInfo = {
      ...postData, 
      likeCount: nextLikeCount,
      badCount: nextBadCount, // 업데이트된 좋아요 카운트도 같이 묶어서 전송
    }

    onUpdatePost(postInfo); 
    onUpdateUserInfo(userInfo); 
  }

  

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
