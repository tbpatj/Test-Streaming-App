import { useContext } from "react";
import { DataContext } from "./Context/GlobalData";
import BackgroundImage from "./MovieCard/Image/BackgroundImage";

export default function MovieDisplay({ movieID }) {
  let { movies } = useContext(DataContext);
  if (!movies[movieID]) {
    return null;
  }
  let movie = movies[movieID];

  return (
    <div className="display-container">
      <div className="display-img-container">
        <BackgroundImage movie={movies[movieID]} transitionTime={10000} />
        <div className="vignette"></div>
      </div>
      <div className="display-info-container">
        <div className="display-title-container">
          <div className="display-movie-title">{movie.Title}</div>
          <div></div>
        </div>
        {/* <div>{movie.Released}</div> */}
      </div>
    </div>
  );
}
