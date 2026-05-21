import { useNavigate } from "react-router-dom";

const ActivityItem = ({type, postId ,title, createdAt})=>{
    const nav = useNavigate(); 
    const date = new Date(createdAt).toLocaleDateString(); 

    return (
        <div className="activity-item-row" onClick={()=> nav(`/detail/${postId}`)}>
            <span className="activity-item__title"><a href="#">{title}</a></span>
            <span className="activity-item__date">{date}</span>
        </div>
    ); 
}

export default ActivityItem; 