export type User = {
  userId?: number;
  name: string;
  pasword?: string;
};
export type State = {
  user: User | null;
  isAuthenticated: true | false;
  isLoginLoading: true | false;
};
export type Action =
  | {
      type: "login";
      payload: User;
    }
  | {
      type: "logout";
    }
  | {
      type: "toggleLoading";
    };

export type ChildrenProps = {
  children: React.ReactNode;
};

export type AuthContextType = State & {
  login: (userName: string) => Promise<void>;
  logout: () => void;
  createUser: (userName: string) => Promise<void>;
  loadingToggle: () => void;
};
