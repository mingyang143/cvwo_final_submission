import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import styles from "./LogoutUi.module.css";

function LogoutUi() {
  const { user, logout, loadingToggle } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    loadingToggle();
    navigate("/");
    logout();
  }

  return (
    <div className={styles.user}>
      <span>Welcome, {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutUi;
