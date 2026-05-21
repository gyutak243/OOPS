import { useContext } from "react";
import { PostDataContext, UserDataContext } from "../util/context";

const SearchTitle = ({searchVal})=>{
    const posts = useContext(PostDataContext) || []; 
    const users = useContext(UserDataContext) || []; 

    const query = searchVal.toLowerCase(); 
    const searchedData = posts.filter((post)=>{
        const isTitleMatch = post.title.toLowerCase().includes(query);
      
        //유저 데이터를 뒤져서 유저이름을 가져옴 
        const targetUser = users.find((user)=> user.id === post.authorId); 
        const authorName = targetUser ? targetUser.userName.toLowerCase() : ""; 
        const isAuthorMatch = authorName.includes(query); 
        
        //제목이나 글쓴이 중 하나라도 매칭되면 필터를 통과하게 설계했다. 
        return isTitleMatch || isAuthorMatch; 
    }); 

    return (
        <div className="board-header-row">
            <div className="board-header-row__left">
                <h2 className="board-main-title">검색 결과</h2>
                <p className="search-summary">'<span className="search-keyword">{searchVal}</span>'에 대한 검색 결과가 총 <span className="search-count">{searchedData.length}</span>건 있습니다.</p>
            </div>
        </div>
    ); 
}

export default SearchTitle; 