const express = require('express')
const mongoose = require('mongoose')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require("express-graphql")
const UserModel = require('./model/User')

const app = express()
const SERVER_PORT = 4000

//Schema
const gqlSchema = buildSchema(
    `type Query{
        welcome: String
        greet(name: String): String
        user: User
        users: [User]
    }
    
    type Mutation{
        addUser(uid: Int, fnm: String, lnm: String, salary: Float): User
    }

    type User{
        uid: Int
        firstname: String
        lastname: String
        salary: Float
    }
    `
)

//Root Resolver
const rootResolver = {
    welcome: () => {
        return "Welcome to GraphQL examples"
    },
    greet: ({name})=>{ //obj.name
        return `Hello, ${name}`
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
    }
}

//GqlHttp object
const grpahqlHttp = graphqlHTTP({
    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true
})

app.use("/graphql", grpahqlHttp)

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

app.listen(SERVER_PORT, () => {
    console.log('Server started')
    connectDB()
    console.log('http://localhost:4000/graphql')
})