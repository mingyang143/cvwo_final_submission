import { Link } from "react-router-dom";
import styles from "./HomePages.module.css";
function HomePage() {
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
