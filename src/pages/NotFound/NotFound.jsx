import { Link } from "react-router-dom";
import "../../components/NotFoundPage.scss";
import loadingGif from "../../images/404humster.gif";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="error-404">
        <img src={loadingGif} alt="Анімоване зображення помилки 404" />
        <h2>404</h2>
        <img src={loadingGif} alt="Анімоване зображення помилки 404" />
      </div>

      <div className="not-found">
        <h1>Page not found</h1>
        <p>Unfortunately, nothing was found at the requested address. The link may be outdated, or the page may have been moved.</p>
        <Link className="home-404" to="/">
          Home
        </Link> 
      </div>
    </div>
  );
}