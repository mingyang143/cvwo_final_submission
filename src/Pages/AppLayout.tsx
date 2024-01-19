import PostList from "../Components/PostList";
import FormMakePost from "../Components/FormMakePost";
import Button from "../Components/Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import Spinner from "../Components/Spinner";
import TagSelection from "../Components/TagSelection";
import { useState } from "react";
import Search from "../Components/Search";
import { useAuth } from "../Contexts/Hooks/authContextHook";

function AppLayout() {
  const { isPostFormOpen, dispatch, isLoading, tagsAll } = usePosts();
  const { isLoginLoading } = useAuth();
  const [currTag, setCurrTag] = useState("All Posts");
  const [query, setQuery] = useState("");
  if (isLoading || isLoginLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section>
        <Search query={query} setQuery={setQuery} />
        {tagsAll.length !== 0 && (
          <TagSelection currTag={currTag} onSetCurrTag={setCurrTag} />
        )}
        <PostList currTag={currTag} query={query} onSetCurrTag={setCurrTag} />
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
    </>
  );
}

export default AppLayout;
