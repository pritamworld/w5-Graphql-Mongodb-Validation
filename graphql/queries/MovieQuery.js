const {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const MovieType = require('../types/MovieType');
const MovieModel = require('../../model/Movie');

const movieQueries = {
  movies: {
    type: new GraphQLList(MovieType),
    async resolve() {
      return await MovieModel.find();
    }
  },

  movie: {
    type: MovieType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
      return await MovieModel.findById(args._id);
    }
  }
};

module.exports = movieQueries;