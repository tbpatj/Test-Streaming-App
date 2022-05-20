import { useQuery, gql } from "@apollo/client";
import { CarousalProvider } from "./MovieCarousal/CarContext/CarProvider";
import MovieCarousal from "./MovieCarousal/MovieCarousal";

export default function MovieList({ offset, amount, listID, genre }) {
  const QUERY_ALL_USERS = gql`
    query GetMovies2 {
      genres2(genre: "${genre}") {
        id
        Title
        Poster
        Plot
        Rated
        Genre
        Released
        Runtime
      }
    }
  `;
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div className="list-container">
      <div className="list-title">{genre}</div>
      <CarousalProvider carousalID={listID} movies={data.genres2}>
        {/* <MovieCard /> */}
        {data && <MovieCarousal id={listID} />}
      </CarousalProvider>
    </div>
  );
}
