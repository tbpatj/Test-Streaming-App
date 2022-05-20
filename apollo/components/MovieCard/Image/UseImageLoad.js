import { useState, useContext, useEffect } from "react";
import { useQuery, gql, ApolloClient } from "@apollo/client";
import { DataContext } from "../../Context/GlobalData";

export default function UseImageLoad(movie) {
  const [loading, setLoading] = useState(false);
  const { dispatch, apolloClient } = useContext(DataContext);
  const QUERY_FOR_MOVIE = gql`
    query GetMovie2 {
      movie2(id: ${Number(movie.id)}) {
        Images
      }
    }`;
  async function retrieveImages() {
    if (!movie.Images && loading === false) {
      const response = await apolloClient.query({ query: QUERY_FOR_MOVIE });
      setLoading(false);
      dispatch({
        type: "updateMovie",
        data: { id: movie.id, Images: response.data.movie2.Images },
      });
    }
  }

  useEffect(() => {
    if (movie.Images === undefined && loading === false) {
      setLoading(true);
      retrieveImages();
    }
  }, []);
  return { loading };
}
