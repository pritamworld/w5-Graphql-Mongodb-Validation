const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const MovieType = require('../types/MovieType');
const { MovieInput, UpdateMovieInput } = require('../inputs/MovieInput');
const MovieModel = require('../../model/Movie');

const movieMutations = {
  createMovie: {
    type: MovieType,
    args: {
      input: { type: new GraphQLNonNull(MovieInput) }
    },
    async resolve(parent, { input }) {
      const newMovie = new MovieModel(input);
      return await newMovie.save();
    }
  },

  updateMovie: {
    type: MovieType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(UpdateMovieInput) }
    },
    async resolve(parent, { _id, input }) {
      return await MovieModel.findByIdAndUpdate(
        _id,
        { $set: input },
        { new: true }
      );
    }
  },

  deleteMovie: {
    type: MovieType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
      return await MovieModel.findByIdAndDelete(args._id);
    }
  }
};

module.exports = movieMutations;