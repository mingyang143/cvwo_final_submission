import { useAuth } from "../Contexts/Hooks/authContextHook";
import LoginCreateUser from "../Components/LoginCreateUser";
import Spinner from "../Components/Spinner";

function Login() {
  const { login, isLoginLoading } = useAuth();
  if (isLoginLoading) {
    return <Spinner />;
  }
  return (
    <LoginCreateUser
      message={"Login now!"}
      onSubmit={login}
      type={"login"}
      ctaButton={"Login"}
    />
  );
}

export default Login;
