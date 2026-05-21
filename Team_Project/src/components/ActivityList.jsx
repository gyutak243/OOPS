import { useContext } from "react";
import ActivityItem from "./ActivityItem"; 
import { CommentDataContext, PostDataContext, UserDataContext } from "../util/context";
import { useParams } from "react-router-dom";

const ActivityList = ({type})=>{
    const {userId} = useParams(); 
    const posts = useContext(PostDataContext); 
    const users = useContext(UserDataContext); 
    const comments = useContext(CommentDataContext); 
    const currentUser = users.find((user)=>{
       return user.userName === userId; 
    }); 
    let myActivity = []; 

    if(currentUser){
        if(type==="post"){
            myActivity = posts.filter((post)=>{
                return post.authorId === currentUser.id; 
        }); 
        }

        else if(type==="comment"){
            myActivity = comments.filter((comment)=>{
                return comment.authorId === currentUser.id; 
            }); 
        }
    }
    

    return (
        <div className="activity-list">
            {myActivity.length ===0 ? (
                <p style={{padding: "20px", color: "#888", textAlign: "center"}}>아직 관련 글이 존재하지 않습니다..</p>
            ) : (
                myActivity.map((item, idx)=>{
                    return <ActivityItem key={idx} type={type} title={item.title || item.content} createdAt={item.createdAt} postId={item.postId}></ActivityItem>
                })
            )}
                
                
            </div>
    );  
}

export default ActivityList; 