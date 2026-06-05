import "./SideBarWidget.css"; 
import { useContext } from "react";
import { PostDataContext } from "../util/context";
import SideBarItem from "./SideBarItem";

const SideBarWidget = ({type})=>{
    //type은 free, notification, 혹은 hot(인기)이다

    const posts = useContext(PostDataContext);

    const filteredData = type === "hot"
        ? posts.filter((post) => post.likeCount >= 10 || post.commentCount >= 10)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : posts.filter((post) => post.category === type);

    const dataList = filteredData.slice(0,5);

    return (
        <ul className="sidebar-widget__list">
            {dataList.map((item)=>{
                return <SideBarItem key={item.postId} {...item}/>
            })}
        </ul>
    ); 
}

export default SideBarWidget; 