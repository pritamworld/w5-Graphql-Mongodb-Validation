const express = require('express')
const mongoose = require('mongoose')

const UserModel = require('./model/User')
const MovieModel = require('./model/Movie')

//GraphQL related imports
const { buildSchema } = require('graphql')
const { createHandler } = require('graphql-http/lib/use/express');

const app = express()
const PORT = 4000

//Schema
const gqlSchema = buildSchema(
    `type Query{
        hello: String
        greet(name: String!): String
        welcome: [String]
        user: User
        users: [User]
        movie: Movie
        movies: [Movie]
        movieByName(name: String!): Movie
    }
    
    type Mutation{
        addUser(uid: Int, fnm: String, lnm: String, salary: Float): User
        addMovie(mid: Int, name: String, duration:Float): Movie
    }

    type User{
        uid: Int
        firstname: String
        lastname: String
        salary: Float
    }

    type Movie{
        _id: ID
        mid: Int
        name: String
        duration:Float
    }`
)  

//Resolver
const rootResolver = {
    hello: () => {
        return "Hello World"
    },
    welcome: () => {
        return  [
            "Good Evening",
            "Good Morning",
            "Good Afternoon",
            "Welcome to GraphQL examples"
        ]
    },
    greet: ({name})=>{
        return `Welcome, ${name}`
    },
    welcome: ()=>{
        return [
            "Good Evening",
            "Good Morning",
            "Good Afternoon"
        ]
    },
    user: async () => {
        // const user = {
        //     uid: 1,
        //     fnm: "Pritesh",
        //     lnm: "Patel",
        //     salary: 500.50
        // }
        const user = await UserModel.findOne({})
        console.log(user)
        return user
    },
    users: async() => {
        // const users = [{
        //     uid: 1,
        //     fnm: "Pritesh",
        //     lnm: "Patel",
        //     salary: 500.50
        // },
        // {
        //     uid: 2,
        //     fnm: "Test",
        //     lnm: "Patel",
        //     salary: 1500.70
        // }]
        const users = await UserModel.find({})
        console.log(users)
        return users
    },
    addUser: async(user) => {
        console.log(user)
        //Insert to Database
        const {uid, fnm, lnm, salary} = user
        const newUser = UserModel({
            uid,
            firstname: fnm,
            lastname: lnm,
            salary
        })
        await newUser.save()
        return newUser
    },
    movie: async ()=>{
        // const movie = {
        //     mid: 1,
        //     name: 'Movie 1',
        //     duration: 100.50
        // }
        const movie = await MovieModel.findOne({})
        return movie
    },
     movies: async ()=>{
        // const movies = [{
        //     mid: 1,
        //     name: 'Movie 1',
        //     duration: 100.50
        // },
        // {
        //     mid: 2,
        //     name: 'Movie 2',
        //     duration: 150.00
        // }]
        const movies = await MovieModel.find({})
        return movies
    },
    addMovie: async ({mid, name, duration}) => {
        //insert movie
        const movie = new MovieModel({
            mid,
            name,
            duration
        })
        const newUser = await movie.save()
        return newUser
    },
    movieByName: async ({name})=>{
        const movie = await MovieModel.findOne({'name': name})
        return movie
    }
}

//Crete express graphql
const graphqlHttp = createHandler({
    schema: gqlSchema,
    rootValue: rootResolver
})

//Add graphqlHttp to express middleware
app.use("/graphql", graphqlHttp)

//helper function to connect to MongoDB asychronously
const connectDB = async() => {
    try{
        console.log(`Attempting to connect to DB`);
        //TODO - Replace you Connection String here
        const DB_NAME = "db_comp3133_employee"
        const DB_USER_NAME = "sa"
        const DB_PASSWORD = ''
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