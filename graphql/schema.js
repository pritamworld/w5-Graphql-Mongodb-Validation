//Combining Everything
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const userQueries = require('./queries/UserQuery');
const movieQueries = require('./queries/MovieQuery');
const userMutations = require('./mutations/UserMutation');
const movieMutations = require('./mutations/MovieMutation');

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQueries,
    ...movieQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...movieMutations
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
