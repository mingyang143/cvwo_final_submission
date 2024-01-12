import { useState } from "react";
import Button from "./Button";
import FormMakeComment from "./FormMakeComment";
import TextExpander from "./TextExpander";
import LikesCounter from "./LikesCounter";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import EditPost from "./EditPost";
import { Post as PostType } from "../Models/PostModels";

type ChildrenProps = {
  postContent: PostType;
};

export default function Post({ postContent }: ChildrenProps) {
  const { postLike, postDelete } = usePosts();
  const { user } = useAuth();
  const { id, title, content, likes, comments, userId } = postContent;

  const [isEditing, setIsEditing] = useState(false);

  function handleSelection() {
    setCommentView((CommentView) => !CommentView);
  }
  function handleLikes(id: number) {
    postLike(id);
  }

  function handleDelete(id: number) {
    postDelete(id);
  }

  const [CommentView, setCommentView] = useState(false);

  return (
    <>
      <li>
        {userId === user?.userId && isEditing ? (
          <EditPost
            setIsEditing={setIsEditing}
            id={id}
            currTitle={title}
            currContent={content}
          />
        ) : (
          <>
            <label>{title}</label>
            {content.split(" ").length > 30 ? (
              <div>
                <TextExpander
                  expandButtonText={""}
                  collapsedNumWords={30}
                  className="box"
                >
                  {content}
                </TextExpander>
              </div>
            ) : (
              <div className="box">
                <p>{content}</p>
              </div>
            )}
          </>
        )}
        {userId === user?.userId && !isEditing && (
          <Button className="clear" onClick={() => setIsEditing(true)}>
            Edit Post
          </Button>
        )}
        {userId === user?.userId && (
          <Button onClick={() => handleDelete(id)} className="clear">
            Delete post ❌
          </Button>
        )}

        <LikesCounter likes={likes} onUpdateLikes={() => handleLikes(id)} />

        {
          <Button className="" onClick={handleSelection}>
            {CommentView ? "Close comments ❌" : "Comment now!"}
          </Button>
        }
      </li>
      {CommentView && <FormMakeComment comments={comments} id={id} />}
    </>
  );
}
