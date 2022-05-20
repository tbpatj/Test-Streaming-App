import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DataProvider } from "../components/Context/GlobalData";
import "../styles/globals.css";
import "../styles/movies.css";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <DataProvider apolloClient={client}>
        <div className="relative-container">
          <Component {...pageProps} />
        </div>
      </DataProvider>
    </ApolloProvider>
  );
}

export default MyApp;
