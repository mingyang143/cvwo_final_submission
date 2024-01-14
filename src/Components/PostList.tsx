import Post from "./Post";
import { usePosts } from "../Contexts/Hooks/postContextHook";
type ChildrenProps = {
  currTag: string;
  query: string;
};
export default function PostList({ currTag, query }: ChildrenProps) {
  const { posts } = usePosts();

  return (
    <div>
      <ul>
        {query !== ""
          ? posts
              ?.filter(
                (post) =>
                  post.title.toLowerCase().includes(query.toLowerCase()) ||
                  post.content.toLowerCase().includes(query.toLowerCase())
              )
              .map((post) => <Post postContent={post} key={post.id} />)
          : currTag === "All Posts"
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
