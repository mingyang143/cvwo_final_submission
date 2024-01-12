import { useState } from "react";
import Button from "./Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import { useAuth } from "../Contexts/Hooks/authContextHook";

type NewPost = {
  userId: number | undefined;
  title: string;
  content: string;
  likes: number;
  comments: [];
};
export default function FormMakePost() {
  const { postCreate } = usePosts();
  const [postTitle, setpostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { user } = useAuth();
  // const id = crypto.randomUUID();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!postTitle || !postContent) return;
    const newPost: NewPost = {
      // id: 1,
      userId: user?.userId,
      title: postTitle,
      content: postContent,
      likes: 0,
      comments: [],
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
      <Button className="" onClick={() => {}}>
        Start Discussion! 💬
      </Button>
    </form>
  );
}
