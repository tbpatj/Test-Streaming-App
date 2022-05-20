import { useContext } from "react";
import { DataContext } from "../Context/GlobalData";
import BackgroundImage from "./Image/BackgroundImage";

export default function MovieCard({ movie, selected }) {
  const { selectedRow, dispatch, posterOpened } = useContext(DataContext);
  const showAll = selected && posterOpened;
  return (
    <div className={`${!showAll ? "movie-card" : "movie-card-sel movie-card"}`}>
      <div
        className={`${!showAll ? "poster-container" : "poster-container-sel"}`}
      >
        <img className="poster" src={movie.Poster} />
      </div>
      {showAll && (
        <div className="hero">
          <div className="hero-img-container">
            <BackgroundImage movie={movie} transitionTime={4000} />
            <div className="grad-overlay"></div>
            <div className="title-container">
              <div className="movie-title">{movie.Title}</div>
              <div className="movie-rated">{movie.Rated}</div>
            </div>
          </div>
        </div>
      )}
      {showAll && (
        <div className="movie-body">
          <div className="plot-container">
            <div className="movie-plot">{movie.Plot}</div>
          </div>
        </div>
      )}
    </div>
  );
}
