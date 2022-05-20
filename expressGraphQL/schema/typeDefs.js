const { gql } = require("apollo-server");

const typeDefs = gql(`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }
  type Movie2{
    id: ID!
    ComingSoon: String
    Title: String!
    Year: String!
    Rated: String
    Released: String
    Runtime: String
    Genre: String
    Director: String
    Writer: String
    Actors: String
    Plot: String
    Language: String
    Country: String
    Awards: String
    Poster: String
    Metascore: String
    imdbRating: String
    imdbVotes: String
    imdbID: String
    Type: String
    Response: Boolean
    Images: [String],
  }

  type Movie{
      id: ID!
      name: String!
      yearOfPublication: Int!
      isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies(offset: Int, amount: Int): [Movie!]!
    movie(name: String!): Movie!
    movie2(id: Int!): Movie2
    genres2(genre: String!): [Movie2]!
    movies2(offset: Int, amount: Int): [Movie2!]!

  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }
  input UpdateUsernameInput {
      id: ID!
      newUsername: String!
  }

  type Mutation {
      createUser(input: CreateUserInput!): User
      updateUsername(input: UpdateUsernameInput!): User
      deleteUser(id: ID!): User
  }

  enum Nationality {
      CANADA
      BRAZIL
      INDIA
      GERMANY
      CHILE
      UNITED_STATES
  }
`);
module.exports = { typeDefs };
