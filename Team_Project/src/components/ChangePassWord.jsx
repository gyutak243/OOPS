import { useState } from "react";
import "./ChangePassWord.css"; 

const ChangePassWord = ({ setView }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMsg("⚠️ 새 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
            return;
        }

        setErrorMsg("");
        alert('비밀번호가 성공적으로 변경되었습니다!');
        setView("login");
    };

    return (
        <div className="auth-card">
            <div className="auth-card__header">
                <h2 className="auth-title">비밀번호 변경</h2>
                <p className="auth-subtitle">비밀번호를 재설정할 아이디와 새 비밀번호를 입력해 주세요.</p>
            </div>

            <form className="auth-form" onSubmit={handleResetPassword}>
                <div className="input-field-group">
                    <label className="input-label">아이디</label>
                    <input type="text" className="form-input" placeholder="아이디를 입력하세요." required />
                </div>

                <div className="input-field-group">
                    <label className="input-label">새 비밀번호 입력</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="새 비밀번호를 입력하세요." 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>

                <div className="input-field-group">
                    <label className="input-label">새 비밀번호 확인</label>
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="새 비밀번호를 다시 입력하세요." 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                    {errorMsg && <p className="error-text">{errorMsg}</p>}
                </div>

                <button type="submit" className="btn-auth-primary">비밀번호 변경 완료</button>
            </form>

            <div className="auth-links-row">
                <span className="auth-link-item" onClick={() => setView("login")} style={{ cursor: "pointer" }}>
                    이전 로그인 화면으로
                </span>
            </div>
        </div>
    );
};

export default ChangePassWord;