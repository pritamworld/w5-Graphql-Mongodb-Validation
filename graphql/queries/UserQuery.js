const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const UserType = require('../types/UserType');
const UserModel = require('../../model/User');

const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    async resolve() {
      return await UserModel.find();
    }
  },

  user: {
    type: UserType,
    args: {
      uid: { type: new GraphQLNonNull(GraphQLInt) }
    },
    async resolve(parent, args) {
      return await UserModel.findOne({ uid: args.uid });
    }
  }
};

module.exports = userQueries;