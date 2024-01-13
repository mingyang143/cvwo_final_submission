import PostList from "../Components/PostList";
import FormMakePost from "../Components/FormMakePost";
import Button from "../Components/Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import Spinner from "../Components/Spinner";
import TagSelection from "../Components/TagSelection";
import { useState } from "react";

function AppLayout() {
  const { isPostFormOpen, dispatch, isLoading } = usePosts();
  const [currTag, setCurrTag] = useState("All Posts");
  const { tagsAll } = usePosts();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      {tagsAll.length !== 0 && (
        <TagSelection currTag={currTag} onSetCurrTag={setCurrTag} />
      )}
      <PostList currTag={currTag} />
      {isPostFormOpen && <FormMakePost />}
      {!isPostFormOpen && (
        <Button
          className=""
          onClick={() => dispatch({ type: "posts/formToggle" })}
        >
          Create Post 🗣️
        </Button>
      )}
    </section>
  );
}

export default AppLayout;
