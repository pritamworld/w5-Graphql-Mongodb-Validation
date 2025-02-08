const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const MovieModel = require('./model/Movie')

const app = express()
const PORT = 4000

//Schema
const gqlSchema = buildSchema(
    `type Query{
        hello: String
        greet(name: String!): String
        welcome: [String]
        movie: Movie
        movies: [Movie]
        movieByName(name: String!): Movie
    }
    
    type Mutation{
        addMovie(mid: Int, name: String, duration:Float): Movie
    }
    
    type Movie{
        _id: ID
        mid: Int
        name: String
        duration:Float
    }
`)

//Resolver
const rootResolver = {
    hello: () => {
        return "Hello World"
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

        const newMovie = await movie.save()

        return newMovie
    },
    movieByName: async ({name})=>{
        const movie = await MovieModel.findOne({'name': name})
        return movie
    }
}

//Crete express graphql
const graphqlHttp = graphqlHTTP({
    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true
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
        const DB_PASSWORD = 'UtHZ7JlQJby4pxeh'
        const CLUSTER_ID = '7wn4nmp'
        const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

        mongoose.connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then( () => {
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