export type Post = {
  comments: Array<Comment>;
  content: string;
  id: number;
  likes: number;
  title: string;
  userId: number;
  tags: Array<Tag>;
};

export type Tag = {
  id?: number | string;
  tag: string;
};

export type Comment = {
  id: number | string;
  comment: string;
  discussionId: number;
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type State = {
  posts: Array<Post>;
  isPostFormOpen: true | false;
  isLoading: true | false;
  error: string;
  tagsAll: Array<Tag>;
};

export type Action =
  | {
      type: "posts/fetched";
      payload: Array<Post>;
    }
  | {
      type: "posts/formToggle";
    }
  | {
      type: "posts/addPost";
      payload: Post;
    }
  | {
      type: "posts/likes";
      payload: number;
    }
  | {
      type: "posts/edit";
      payload: PostToBeEdited;
    }
  | { type: "posts/loadingToggle" }
  | {
      type: "posts/errorFetch";
      payload: string;
    }
  | {
      type: "posts/comment";
      payload: Comment;
    }
  | { type: "posts/delete"; payload: number };

export type PostToBeEdited = {
  id: number;
  title: string;
  content: string;
};

export type NewPost = {
  id?: string;
  userId: number | undefined;
  title: string;
  content: string;
  likes: number;
  comments: [];
  tags: Array<Tag>;
};

export type PostContextType = State & {
  posts: Array<Post>;
  isPostFormOpen: true | false;
  isLoading: true | false;
  error: string;
  postEdit: (postToBeEdited: PostToBeEdited) => void;
  postCreate: (newPost: NewPost) => void;
  postComment: (newComment: Comment) => void;
  postLike: (id: number) => void;
  postDelete: (id: number) => void;
  dispatch: React.Dispatch<Action>;
  postFormToggle: () => void;
};
