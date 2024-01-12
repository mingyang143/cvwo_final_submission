import PostList from "../Components/PostList";
import FormMakePost from "../Components/FormMakePost";
import Button from "../Components/Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import Spinner from "../Components/Spinner";

function App() {
  const { isPostFormOpen, dispatch, isLoading } = usePosts();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <PostList />
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

export default App;
