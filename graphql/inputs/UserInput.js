//BEST PRACTICE
const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} = require('graphql');

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    uid: { type: new GraphQLNonNull(GraphQLInt) },
    firstname: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});

const UpdateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    salary: { type: GraphQLFloat }
  }
});

module.exports = { UserInput, UpdateUserInput };