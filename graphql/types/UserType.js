const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    uid: { type: new GraphQLNonNull(GraphQLInt) },
    firstname: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

module.exports = UserType;