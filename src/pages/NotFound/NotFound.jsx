import { Link } from "react-router-dom";
import "../../components/NotFoundPage.scss";
import hamsterImg from "../../images/404humster.gif"; 

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="content-box text-center">
        <img src={hamsterImg} alt="404 Hamster" className="img-fluid mb-4 hamster-img" />
        <h1 className="display-4 fw-bold text-dark">Ooops!</h1>
        <p className="lead text-muted mb-4">Page not found or removed.</p>
        <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
          Go Home
        </Link>
      </div>
    </div>
  );
}