import { useState } from "react";
import Button from "./Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";

function EditPost({
  id,
  setIsEditing,
  currTitle,
  currContent,
}: {
  id: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  currTitle: string;
  currContent: string;
}) {
  const [newTitle, setNewTitle] = useState(currTitle);
  const [newContent, setNewContent] = useState(currContent);
  const { postEdit } = usePosts();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postEdit({ id: id, title: newTitle, content: newContent });
    setIsEditing(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      ></input>
      <label>Content of post </label>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      ></input>
      <Button className="" onClick={() => {}}>
        Edit changes!
      </Button>
    </form>
  );
}

export default EditPost;
