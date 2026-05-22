import "./MyPage.css"; 
import { useContext, useState, useRef } from "react"; 
import { PostDataContext, UserDataContext, UserDispatchContext } from "../util/context";
import { useNavigate, useParams } from "react-router-dom";
import Activity from "./Activity";
import SettingProfile from "./SettingProfile";

const MyPage = () => {
    const posts = useContext(PostDataContext); 
    const users = useContext(UserDataContext); 
    const { onUpdateUserInfo, onDeleteUserInfo } = useContext(UserDispatchContext); 
    
    const [myCurrentPwd, setMyCurrentPwd] = useState(""); 
    const [myNewPwd, setMyNewPwd] = useState(""); 
    const [confirmPwd, setConfirmPwd] = useState(""); 
    const currentPwdRef = useRef(); 
    const newPwdRef = useRef(); 
    const confirmRef = useRef(); 
    
    const [changeUserName, setChangeUserName] = useState(""); 
    const { userId } = useParams(); 
    
    const [msg, setMsg] = useState(""); 
    const [pwdMsg, setPwdMsg] = useState(""); 
    const nav = useNavigate(); 
    const idRef = useRef(); 

    const currentUserData = users.find((user) => user.userName === userId); 

    const onChangeUserName = (e) => {
        setChangeUserName(e.target.value); 
        setMsg(""); 
    }

    const identifyDuplicated = () => {
        if (changeUserName.trim() === "") {
            idRef.current.focus(); 
            return; 
        }

        // 💡 본인의 현재 닉네임과 똑같이 입력했을 때는 중복 검사를 패스해주는 센스!
        if (changeUserName === currentUserData?.userName) {
            setMsg("현재 사용 중인 닉네임입니다.");
            return;
        }

        const duplicatedName = users.find((user) => user.userName === changeUserName); 

        if (duplicatedName) {
            setMsg("중복된 아이디가 존재합니다!"); 
        } else {
            setMsg("사용 가능한 아이디입니다."); 
        }
    }

    const onChangeCurrentPwd = (e) => {
        setMyCurrentPwd(e.target.value); 
        setPwdMsg(""); 
    }
    
    const onChangeNewPwd = (e) => {
        setMyNewPwd(e.target.value); 
    }

    const onChangeConfirm = (e) => {
        setConfirmPwd(e.target.value); 
    }

    const handleLogout = () => {
        localStorage.removeItem("currentLoginUser"); 
        window.alert("성공적으로 로그아웃 되었습니다."); 
        nav("/"); 
    };

    const clearAll = () => {
        setChangeUserName("");
        setMsg("");  
        setMyCurrentPwd(""); 
        setMyNewPwd(""); 
        setConfirmPwd(""); 
        setPwdMsg("");
    }

    const changeSetting = () => {
        if (!currentUserData) return;

        // 1. 변경할 정보가 아예 없을 때 예외 처리
        if (changeUserName.trim() === "" && myCurrentPwd.trim() === "" && myNewPwd.trim() === "" && confirmPwd.trim() === "") {
            window.alert("변경할 내용을 입력해 주세요.");
            return;
        }

        let updatedPassword = currentUserData.passWord;

        //비밀번호 데이터 세개중에 하나라도 있을때에 없는 데이터는 포커싱 
        if (myCurrentPwd || myNewPwd || confirmPwd) {
            if (myCurrentPwd.trim() === "") {
                currentPwdRef.current.focus(); 
                setPwdMsg("현재 비밀번호를 입력해 주세요.");
                return; 
            }
            //현재 비밀번호가 일치하지 않으면 메시지를 보냄 
            if (myCurrentPwd !== currentUserData.passWord) {
                currentPwdRef.current.focus();
                setPwdMsg("현재 비밀번호가 일치하지 않습니다."); 
                return; 
            }
            if (myNewPwd.trim() === "") {
                newPwdRef.current.focus(); 
                setPwdMsg("새 비밀번호를 입력해 주세요.");
                return; 
            }
            if (confirmPwd.trim() === "") {
                confirmRef.current.focus(); 
                setPwdMsg("새 비밀번호 확인을 입력해 주세요.");
                return; 
            }

            //새로운 비밀번호와 확인 비밀번호가 일치하지 않을때
            if (myNewPwd !== confirmPwd) {
                confirmRef.current.focus();
                setPwdMsg("새 비밀번호가 일치하지 않습니다."); 
                return; 
            }
            // 모든 관문을 넘었다면 변경할 패스워드 세팅
            updatedPassword = myNewPwd;
        }

        // 3. 데이터 패키징 및 전송
        const userInfo = {
            ...currentUserData,
            userName: changeUserName.trim() !== "" ? changeUserName : currentUserData.userName,
            passWord: updatedPassword,  
        }

        onUpdateUserInfo(userInfo);
        window.alert("변경사항이 저장되었습니다."); 

        //로컬에 변경사항을 반영해줘야한다. 
        localStorage.setItem("currentLoginUser", JSON.stringify({userName : userInfo.userName ,passWord:userInfo.passWord })); 
        
        // 만약 닉네임(userName)이 바뀌었다면 URL 파라미터가 유효하지 않게 되므로 바뀐 주소로 새로 리다이렉트 시켜줍니다.
        if (changeUserName.trim() !== "") {
            nav(`/mypage/${changeUserName}`, { replace: true });
        }
        
        //변경이 끝나면 칸을 비워준다. 
        clearAll(); 
    }

    //회원 탈퇴 로직이다. 
    const deleteAccount = ()=>{
        if(window.confirm("정말로 회원 탈퇴를 진행하시겠습니까? 지워진 계정은 복구되지 않습니다.")){
            onDeleteUserInfo(currentUserData.id); 
            localStorage.removeItem("currentLoginUser"); 
            nav("/"); 
        }
    }

    return (
        <div className="main-layout main-layout--center">
            <div className="board-header-row max-width-wrapper">
                <div className="board-header-row__left">
                    <h2 className="board-main-title">마이페이지 / 설정</h2>
                    <p className="search-summary">개인 프로필 및 계정 비밀번호 설정을 관리합니다.</p>
                </div>
            </div>

            <main className="content-area max-width-wrapper">
                <div className="settings-card">
                    
                    {/* 프로필 설정 그룹 */}
                    <section className="settings-group">
                        <h3 className="settings-group__title">프로필 설정</h3>
                        
                        <SettingProfile></SettingProfile>

                        <div className="input-field-group">
                            <label className="input-label">닉네임 변경</label>
                            <div className="input-with-btn">
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={changeUserName}
                                    onChange={onChangeUserName}
                                    placeholder="변경할 닉네임을 입력하세요."
                                    ref={idRef}
                                />
                                <button type="button" className="btn-inline-action" onClick={identifyDuplicated}>중복 확인</button>
                            </div>
                            {msg && <p className="msg">{msg}</p>}
                        </div>
                    </section>

                    {/* 슬라이딩 및 세로 스크롤 리스트 영역 컴포넌트 */}
                    <Activity />

                    {/* 보안 설정 그룹 */}
                    <section className="settings-group">
                        <h3 className="settings-group__title">보안 설정</h3>
                        
                        <div className="input-field-group">
                            <label className="input-label">비밀번호 변경</label>
                            <div className="password-change-box">
                                <input 
                                    value={myCurrentPwd}
                                    onChange={onChangeCurrentPwd}
                                    type="password" 
                                    className="form-input" 
                                    placeholder="현재 비밀번호"
                                    ref={currentPwdRef}
                                />
                                <input 
                                    value={myNewPwd}
                                    onChange={onChangeNewPwd}
                                    type="password" 
                                    className="form-input" 
                                    placeholder="새 비밀번호"
                                    ref={newPwdRef}
                                />
                                <input 
                                    value={confirmPwd}
                                    onChange={onChangeConfirm}
                                    type="password" 
                                    className="form-input" 
                                    placeholder="새 비밀번호 확인"
                                    ref={confirmRef}
                                />
                                {pwdMsg && <p className="msg" style={{color: '#e03e2d', fontSize: '13px', marginTop: '4px'}}>{pwdMsg}</p>}
                            </div>
                        </div>
                    </section>

                    {/* 하단 푸터 버튼 레벨 */}
                    <div className="settings-footer-row">
                        <div className="settings-footer-row__left" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                            <div className="btn-delete-account" style={{ cursor: "pointer" }} onClick={deleteAccount}>회원 탈퇴</div>
                            <span>|</span>
                            <button 
                                type="button" 
                                className="btn-logout" 
                                onClick={handleLogout}
                                style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}
                            >
                                로그아웃
                            </button>
                        </div>
                        <div className="settings-footer-row__right">
                            <button type="button" className="btn-settings-cancel" onClick={clearAll}>취소</button>
                            <button type="submit" className="btn-settings-save" onClick={changeSetting}>변경사항 저장</button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    ); 
}

export default MyPage;