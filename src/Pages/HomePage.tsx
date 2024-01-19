import { Link } from "react-router-dom";
import styles from "./HomePages.module.css";
import Spinner from "../Components/Spinner";
import { useAuth } from "../Contexts/Hooks/authContextHook";
function HomePage() {
  const { isLoginLoading } = useAuth();
  if (isLoginLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.homepage}>
      <section>
        <h1>
          NEED TO DISCUSS ONLINE?
          <br />
          DiscussionCube is now here
        </h1>
        <h2>The aim of discussion should not be victory, but progress.</h2>
        <Link to="/login" className={styles.cta}>
          Start Discussion now!
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
