import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <section>
        <h1>
          NEED TO DISCUSS ONLINE?
          <br />
          DiscussionCube is now here
        </h1>
        <h2>The aim of discussion should not be victory, but progress.</h2>
        <Link to="/login" className="cta">
          Start Discussion now!
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
