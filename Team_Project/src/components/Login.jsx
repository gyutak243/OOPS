import { useContext } from "react";
import "./Login.css"; 
import { CommentDataContext, CommentDispatchContext } from "../util/context";

const Login = ({ setView }) => {

    const handleLoginSubmit = (e) => {
        e.preventDefault();

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
                    <input type="text" className="form-input" placeholder="아이디를 입력하세요." required />
                </div>

                <div className="input-field-group">
                    <label className="input-label">비밀번호</label>
                    <input type="password" className="form-input" placeholder="비밀번호를 입력하세요." required />
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