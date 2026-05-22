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
                setPreviewImg(imgResult); //프로필 스테이트 변경

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

/*

배운점 

1. const reader = new FileReader(); => 컴퓨터에 있는 파일을 읽을때 쓰는 객체 
2. reader.onloadend = () => { ... }; => 파일을 다 읽었으면 어떤 로직을 실행해야하는지 
3. const imgResult = reader.result; => 다 읽은 결과물을 저장 
4. const imgResult = reader.result; => 여기에는 이미지 파일을 읽은 결과물이 들어간다. 이 변수안에는 이미지 파일이 엄청 긴 문자열 형태로 들어있다. 
5. reader.readAsDataURL(file);

6. 

<input 
    type="file" 
    accept="image/*" 
    onChange={onFileChange}
    className="real-file-input"
/>

타입은 file이고 
accept는 어떤 종류의 파일만 받을 것인지를 정해주는 속성이다. image/*이면 이미지 파일(png, jpg, jpeg, gif, webp 등)만 받겠다는 것이다. 
이것은 완벽하지 않다 악의적인 유저가 개발자도구를 켜서 파일 종류를 바꿔버릴 수도 있기 때문이다. 그래서 백연동시에 이게 이미지 파일인지 확인하는 작업을 한번 더 해줘야 한다. 
*/