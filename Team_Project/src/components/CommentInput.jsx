import "./CommentInput.css"; 
import { useContext, useState, useRef } from "react";
import { CommentDataContext, CommentDispatchContext } from "../util/context";

const CommentInput = ({postId, parentId=null, onSuccess=(()=>{})})=>{
    const [comment, setComment] = useState(""); 
    const {onCreateComment} = useContext(CommentDispatchContext); 
    const commentRef = useRef(); 
    const comments = useContext(CommentDataContext); 
    
    const onChangeComment = (e)=>{
        setComment(e.target.value); 
    }

    const handleSubmit = ()=>{
        if(comment.trim()===""){
            commentRef.current.focus(); 
            return; 
        }

        const commentInfo = {
            postId: Number(postId), 
            authorId: 100, //임시데이터 
            content: comment, 
            createdAt: new Date().toISOString(), 
            parentId: parentId, 
            likeCount: 0, 
        }

        onCreateComment(commentInfo); 
        setComment(""); 
        console.log(comments); 
        onSuccess(); 
    }
    

    return (
        <div className="comment-form">
            <div className="comment-form__user-info">
                {/* 추후에 로그인 정보 넣고서 작업할 것이다 */}
                댓글 작성 &nbsp;<strong>통학러123123</strong>
            </div>
            <div className="comment-form__input-wrapper">
                <textarea 
                    placeholder={`${parentId ? "대댓글을 입력해주세요" : "댓글을 입력해주세요"}`} 
                    className="comment-form__textarea"
                    value={comment}
                    onChange={onChangeComment}
                    ref={commentRef}
                    ></textarea>
            </div>

            <div className="comment-form__actions">
                    <button 
                        type="button" 
                        className="comment-form__btn-submit"
                        onClick={handleSubmit}
                    >
                        등록
                    </button>
                </div>
        </div>
    ); 
}

export default CommentInput;