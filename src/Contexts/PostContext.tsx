import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAuth } from "./Hooks/authContextHook";
import {
  Comment,
  ChildrenProps,
  State,
  Action,
  PostToBeEdited,
  NewPost,
  PostContextType,
  Post,
  Tag,
} from "../Models/PostModels";

const initialState = {
  posts: [],
  isPostFormOpen: false,
  isLoading: false,
  error: "",
  tagsAll: [],
};

const PostContext = createContext<PostContextType>({
  ...initialState,
  postEdit: () => {},
  postCreate: () => {},
  postComment: () => {},
  postLike: () => {},
  postDelete: () => {},
  dispatch: () => {},
  postFormToggle: () => {},
});
function toFindDuplicates(arr: Array<Tag>) {
  return arr.filter(
    (item: Tag, index: number) =>
      index ===
      arr.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item))
  );
}
function reducer(state: State, action: Action): State {
  //compute all tags without duplicates
  function getTagsAll(posts: Array<Post>) {
    return toFindDuplicates(
      posts.reduce(
        (acc: Array<Tag>, currPost) => acc.concat(currPost?.tags),
        []
      )
    );
  }
  // function clearTagsUponDeletePost(id: number) {
  //   const tagsToBeRemoved = state.posts.filter((post) => post.id === id)[0]
  //     .tags;
  //   return state.tagsAll.filter((tag) => {
  //     return !tagsToBeRemoved.includes(tag);
  //   });
  // }

  switch (action.type) {
    case "posts/fetched":
      return {
        ...state,
        posts: action.payload,
        tagsAll: getTagsAll(action.payload),
      };
    case "posts/formToggle":
      return { ...state, isPostFormOpen: !state.isPostFormOpen };
    case "posts/addPost":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        isPostFormOpen: false,
        tagsAll: toFindDuplicates([...state.tagsAll, ...action.payload.tags]),
      };
    case "posts/likes":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
        ),
      };
    case "posts/edit":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                title: action.payload.title,
                content: action.payload.content,
              }
            : post
        ),
      };
    case "posts/loadingToggle":
      return {
        ...state,
        isLoading: !state.isLoading,
        error: "",
      };
    case "posts/errorFetch":
      alert(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case "posts/comment":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.discussionId
            ? { ...post, comments: [...post.comments, action.payload] }
            : post
        ),
      };
    case "posts/delete":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        tagsAll: getTagsAll(
          state.posts.filter((post) => post.id !== action.payload)
        ),
      };

    default:
      throw new Error("unknown action");
  }
}

function PostProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, isPostFormOpen, isLoading, error, tagsAll } = state;
  const { user } = useAuth();

  //error handling
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }
  const reportError = ({ message }: { message: string }) => {
    dispatch({ type: "posts/errorFetch", payload: message });
    console.log(message);
  };
  //fetch post from backend on mount
  useEffect(function () {
    async function fetchDiscussions() {
      try {
        dispatch({ type: "posts/loadingToggle" });
        const res = await fetch("/discussions");
        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching discussion content"
          );
        const data = await res.json();
        const initialState = data.payload.data;

        dispatch({ type: "posts/fetched", payload: initialState });
      } catch (err) {
        reportError({ message: getErrorMessage(err) });
      } finally {
        dispatch({ type: "posts/loadingToggle" });
      }
    }

    fetchDiscussions();
  }, []);
  const postFormToggle = useCallback(function postFormToggle() {
    dispatch({ type: "posts/formToggle" });
  }, []);
  const dbPostCreate = useCallback(async function dbPostCreate(
    newPost: NewPost
  ) {
    dispatch({ type: "posts/loadingToggle" });
    const newPostNoDuplicateTag = {
      ...newPost,
      tags: toFindDuplicates(newPost.tags),
    };
    try {
      const res = await fetch(`/discussion`, {
        method: "put",
        body: JSON.stringify(newPostNoDuplicateTag),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error("Something went wrong with creating discussion");
      const data = await res.json();
      dispatch({ type: "posts/addPost", payload: data.payload.data });

      return data;
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    } finally {
      dispatch({ type: "posts/loadingToggle" });
    }
  },
  []);

  const postCreate = useCallback(
    function postCreate(newPost: NewPost) {
      dbPostCreate({
        userId: newPost.userId,
        title: newPost.title,
        content: newPost.content,
        likes: newPost.likes,
        comments: newPost.comments,
        tags: newPost.tags.map((tag) => {
          return { tag: tag.tag };
        }),
      });
    },
    [dbPostCreate]
  );

  const dbPostComment = useCallback(async function dbPostComment(newComment: {
    comment: string;
    discussionId: number;
  }) {
    dispatch({ type: "posts/loadingToggle" });
    try {
      const res = await fetch(`/comment`, {
        method: "put",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong with adding comment");
      const data = await res.json();
      return data;
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    } finally {
      dispatch({ type: "posts/loadingToggle" });
    }
  },
  []);

  const postComment = useCallback(
    function postComment(newComment: Comment) {
      dispatch({ type: "posts/comment", payload: newComment });

      dbPostComment({
        comment: newComment.comment,
        discussionId: newComment.discussionId,
      });
    },
    [dbPostComment]
  );

  const dbPostEdit = useCallback(
    async function dbPostEdit({ id, title, content }: PostToBeEdited) {
      dispatch({ type: "posts/loadingToggle" });
      try {
        const res = await fetch(`/discussion`, {
          method: "post",
          body: JSON.stringify({
            id: id,
            user_id: user?.userId,
            title: title,
            content: content,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok)
          throw new Error("Something went wrong with editing discussion");
        const data = await res.json();
        dispatch({ type: "posts/edit", payload: { id, title, content } });
        return data;
      } catch (err) {
        reportError({ message: getErrorMessage(err) });
        alert("There was an error editing data...");
      } finally {
        dispatch({ type: "posts/loadingToggle" });
      }
    },
    [user?.userId]
  );

  const postEdit = useCallback(
    function postEdit(postToBeEdited: PostToBeEdited) {
      dbPostEdit(postToBeEdited);
    },
    [dbPostEdit]
  );

  const dbPostLike = useCallback(async function dbPostLike(id: number) {
    try {
      dispatch({ type: "posts/likes", payload: id });
      const res = await fetch(`/likes`, {
        method: "put",
        body: JSON.stringify({
          discussionId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong with adding comment");
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    }
  }, []);

  const postLike = useCallback(
    function postLike(id: number) {
      dbPostLike(id);
    },
    [dbPostLike]
  );

  const dbPostDelete = useCallback(async function dbPostDelete(id: number) {
    dispatch({ type: "posts/loadingToggle" });
    try {
      const res = await fetch(`/discussion`, {
        method: "delete",
        body: JSON.stringify({
          discussionId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error("Something went wrong with deleting discussion");
      dispatch({ type: "posts/delete", payload: id });
      const data = await res.json();
      return data;
    } catch (err) {
      reportError({ message: getErrorMessage(err) });
    } finally {
      dispatch({ type: "posts/loadingToggle" });
    }
  }, []);

  const postDelete = useCallback(
    function postDelete(id: number) {
      dbPostDelete(id);
    },
    [dbPostDelete]
  );

  const value = useMemo(() => {
    return {
      posts,
      isPostFormOpen,
      isLoading,
      error,
      tagsAll,
      postEdit,
      postCreate,
      postComment,
      postLike,
      postDelete,
      dispatch,
      postFormToggle,
    };
  }, [
    posts,
    isPostFormOpen,
    isLoading,
    error,
    postEdit,
    postCreate,
    postComment,
    postLike,
    postDelete,
    postFormToggle,
    tagsAll,
  ]);
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export { PostProvider, PostContext };
