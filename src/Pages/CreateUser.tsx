import { useAuth } from "../Contexts/Hooks/authContextHook";
import LoginCreateUser from "../Components/LoginCreateUser";
import Spinner from "../Components/Spinner";

function CreateUser() {
  const { createUser, isLoginLoading } = useAuth();
  if (isLoginLoading) {
    return <Spinner />;
  }
  return (
    <LoginCreateUser
      message={"Create a new user now! 🥳"}
      onSubmit={createUser}
      type={"create"}
      ctaButton={"Create User!"}
    />
  );
}

export default CreateUser;
