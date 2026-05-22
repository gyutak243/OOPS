import man from "../assets/man.png";
import { useState, useRef, useContext } from "react"; // 💡 useRef 추가
import { UserDataContext, UserDispatchContext } from "../util/context";
import { useParams } from "react-router-dom";

const SettingProfile = () => {
    const users = useContext(UserDataContext); 
    const {onUpdateUserInfo} = useContext(UserDispatchContext); 
    const {userId} = useParams(); 
    const currentUser = users.find((user)=>{
        return user.userName === userId; 
    }); 
    const [profileChange, setProfileChange] = useState(false);
    // 💡 브라우저 화면에 임시로 띄워줄 이미지 주소 상태 (기본값은 man 이미지) 그러나 만약 currentUser의 프로필 이미지가 존재하면 그걸 초기값으로 
    const [previewImg, setPreviewImg] = useState(currentUser?.profileImg || man);
    
    // 💡 실제 파일 인풋창을 가리킬 비밀 힌트(Ref)
    const fileInputRef = useRef(null);
    
    const onClickProfileChange = () => {
        // 토글 버튼을 누르면 상태가 true / false로 바뀝니다.
        setProfileChange(!profileChange); 
    };

    // 💡 사용자가 파일을 실제로 컴퓨터에서 골랐을 때 실행되는 함수
    const onFileChange = (e) => {
        const file = e.target.files[0]; // 유저가 선택한 이미지 파일 하나 꺼내기
        if (file) {
            // 브라우저가 이 파일 데이터를 읽어서 임시 주소(URL)로 만들어주는 자바스크립트 내장 기능
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgResult = reader.result; 
                setPreviewImg(imgResult); // 짠! 임시 주소로 이미지 State 교체 (화면 바뀜)

                if(currentUser){
                    const userInfo = {
                        ...currentUser, 
                        profileImg: imgResult, 
                    }

                    onUpdateUserInfo(userInfo); 
                }
            };
            reader.readAsDataURL(file);
            onClickProfileChange();  
        }
    };

    return (
        <div className="profile-avatar-row">
            <div className="avatar-holder">
                {/* 💡 임시 미리보기 상태인 previewImg를 꽂아줍니다 */}
                <img src={previewImg} alt="사용자 프로필"/>
            </div>
            <div className="avatar-actions">
                <button 
                    type="button" 
                    className={`btn-avatar-upload ${profileChange ? "active" : ""}`} 
                    onClick={onClickProfileChange}
                >
                    {profileChange ? "변경 취소" : "이미지 변경"}
                </button>
                <button type="button" className="btn-avatar-delete" onClick={() => setPreviewImg(man)}>
                    삭제
                </button>
            </div>

            {/* 🎯 profileChange가 true일 때만 인풋 박스가 렌더링됩니다! */}
            {profileChange && (
                <div className="file-input-wrapper">
                    <span className="file-input-help">💡 변경할 프로필 이미지를 컴퓨터에서 선택해주세요.</span>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileChange}
                        className="real-file-input"
                    />
                </div>
            )}
        </div>
    ); 
};

export default SettingProfile;