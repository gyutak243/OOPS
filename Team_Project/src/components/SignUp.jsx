import { useState } from "react";
import "./SignUp.css"; 

const SignUp = ({ setView }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // 💡 비밀번호 검증 로직
        if (password !== confirmPassword) {
            setErrorMsg("⚠️ 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
            return;
        }

        setErrorMsg("");
        alert('회원가입이 완료되었습니다!');
        setView("login"); // 성공 시 로그인 화면으로 전환
    };

    return (
        <div className="auth-card">
            <div className="auth-card__header">
                <h2 className="auth-title">회원 가입</h2>
                <p className="auth-subtitle">정보를 입력하고 회원가입을 완료하세요.</p>
            </div>

            <form className="auth-form" onSubmit={handleRegister}>
                <div className="input-field-group">
                    <label className="input-label">아이디</label>
                    <input type="text" className="form-input" placeholder="사용할 아이디를 입력하세요." required />
                </div>

                <div className="input-field-group">
                    <label className="input-label">비밀번호</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="비밀번호를 입력하세요." 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>

                <div className="input-field-group">
                    <label className="input-label">비밀번호 확인</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="비밀번호를 한 번 더 입력하세요." 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                    {/* 💡 errorMsg 상태가 있을 때만 에러 텍스트 태그가 출력되도록 리액트 조건부 렌더링 적용 */}
                    {errorMsg && <p className="error-text">{errorMsg}</p>}
                </div>

                <button type="submit" className="btn-auth-primary">회원 가입 완료</button>
            </form>

            <div className="auth-links-row">
                <p className="auth-info-text">이미 계정이 있으신가요?</p>
                <span className="auth-link-item auth-link-item--accent" onClick={() => setView("login")} style={{ cursor: "pointer" }}>
                    로그인하러 가기
                </span>
            </div>
        </div>
    );
};

export default SignUp;