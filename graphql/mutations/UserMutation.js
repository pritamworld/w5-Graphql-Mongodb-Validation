const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const UserType = require('../types/UserType');
const { UserInput, UpdateUserInput } = require('../inputs/UserInput');
const UserModel = require('../../model/User');

const userMutations = {
  createUser: {
    type: UserType,
    args: {
      input: { type: new GraphQLNonNull(UserInput) }
    },
    async resolve(parent, { input }) {
      const newUser = new UserModel(input);
      return await newUser.save();
    }
  },

  updateUser: {
    type: UserType,
    args: {
      uid: { type: new GraphQLNonNull(GraphQLInt) },
      input: { type: new GraphQLNonNull(UpdateUserInput) }
    },
    async resolve(parent, { uid, input }) {
      return await UserModel.findOneAndUpdate(
        { uid },
        { $set: input },
        { new: true }
      );
    }
  },

  deleteUser: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
      return await UserModel.findByIdAndDelete(args._id);
    }
  }
};

module.exports = userMutations;