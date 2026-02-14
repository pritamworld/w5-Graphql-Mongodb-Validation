const express = require('express')
const mongoose = require('mongoose')

//GraphQL related imports
const { buildSchema } = require('graphql')
const { createHandler } = require('graphql-http/lib/use/express');

//Models
const UserModel = require('./model/User')
const MovieModel = require('./model/Movie')

const app = express()
const PORT = 4000

//Schema
const gqlSchema = buildSchema(`
    type User {
        _id: ID
        uid: Int
        firstname: String!
        lastname: String!
        salary: Float!
    }

    type Movie {
        _id: ID
        name: String!
        duration: Float!
    }

    type Query {
        hello: String
        greet(name: String!): String
        
        users: [User]
        user(uid: Int!): User
        
        movies: [Movie]
        movie(_id: ID!): Movie
    }

    type Mutation {
        createUser(uid: Int!, firstname: String!, lastname: String!, salary: Float!): User
        updateUser(uid: Int!, firstname: String, lastname: String, salary: Float): User
        deleteUser(_id: ID!): User

        createMovie(name: String!, duration: Float!): Movie
        updateMovie(_id: ID!, name: String, duration: Float): Movie
        deleteMovie(_id: ID!): Movie
    }
`)

//Resolver
const rootResolver = {
    hello: () => {
        return 'Hello World'
    },
    greet: (args) => {
        return `Welcome ,${args.name}`
    },
    users: async () => {
        try{
            const users = await UserModel.find()
            return users
        }catch(error){
            console.log(`Error while fetching users : ${error.message}`)
            return []
        }
    },
    user: async (args) => {
        try{
            const user = await UserModel.findOne({uid: args.uid})
            return user
        }catch(error){
            console.log(`Error while fetching user : ${error.message}`)
            return null
        }
    },
    createUser: async (args) => {
        try{
            const newUser = new UserModel({
                uid: args.uid,
                firstname: args.firstname,
                lastname: args.lastname,
                salary: args.salary
            })
            const savedUser = await newUser.save()
            return savedUser
        }catch(error){
            console.log(`Error while creating user : ${error.message}`)
            return null
        }
    },
    updateUser: async (args) => {
        try{
            const updatedUser = await UserModel.findOneAndUpdate(
                {uid: args.uid},
                {
                    $set: {
                        firstname: args.firstname,
                        lastname: args.lastname,
                        salary: args.salary
                    }
                },
                {new: true}
            )
            return updatedUser
        }catch(error){
            console.log(`Error while updating user : ${error.message}`)
            return null
        }
    },
    deleteUser: async (args) => {
        try{
            const deletedUser = await UserModel.findByIdAndDelete(args._id)
            return deletedUser
        }catch(error){
            console.log(`Error while deleting user : ${error.message}`)
            return null
        }
    },
    movies: async () => {
        try{
            const movies = await MovieModel.find()
            return movies
        }catch(error){
            console.log(`Error while fetching movies : ${error.message}`)
            return []
        }
    },
    movie: async (args) => {
        try{
            const movie = await MovieModel.findOne({_id: args._id})
            return movie
        }catch(error){
            console.log(`Error while fetching movie : ${error.message}`)
            return null
        }
    },
    createMovie: async (args) => {
        try{
            const newMovie = new MovieModel({
                name: args.name,
                duration: args.duration
            })
            const savedMovie = await newMovie.save()
            return savedMovie
        }catch(error){
            console.log(`Error while creating movie : ${error.message}`)
            return null
        }
    },
    updateMovie: async (args) => {
        try{
            const updatedMovie = await MovieModel.findOneAndUpdate(
                {_id: args._id},
                {
                    $set: {
                        name: args.name,
                        duration: args.duration
                    }
                },
                {new: true}
            )
            return updatedMovie
        }catch(error){
            console.log(`Error while updating movie : ${error.message}`)
            return null
        }
    },
    deleteMovie: async (args) => {
        try{
            const deletedMovie = await MovieModel.findByIdAndDelete(args._id)
            return deletedMovie
        }catch(error){
            console.log(`Error while deleting movie : ${error.message}`)
            return null
        }
    }
}

//Create express graphql
const graphqlHttp = createHandler({
    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true
})

//Add graphqlHttp to express middleware
app.use('/graphql', graphqlHttp)

//helper function to connect to MongoDB asychronously
const connectDB = async() => {
    try{
        console.log(`Attempting to connect to DB`);
        //TODO - Replace you Connection String here
        const DB_NAME = "db_comp3133_employee"
        const DB_USER_NAME = "sa"
        const DB_PASSWORD = 'SY1vgY0fY47tKxQL'
        const CLUSTER_ID = '7wn4nmp'
        const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

        mongoose.connect(DB_CONNECTION).then( () => {
            console.log(`MongoDB connected`)
        }).catch( (err) => {
            console.log(`Error while connecting to MongoDB : ${JSON.stringify(err)}`)
        });
    }catch(error){
        console.log(`Unable to connect to DB : ${error.message}`);
        
    }
}

app.listen(PORT, () =>{
    connectDB()
    console.log("GraphQL Server started")
    console.log("http://localhost:4000/graphql")
})