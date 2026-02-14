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
 

//Resolver


//Create express graphql


//Add graphqlHttp to express middleware


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