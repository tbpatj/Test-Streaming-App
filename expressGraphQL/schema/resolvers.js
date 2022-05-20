const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");
const { Movies2 } = require("../MoviesData");

const resolvers = {
  Query: {
    //   returns the user list
    users: () => UserList,
    // returns a specific user
    user: (p, { id }) => _.find(UserList, { id: Number(id) }),
    // returns the movies list
    movies: (p, args) => {
      let { offset, amount } = args;
      if (!offset) offset = 0;
      if (!amount) amount = Movies2.length;
      if (offset + amount > Movies2.length) return null;
      return Movies2.slice(offset, offset + amount);
    },
    // returns a movie from a passed arg of name
    movie: (p, { name }) => _.find(MovieList, { name }),
    movie2: (p, { id }) => {
      console.log("sending back movie " + id);
      return Movies2[id];
    },
    movies2: (p, args) => {
      console.log(args);
      let moviesLength = Object.keys(Movies2).length;
      console.log("yeah");
      let { offset, amount } = args;
      if (!offset) offset = 0;
      if (!amount) amount = 10;
      if (offset > moviesLength) return [];
      if (offset + amount >= moviesLength) amount = moviesLength - offset;
      let returning = [];
      for (let i = offset; i < offset + amount; i++) {
        returning.push(Movies2[Number(i) + 1]);
      }
      return returning;
    },
    genres2: (p, args) => {
      let returnList = [];
      for (key in Movies2) {
        if (Movies2[key].Genre.includes(args.genre)) {
          returnList.push(Movies2[key]);
        }
      }
      console.log(returnList);
      return returnList;
    },
  },
  User: {
    friends: () => {},
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000);
    },
  },

  Mutation: {
    createUser: (p, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (p, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        console.log(user.id, id);
        if (user.id === Number(id)) {
          console.log("ye");
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
    deleteUser: (p, { id }) =>
      _.remove(UserList, (user) => user.id === Number(id)),
  },
};

module.exports = { resolvers };
