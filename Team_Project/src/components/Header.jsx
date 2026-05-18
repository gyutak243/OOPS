import './Header.css'; 
import logo from "../assets/main Logo.png";
import man from "../assets/man.png"; 
import search from "../assets/search.png"; 
import { useNavigate } from 'react-router-dom';


const Header = ()=>{
    const nav = useNavigate(); 
    //학교 홈페이지로 갈 수 있게 해줬다. 
    const handleMove = ()=>{
        window.open("https://www.hufs.ac.kr/hufs/index.do", "_blank"); 
    }

    return (
        <header className="header">
            <div className="header__inner">
                <h1 className="header__logo" onClick={()=>nav("/")}>
                    <img src={logo} alt="LOOPS 로고"/>
                </h1>
                
                <div className="header__search-bar">
                    <input type="text" placeholder="검색어를 입력해주세요."/>
                    <button type="button" className="header__search-btn">
                        <img src={search} alt="검색" className="header__search-icon"/>
                    </button>
                </div>

                <nav className="header__nav">
                    <div className="header__link" onClick={()=>nav("/")}>홈 게시판</div>
                    <div className="header__link" onClick={handleMove}>학교 홈페이지</div>
                    <div className="header__auth-wrapper">
                        <button className="header__btn-login" onClick={()=>nav("/auth")}>
                            <img src={man} alt="프로필 아이콘" className="header__user-icon header__user-icon--bright"></img>
                            로그인 / 회원가입
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header; 