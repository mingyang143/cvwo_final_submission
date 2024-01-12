import Post from "./Post";
import { usePosts } from "../Contexts/Hooks/postContextHook";
export default function PostList() {
  const { posts } = usePosts();
  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <Post postContent={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
