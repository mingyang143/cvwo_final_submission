import Post from "./Post";
import { usePosts } from "../Contexts/Hooks/postContextHook";
type ChildrenProps = {
  currTag: string;
};
export default function PostList({ currTag }: ChildrenProps) {
  const { posts } = usePosts();
  return (
    <div>
      <ul>
        {currTag === "All Posts"
          ? posts.map((post) => <Post postContent={post} key={post.id} />)
          : posts
              ?.filter((post) =>
                post.tags.reduce((acc, curr) => currTag === curr || acc, false)
              )
              .map((post) => <Post postContent={post} key={post.id} />)}
      </ul>
    </div>
  );
}
