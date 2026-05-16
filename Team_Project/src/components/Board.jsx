import './Board.css';
import {useNavigate} from 'react-router-dom'; 
import HotPost from './HotPost';

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
        <div className="card board-item">
          <h3>분실물</h3>
          <p>1150번 에어팟 분실...</p>
          <p>후생관 우산 찾아가세요</p>
        </div>
        <div className="card board-item">
          <h3>컴퓨터공학과</h3>
          <p>여름엔 이제 안 씻어도 됨</p>
          <p>ㅇㅇㅇ 교수님 과제...</p>
        </div>
        <div className="card board-item">
          <h3>학식</h3>
          <p>내일 학식 개맛있겠다</p>
          <p>바비든든 이벤트 [1]</p>
        </div>
      </div>
    </div>
  );
};

export default Board;