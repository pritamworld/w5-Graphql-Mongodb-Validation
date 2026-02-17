const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

module.exports = MovieType;