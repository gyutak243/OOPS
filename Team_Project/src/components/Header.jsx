import './Header.css'; 
import logo from "../assets/main Logo.png";
import man from "../assets/man.png"; 
import searchLogo from "../assets/search.png"; 
import { useNavigate} from 'react-router-dom';
import { useState, useRef} from 'react';


const Header = ({onSearch})=>{
    const nav = useNavigate(); 
    //학교 홈페이지로 갈 수 있게 해줬다. 
    const [search, setSearch] = useState(""); 
    const searchRef = useRef(); 
    const handleMove = ()=>{
        window.open("https://www.hufs.ac.kr/hufs/index.do", "_blank"); 
    }

    const onChangeSearch = (e)=>{
        setSearch(e.target.value);
    }

    //Enter를 눌르면 검색이 되는 기능을 추가했다.
    const onKeyDownEnter = (e)=>{
        if(e.key==="Enter"){
            onSearchData(); 
        }
    }

    const onSearchData = ()=>{
        if(search.trim()===""){
            searchRef.current.focus(); 
            return; 
        }

        onSearch(search); 
        nav(`/search/${search}`); 
    }

    // x표시를 눌르면 검색어가 지워지고 홈화면으로 돌아가게 했다.  
    const onClearSearch = ()=>{
        setSearch(""); 
        nav("/"); 
        return; 
    }

    return (
        <header className="header">
            <div className="header__inner">
                <h1 className="header__logo" onClick={()=>nav("/")}>
                    <img src={logo} alt="LOOPS 로고"/>
                </h1>
                
                <div className="header__search-bar">
                    <input 
                        type="text" 
                        placeholder="검색어를 입력해주세요."
                        value={search}
                        onChange={onChangeSearch}
                        onKeyDown={onKeyDownEnter}
                        ref={searchRef}
                        />

                    {/* 조건부 랜더링을 이용해서 검색어를 입력하면 x자가 나타나게끔 해줬다 */}
                    {search.length > 0 && (
                        <button 
                            type="button" 
                            className="header__clear-btn" 
                            onClick={onClearSearch}
                        >
                            &times; 
                        </button>
                    )}    
                    <button type="button" className="header__search-btn" onClick={onSearchData}>
                        <img src={searchLogo} alt="검색" className="header__search-icon"/>
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

/*
배운점

1. 컴포넌트가 서로 분리돼 있을때 그것들을 연결할 수 있는 방법은 바로 URL을 이용하는 것이다. 
현재 searchBar가 헤더에 위치하고 검색결과 페이지는 라우터 안에 위치한다. 이것을 연결해주기 위해서 react-router-dom을 이용해주겠다. 

*/