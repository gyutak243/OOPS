import { useContext, useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import SearchBoardEmpty from "./SearchBoardEmpty";
import { PostDataContext, UserDataContext } from "../util/context";

const SearchBoard = ({ searchVal }) => {
    const posts = useContext(PostDataContext) || []; 
    const users = useContext(UserDataContext) || [];
    
    // 💡 [추가] 현재 몇 페이지를 보고 있는지 관리하는 상태
    const [currentPage, setCurrentPage] = useState(1);
    // 💡 [설정] 한 페이지에 보여줄 게시글 개수
    const POSTS_PER_PAGE = 10;

    const query = searchVal.toLowerCase();  
    const searchedData = posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(query);
        const targetUser = users.find((user) => user.id === post.authorId); 
        const authorName = targetUser ? targetUser.userName.toLowerCase() : ""; 
        const isAuthorMatch = authorName.includes(query); 
        
        return isTitleMatch || isAuthorMatch; 
    }); 

    if (searchedData.length === 0) {
        return <SearchBoardEmpty></SearchBoardEmpty>;
    }
    
    // --- 💡 [페이지네이션 계산 엔진] ---
    // 1. 전체 페이지 수 계산 (예: 13개 글 / 5개씩 = 2.6 -> 올림해서 총 3페이지)
    const totalPages = Math.ceil(searchedData.length / POSTS_PER_PAGE);

    // 2. 현재 페이지에 해당하는 데이터만 slice로 도려내기
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = searchedData.slice(indexOfFirstPost, indexOfLastPost);

    // 3. 페이지 번호 배열 만들기 (예: 총 3페이지면 [1, 2, 3])
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    // ----------------------------------

    return (
        <div className="board-table-wrapper">
            <table className="board-table">
                <thead>
                    <tr>
                        <th style={{ width: "80px" }}>번호</th>
                        <th>제목</th>
                        <th style={{ width: "120px" }}>작성자</th>
                        <th style={{ width: "120px" }}>작성일</th>
                        <th style={{ width: "80px" }}>조회수</th>
                        <th style={{ width: "80px" }}>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 💡 잘라낸 현재 페이지 데이터(currentPosts)만 map으로 돌려줍니다. */}
                    {currentPosts.map((item) => {
                        return <SearchItem key={item.postId} {...item}/>;
                    })}
                </tbody>
            </table>

            {/* 하단 페이지네이션 컨트롤러 */}
            <div className="pagination-box">
                {/*이전 버튼: 1페이지보다 클 때만 작동하게 잠금 */}
                <button 
                    className="p-arrow" 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    이전
                </button>

                <div className="p-numbers">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            // 현재 활성화된 페이지 번호에 'active' 클래스 부여 (CSS 연동용)
                            className={`p-num ${currentPage === number ? "active" : ""}`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                {/* 다음 버튼: 마지막 페이지보다 작을 때만 작동하게 잠금 */}
                <button 
                    className="p-arrow" 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    ); 
};

export default SearchBoard;