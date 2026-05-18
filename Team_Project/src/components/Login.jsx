import { useContext, useState, useRef } from "react";
import "./Login.css"; 
import { CommentDataContext, CommentDispatchContext, UserDataContext } from "../util/context";
import { useNavigate } from "react-router-dom";


const Login = ({ setView }) => {
    const users = useContext(UserDataContext); 
    const [loginInfo, setLoginInfo] = useState({
        userName: "", 
        passWord: "", 
    }); 
    const idRef = useRef(); 
    const pwdRef = useRef(); 
    const nav = useNavigate(); 

    const onChangeLoginInfo = (e)=>{
        const {name, value} = e.target; 

        setLoginInfo({
            ...loginInfo, 
            [name]: value,
        }); 
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if(loginInfo.userName.trim()===""){
            idRef.current.focus(); 
            return; 
        }

        else if(loginInfo.passWord.trim()===""){
            pwdRef.current.focus(); 
            return; 
        }

        const loginData = users.find((user)=> (user.userName === loginInfo.userName && user.passWord === loginInfo.passWord)); 

        if(!loginData){
            window.alert("아이디와 비밀번호를 확인하세요"); 
            return; 
        }

        //로그인 후에 로컬에다가 임시로 현재 로그인 중인 유저를 저장해놓겠다. 
        localStorage.setItem("currentLoginUser", JSON.stringify(loginInfo)); 
        setLoginInfo({
            userName: "", 
            passWord: "", 
        }); 
        //로그인 직후에 홈페이지로 돌아간다. 
        nav("/"); 
        console.log("로그인 시도");
    };

    return (
        <div className="auth-card">
            <div className="auth-card__header">
                <h2 className="auth-title">로그인</h2>
                <p className="auth-subtitle">LOOPS 계정으로 로그인해 주세요.</p>
            </div>

            <form className="auth-form" onSubmit={handleLoginSubmit}>
                <div className="input-field-group">
                    <label className="input-label">아이디</label>
                    <input 
                        name="userName"
                        value={loginInfo.userName}
                        onChange={onChangeLoginInfo}
                        type="text" 
                        className="form-input" 
                        placeholder="아이디를 입력하세요." 
                        ref={idRef}
                        required />
                </div>

                <div className="input-field-group">
                    <label className="input-label">비밀번호</label>
                    <input 
                        name="passWord"
                        type="password"
                        value={loginInfo.passWord}
                        onChange={onChangeLoginInfo} 
                        className="form-input" 
                        placeholder="비밀번호를 입력하세요." 
                        ref={pwdRef}
                        required />
                </div>

                <button type="submit" className="btn-auth-primary">로그인</button>
            </form>

            <div className="auth-links-row">
                <span className="auth-link-item" onClick={() => setView("register")} style={{ cursor: "pointer" }}>
                    회원 가입
                </span>
                <span className="auth-link-divider">|</span>
                <span className="auth-link-item" onClick={() => setView("revise-pw")} style={{ cursor: "pointer" }}>
                    비밀번호 변경하기
                </span>
            </div>
        </div>
    );
};

export default Login;