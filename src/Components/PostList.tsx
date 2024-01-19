import Post from "./Post";
import { usePosts } from "../Contexts/Hooks/postContextHook";
import { Post as PostType } from "../Models/PostModels";
type ChildrenProps = {
  currTag: string;
  query: string;
  onSetCurrTag: React.Dispatch<React.SetStateAction<string>>;
};
export default function PostList({
  currTag,
  query,
  onSetCurrTag,
}: ChildrenProps) {
  const { posts } = usePosts();
  //search bar filter
  function filterByTitleAndContent(posts: Array<PostType>): Array<PostType> {
    return posts?.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    );
  }
  //tag filter
  function filterByTags(posts: Array<PostType>): Array<PostType> {
    return posts?.filter((post) =>
      post.tags.reduce((acc, curr) => currTag === curr.tag || acc, false)
    );
  }

  return (
    <div>
      <ul>
        {query !== ""
          ? filterByTitleAndContent(posts).map((post) => (
              <Post
                postContent={post}
                key={post.id}
                onSetCurrTag={onSetCurrTag}
              />
            ))
          : currTag === "All Posts"
          ? posts.map((post) => (
              <Post
                postContent={post}
                key={post.id}
                onSetCurrTag={onSetCurrTag}
              />
            ))
          : filterByTags(posts).map((post) => (
              <Post
                postContent={post}
                key={post.id}
                onSetCurrTag={onSetCurrTag}
              />
            ))}
      </ul>
    </div>
  );
}
