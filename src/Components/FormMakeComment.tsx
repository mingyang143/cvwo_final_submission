import { useState } from "react";
import Button from "./Button";
import Comment from "./Comment";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import { Comment as CommentType } from "../Models/PostModels";

export default function FormMakeComment({
  comments,
  id,
}: {
  comments: Array<CommentType>;
  id: number;
}) {
  const TEMP_ID = window.crypto.randomUUID();
  const { postComment } = usePosts();
  //Make NewComment
  function handleMakeComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!comment) {
      return;
    }
    postComment({ id: TEMP_ID, comment, discussionId: id });

    setComment("");
  }
  const [comment, setComment] = useState("");
  return (
    <div>
      COMMENTS ({comments === null ? 0 : comments.length})
      {comments?.map((comment: CommentType) => (
        <Comment key={comment.id}>{comment.comment}</Comment>
      ))}
      <form onSubmit={(e) => handleMakeComment(e)}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <Button
          className=""
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e;
          }}
        >
          Add comment
        </Button>
      </form>
    </div>
  );
}
