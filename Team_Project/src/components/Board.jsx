import './Board.css';
import {useNavigate} from 'react-router-dom'; 
import HotPost from './HotPost';
import PostWidgetTitle from './PostWidgetTitle';

const Board = () => {
  const nav = useNavigate(); 

  return (
    <div className="board-container">
      <div className="top-row">
        {/* HotPosts.jsx */}
          <HotPost></HotPost>
        {/* Subscription.jsx */}
        <section className="card subscription">
          <div className="card-header">
            <h2>⭐ 구독 게시판</h2>
          </div>
          <div className="tag-cloud">
            <span>#통학</span> <span>#학식</span> <span>#컴공</span> <span>#고양이</span>
          </div>
        </section>
      </div>
    
    {/* 현재는 다른 페이지가 들어가 있지만 컴포넌트 디자인 완료되면 여기도 컴포넌트화 할것임 */}
    {/* 하단: 일반 카테고리 (3열 그리드) */}
      <div className="bottom-grid">

        <div className="card board-item" onClick={()=> nav("/free")}>
          <h3>자유 게시글</h3>
          <PostWidgetTitle type={"free"}></PostWidgetTitle>
        </div>
        <div className="card board-item" onClick={()=> nav("/notice")}>
          <h3>학교 공지글</h3>
          <PostWidgetTitle type={"notification"}></PostWidgetTitle>
        </div>
      </div>
    </div>
  );
};

export default Board;