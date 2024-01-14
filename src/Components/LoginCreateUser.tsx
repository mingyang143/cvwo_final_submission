import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./LoginCreateUser.module.css";

export default function Login({
  message,
  onSubmit,
  type,
  ctaButton,
}: {
  message: string;
  onSubmit: (userName: string) => Promise<void>;
  type: string;
  ctaButton: string;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username) {
      onSubmit(username);
      setUsername("");
      //setPassword("");
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <h1>{message}</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="username">username</label>
          <input
            type="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        {/* <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div> */}

        {type === "login" && (
          <div>
            <Link to="/create" className="link">
              No account? Create one now!
            </Link>
          </div>
        )}
        <div>
          <Button className="" onClick={() => {}}>
            {ctaButton}
          </Button>
        </div>
      </form>
    </main>
  );
}
