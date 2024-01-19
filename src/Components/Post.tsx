import { useState } from "react";
import Button from "./Button";
import FormMakeComment from "./FormMakeComment";
import TextExpander from "./TextExpander";
import LikesCounter from "./LikesCounter";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import EditPost from "./EditPost";
import { Post as PostType } from "../Models/PostModels";
import styles from "./Post.module.css";
type ChildrenProps = {
  postContent: PostType;
};

export default function Post({ postContent }: ChildrenProps) {
  const { postLike, postDelete } = usePosts();
  const { user } = useAuth();
  const { id, title, content, likes, comments, userId } = postContent;

  const [isEditing, setIsEditing] = useState(false);
  //toggle comment view
  function handleSelection() {
    setCommentView((CommentView) => !CommentView);
  }
  //+ 1 like for post
  function handleLikes(id: number) {
    postLike(id);
  }
  //delete post
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
            <label>
              <h3>{title}</h3>
            </label>
            {content.split(" ").length > 30 ? (
              <div>
                <TextExpander
                  collapsedNumWords={30}
                  className={styles.box}
                  buttonColor="#449090"
                >
                  {content}
                </TextExpander>
              </div>
            ) : (
              <div className={styles.box}>
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
