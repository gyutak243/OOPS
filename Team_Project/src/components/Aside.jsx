import "./Aside.css"; 
import fire from "../assets/🔥.png"; 

const Aside = ()=>{
    return (
        <aside className="sidebar">
            <button className="sidebar__btn sidebar__btn--notice">공지사항</button>
            
            <div className="sidebar__dropdown-container">
                <button className="sidebar__dropdown-trigger">구독 게시판</button>
                <ul className="sidebar__menu-list">
                    <li className="sidebar__menu-item sidebar__menu-item--active"><a href="#">통학 게시판</a></li>
                    <li className="sidebar__menu-item"><a href="#">분실물 게시판</a></li>
                    <li className="sidebar__menu-item"><a href="#">컴퓨터공학과 게시판</a></li>
                    <li className="sidebar__menu-item"><a href="#">학식 게시판</a></li>
                    <li className="sidebar__menu-item"><a href="#">고양이 게시판</a></li>
                </ul>
            </div>

            <button className="sidebar__btn sidebar__btn--login-info">로그인 / 회원가입</button>

            <section className="sidebar__widget widget-popular">
                <h3 className="widget-popular__title">
                    <img src={fire} alt="인기" className="widget-title-icon"/> 인기 게시글
                </h3>
                <ul className="widget-popular__list">
                    <li><a href="#">외대 주변 맛집 추천... <span className="comment-count">[1]</span></a></li>
                    <li><a href="#">1교시 등교 팁 하게... <span className="comment-count">[3]</span></a></li>
                    <li><a href="#">오픈소스공학 조평 관련... <span className="comment-count">[18]</span></a></li>
                    <li><a href="#">기숙사 입사 꿀팁 [1]</a></li>
                    <li><a href="#">시험공부 장소 추천...</a></li>
                    <li><a href="#">시험 참고집 양도... <span className="comment-count">[2]</span></a></li>
                    <li><a href="#">교통카드 충전기... <span className="comment-count">[1]</span></a></li>
                </ul>
            </section>

            <section className="sidebar__widget widget-board-preview">
                <h3 className="widget-board-preview__title">통학 게시판</h3>
                <ul className="widget-board-preview__list">
                    <li><a href="#">강남역 가는 버스... <span className="comment-count">[1]</span></a></li>
                    <li><a href="#">수원 캠퍼스 셔틀...</a></li>
                    <li><a href="#">통학 시외권 정보... <span className="comment-count">[5]</span></a></li>
                    <li><a href="#">통학 시간 단축...</a></li>
                    <li><a href="#">막차 시간 변경... <span className="comment-count">[12]</span></a></li>
                    <li><a href="#">카풀 하실 분 구합... <span className="comment-count">[1]</span></a></li>
                </ul>
            </section>
        </aside>
    ); 
}

export default Aside; 