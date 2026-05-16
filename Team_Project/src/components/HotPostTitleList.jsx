import { useContext } from "react";
import { PostDataContext } from "../util/context";

const HotPostTitleList = ()=>{
    const posts = useContext(PostDataContext); 
    //리스트에서 좋아요 갯수가 10개 이상인 또는 댓글 수가 10개 이상인 것만 필터링 
    const hotPosts = posts.filter((item)=> (item.likeCount >= 10 || item.commentCount >= 10)); 
    //리스트에서 최대 4개의 최신(최상단)글만 보일 수 있도록 해주었다. 
    const postList = hotPosts.slice(0, 4); 
    console.log(postList); 

    return (
        <ul className="post-list">
            {postList.map((item)=>{
                return <li key={item.postId}>{item.title} {`[${item.commentCount}]`}</li>
            })}
        </ul>
    ); 
}

export default HotPostTitleList;
