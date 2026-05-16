
const formattedId = (id)=>{
    return String(id).padStart(4, "0"); 
}

const PostItem = ({authorName, ...props})=>{
    const date = new Date(props.createdAt).toLocaleDateString();

    return (
        <tr>
            <td>{formattedId(props.postId)}</td>
            <td className="td-title">{props.title}<span className="reply-badge">{`[${props.commentCount}]`}</span></td>
            <td>{authorName}</td>
            <td>{date}</td>
            <td>{props.viewCount}</td>
            <td>{props.likeCount}</td>
        </tr>
    ); 
}

export default PostItem; 