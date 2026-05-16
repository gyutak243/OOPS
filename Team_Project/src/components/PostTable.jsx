import { useContext, useRef } from "react";
import PostItem from "./PostItem";
import { PostDataContext } from "../util/context";

const mockUsers = [
  { 
    id: 999, 
    username: "관리자", 
    email: "admin@oops.com", 
    profile_image: "" 
},

  { 
    id: 104, 
    username: "통학러123", 
    email: "user1@oops.com", 
    profile_image: "" 
},

  { 
    id: 421, 
    username: "돈까스빌런", 
    email: "user2@oops.com", 
    profile_image: "" 
},

  { 
    id: 87, 
    username: "새내기A", 
    email: "user3@oops.com", 
    profile_image: "" 
},

  { 
    id: 512, 
    username: "복학생오빠", 
    email: "user4@oops.com", 
    profile_image: "" 
}, 

];

const PostTable = ({postData})=>{

    return (
        <table className="board-table">
            <thead>
                <tr>
                    <th className="col-num">번호</th>
                    <th className="col-title">제목</th>
                    <th className="col-author">글쓴이</th>
                    <th className="col-date">등록일</th>
                    <th className="col-view">조회수</th>
                    <th className="col-vote">추천</th>
                </tr>
            </thead>
            <tbody>
                {!postData || postData.length ===0 ?(
                    <tr>
                        {/* colSpan={6}으로 헤더 개수만큼 칸을 하나로 병합합니다. */}
                        <td colSpan={6} className="td-empty" style={{ textAlign: "center", padding: "50px 0", color: "#888" }}>
                            등록된 게시글이 없습니다.
                        </td>
                    </tr>
                ) : (postData.map((post)=>{
                    const writerInfo = mockUsers.find((user)=>{
                        return user.id === post.authorId;
                    }); 
                    //writerInfo가 있다면 userName을 사용하고 없다면 회원 탈퇴등을 고려해서 알 수 없음으로 해줌. 
                    const authorName = writerInfo ? writerInfo.username : "알 수 없음"; 
                    return <PostItem key={post.postId} {...post} authorName={authorName}/>
                }))}
            </tbody>
        </table>
    )
}

export default PostTable; 