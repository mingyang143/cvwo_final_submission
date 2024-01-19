import { useState } from "react";
import Button from "./Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import { NewPost } from "../Models/PostModels";
import BackButton from "./BackButton";

export default function FormMakePost() {
  const { postCreate } = usePosts();
  const [postTitle, setpostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [tag, setTag] = useState("");
  const [existingTag, setExistingTag] = useState("");
  const { user } = useAuth();
  const { tagsAll } = usePosts();

  //make Post
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!postTitle || !postContent || (!tag && !existingTag)) {
      alert("Please fill in all 3 fields before submitting");
      return;
    }
    const TEMP_ID = crypto.randomUUID();

    const newPost: NewPost = {
      id: TEMP_ID,
      userId: user?.userId,
      title: postTitle,
      content: postContent,
      likes: 0,
      comments: [],
      tags: tag === "" ? [existingTag] : tag.split(","),
    };

    postCreate(newPost);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a post! 😊</h2>
      <label>Title of post </label>
      <input
        type="text"
        value={postTitle}
        onChange={(e) => setpostTitle(e.target.value)}
      ></input>
      <label>Content of post </label>
      <input
        type="text"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></input>
      <label>
        Create and use new tags (If there are multiple tags, separate them using
        a comma)
      </label>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        disabled={existingTag !== ""}
      ></input>

      {tagsAll.length !== 0 && (
        <>
          <label>Or use an existing tag</label>
          <select
            value={existingTag}
            onChange={(e) => setExistingTag(e.target.value)}
            disabled={tag !== ""}
          >
            <option value=""></option>
            {tagsAll.map((tag) => (
              <option>{tag}</option>
            ))}
          </select>
        </>
      )}

      <BackButton />
      <Button
        className=""
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e;
        }}
      >
        Start Discussion! 💬
      </Button>
    </form>
  );
}
