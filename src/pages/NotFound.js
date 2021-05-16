import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <>
      <div className="centered">
        <h1>404 Page not found</h1>
      </div>
      <div className="centered">
        <Link className="btn--flat" to="/">
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
