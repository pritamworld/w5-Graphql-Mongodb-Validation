const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} = require('graphql');

const MovieInput = new GraphQLInputObjectType({
  name: 'MovieInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});

const UpdateMovieInput = new GraphQLInputObjectType({
  name: 'UpdateMovieInput',
  fields: {
    name: { type: GraphQLString },
    duration: { type: GraphQLFloat }
  }
});

module.exports = { MovieInput, UpdateMovieInput };