import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  State,
  Action,
  ChildrenProps,
  AuthContextType,
} from "../Models/AuthModels";
// interface User {
//   userId?: number;
//   name: string;
//   pasword?: string;
// }
// interface State {
//   user: User | null;
//   isAuthenticated: true | false;
//   isLoginLoading: true | false;
// }
// type Action =
//   | {
//       type: "login";
//       payload: User;
//     }
//   | {
//       type: "logout";
//     }
//   | {
//       type: "toggleLoading";
//     };

// type ChildrenProps = {
//   children: React.ReactNode;
// };

// type AuthContextType = State & {
//   login: (userName: string) => Promise<void>;
//   logout: () => void;
//   createUser: (userName: string) => Promise<void>;
// };

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginLoading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "toggleLoading":
      return { ...state, isLoginLoading: !state.isLoginLoading };
    default:
      throw new Error("unknown action");
  }
}
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: () => {},
  createUser: async () => {},
  loadingToggle: () => {},
});
function AuthProvider({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, isLoginLoading } = state;

  async function login(username: string) {
    dispatch({ type: "toggleLoading" });
    const data = await dbIsValidUser({ name: username });
    dispatch({ type: "toggleLoading" });
    if (data?.errorCode === 0) {
      dispatch({
        type: "login",
        payload: { name: username, userId: data.payload.data.id },
      });

      alert("Successfully logged in!");
    } else {
      alert("No user found, please create a user! ❌");
    }
  }
  async function createUser(username: string) {
    dispatch({ type: "toggleLoading" });
    const data = await dbPostUser({ name: username });
    dispatch({ type: "toggleLoading" });
    if (data) {
      alert("New user created, please log in now");
    } else {
      alert("Failed to create new user");
    }
    navigate("/login");
  }

  function logout() {
    dispatch({ type: "logout" });
    dispatch({ type: "toggleLoading" });
  }
  function loadingToggle() {
    dispatch({ type: "toggleLoading" });
  }
  async function dbIsValidUser(newUser: User) {
    try {
      const res = await fetch(`/checkuser?name=${newUser.name}`);

      const data = await res.json();
      return data;
    } catch {
      alert("There was an error validating user...");
    }
  }
  async function dbPostUser(newUser: User) {
    try {
      const res = await fetch(`/users`, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const data = await res.json();
      console.log(data);

      return data;
    } catch {
      alert("There was an error loading data...");
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        createUser,
        isLoginLoading,
        loadingToggle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
