import "./Aside.css"; 
import fire from "../assets/🔥.png"; 
import SideBarWidget from "./SideBarWidget";
import { useNavigate } from "react-router-dom";

const Aside = ()=>{
    const nav = useNavigate(); 

    return (
        <aside className="sidebar">
            <button className="sidebar__btn sidebar__btn--notice" onClick={()=> nav("/notice")}>공지사항</button>
            
            <div className="sidebar__dropdown-container" >
                <button className="sidebar__dropdown-trigger" onClick={()=> nav("/popular")}>인기 게시판</button>
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
                <h3 className="widget-popular__title" onClick={()=> nav("/popular")}>
                    <img src={fire} alt="인기" className="widget-title-icon"/> 인기 게시글
                </h3>
                <SideBarWidget type={"free"}></SideBarWidget>
            </section>

            <section className="sidebar__widget widget-board-preview">
                <h3 className="widget-board-preview__title" onClick={()=> nav("/notice")}>공지글 게시판</h3>
                <SideBarWidget type={"notification"}></SideBarWidget>
            </section>
        </aside>
    ); 
}

export default Aside; 