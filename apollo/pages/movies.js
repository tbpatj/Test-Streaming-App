import MovieDisplay from "../components/MovieDisplay";
import MovieList from "../components/MovieList";

export default function Movies() {
  setInterval(() => {}, 3000);
  return (
    <div className="whole-movie-container">
      <div className="top-bar">
        <div></div>
        <form>
          <label>
            <h3 className="inline">search</h3>
          </label>
          <input placeholder="search" className="search-bar" />
        </form>
      </div>
      <MovieDisplay movieID={Math.floor(Math.random() * 400)} />
      <MovieList listID={1} genre={"Comedy"} />
      <MovieList listID={2} genre={"Action"} />
      <MovieList listID={3} genre={"Family"} />
      <MovieDisplay movieID={Math.floor(Math.random() * 400)} />
      <MovieList listID={4} genre={"Animation"} />

      <MovieList listID={5} genre={"Adventure"} />
      <MovieList listID={6} genre={"Science Fiction"} />
      <MovieDisplay movieID={Math.floor(Math.random() * 400)} />
      <MovieList listID={7} genre={"Drama"} />
      {/* <MovieList listID={2} offset={100} amount={100} />
      <MovieList listID={3} offset={200} amount={100} />
      <MovieList listID={4} offset={300} amount={100} />
      <MovieList listID={5} offset={400} amount={100} /> */}
    </div>
  );
}
