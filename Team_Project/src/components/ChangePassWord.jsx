import { useContext, useState, useRef } from "react";
import "./ChangePassWord.css"; 
import { UserDataContext, UserDispatchContext } from "../util/context";

const ChangePassWord = ({ setView }) => {
    const users = useContext(UserDataContext); 
    const {onUpdateUserInfo} = useContext(UserDispatchContext); 
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
     const [userInfo, setUserInfo] = useState({
        userName: "", 
        passWord: ""
    });
    const idRef = useRef(); 
    const pwdRef = useRef(); 
    const confirmRef = useRef(); 

    const onChangeUserInfo = (e)=>{
        const {name, value} = e.target; 

        setUserInfo({
            ...userInfo, 
            [name]: value, 
        }); 
    }
    

    const handleResetPassword = (e) => {
        e.preventDefault();

        //폼이 작성되지 않았을시에 포커싱 적용
        if(userInfo.userName.trim()===""){
            idRef.current.focus(); 
            return; 
        }

        else if(userInfo.passWord.trim()===""){
            pwdRef.current.focus(); 
            return; 
        }

        else if(confirmPassword.trim()===""){
            confirmRef.current.focus(); 
            return; 
        }

        // 비밀번호를 변경하고자 하는 아이디가 존재하지 않을시에 
        const currentUserInfo = users.find((user)=> user.userName === userInfo.userName); 

        //내가 작성한 아이디가 존재하지 않는 아이디라면 애러메시지를 띠우고 회원 가입 페이지로 이동한다. 
        if(!currentUserInfo){
            setErrorMsg("존재하지 않는 아이디입니다. 회원가입 후에 이용해주세요"); 
            setUserInfo({
                ...userInfo, 
                userName: ""
            }); 
            return; 
        }

        //적용한 비밀번호가 확인용 비밀번호와 일치하지 않을때에
        if (userInfo.passWord === confirmPassword) {
            onUpdateUserInfo(currentUserInfo.id, userInfo.userName, currentUserInfo.email, userInfo.passWord); 
            setUserInfo({
                userName: "", 
                passWord: "", 
            }); 
            setErrorMsg(""); 
            //비밀번호 변경후에 로그인 화면으로 이동
            console.log(users); 
            setView("login"); 
        }

        else{
            setErrorMsg("⚠️ 새 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
            return;
        }
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
                    <input 
                        type="text"
                        name="userName" 
                        className="form-input" 
                        placeholder="아이디를 입력하세요." 
                        value={userInfo.userName}
                        onChange={onChangeUserInfo}
                        ref={idRef}
                        required />
                </div>

                <div className="input-field-group">
                    <label className="input-label">새 비밀번호 입력</label>
                    <input 
                        type="password"
                        name="passWord" 
                        className="form-input" 
                        placeholder="새 비밀번호를 입력하세요." 
                        value={userInfo.passWord}
                        onChange={onChangeUserInfo}
                        ref={pwdRef}
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
                        ref={confirmRef}
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