const express = require('express')
const mongoose = require('mongoose')
const schema = require('./graphql/schema')

//GraphQL related imports
const { createHandler } = require('graphql-http/lib/use/express');

const app = express()
const PORT = 4000

//Create express graphql
const graphqlHttp = createHandler({
    schema: schema,
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

app.listen(PORT, async () =>{
    await connectDB()
    console.log("GraphQL Server started")
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
})