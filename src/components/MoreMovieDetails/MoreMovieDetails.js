import "./MoreMovieDetails.css";
const UNAVAILABLE_IMAGE =
  "https://cdn.shopify.com/s/files/1/2506/6936/files/image-unavailable.svg?v=1609864912";

export const MoreMovieDetails = ({
  movie: { title, image, genre, rated, director, awards, plot, released },
}) => {
  return (
    <div tabindex="-1" className="modal-inner">
      <div className="modal-movie__image-wrapper">
        <img
          width="300"
          height="444"
          className="modal-movie__image"
          src={image === "N/A" ? UNAVAILABLE_IMAGE : image}
          alt={title}
        />
      </div>
      <div className="modal-movie__title-wrapper">
        <ul className="modal-movie__detail-list">
          <li className="modal-movie__detail-list-item">
            <div className="modal-movie__detail-list-item-title">Genre</div>
            <div className="modal-movie__detail-list-item-value">{genre}</div>
          </li>
          <li className="modal-movie__detail-list-item">
            <div className="modal-movie__detail-list-item-title">Released</div>
            <div className="modal-movie__detail-list-item-value">
              {released}
            </div>
          </li>
          <li className="modal-movie__detail-list-item">
            <div className="modal-movie__detail-list-item-title">Rated</div>
            <div className="modal-movie__detail-list-item-value">{rated}</div>
          </li>
          <li className="modal-movie__detail-list-item">
            <div className="modal-movie__detail-list-item-title">Director</div>
            <div className="modal-movie__detail-list-item-value">
              {director}
            </div>
          </li>
          <li className="modal-movie__detail-list-item">
            <div className="modal-movie__detail-list-item-title">Awards</div>
            <div className="modal-movie__detail-list-item-value">{awards}</div>
          </li>
        </ul>
      </div>
      <div className="modal-movie__plot-wrapper">
        <hr />
        <h3 className="modal-movie__plot-heading">Plot</h3>
        <p className="modal-movie__plot-content">{plot}</p>
      </div>
    </div>
  );
};