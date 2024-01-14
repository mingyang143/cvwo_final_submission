import { NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import LogoutUi from "./LogoutUi";
import styles from "./Navigation.module.css";
function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/app">App</NavLink>
        </li>
        {!isAuthenticated && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <LogoutUi />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
