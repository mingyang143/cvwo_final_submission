import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import styles from "./LogoutUi.module.css";

function LogoutUi() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default LogoutUi;
