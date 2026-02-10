# Reference Code (Copy to index.js)

### Schema

```
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
```

### Resolvers

```
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
```

### Create express graphql

```
const graphqlHttp = graphqlHTTP({
    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true
})
```

## Add graphqlHttp to express middleware
```
app.use("/graphql", graphqlHttp)
```

# Sample GraphQL Requests

### Queries
``` 
  query{
 	welcome
  g1: greet(name : "Pritesh")
	g2: greet(name : "Ali")
  
   u0: user {
  	fnm
    lnm
  }
  
  u1: user {
    ...UserFields
  }
  
  u11: user {
   ...UserFields
  }
  
  u2: user{
    uid
    fnm
    lnm
    salary
  }
  
   u3: user{
    uid
    fnm
    lnm
    salary
  }
}
```

### Mutations

```
mutation{
    u1: addUser(uid:1, fnm: "Pritesh", lnm: "Patel", salary: 567.90){
        uid
        fnm
        lnm
        salary
    }

    u2: addUser(uid:1, fnm: "Pritesh", lnm: "Patel", salary: 567.90){
        uid
        fnm
        lnm
        salary
    }
}
```

### Fragment Example

```
fragment UserFields on User{
  fnm
  lnm
}
```
```
mutation{
    u1: addUser(uid:1, fnm: "Pritesh", lnm: "Patel", salary: 567.90){
        uid
        fnm
        lnm
        salary
    }

    u2: addUser(uid:2, fnm: "Mo", lnm: "Harryy", salary: 600.50){
        uid
        fnm
        lnm
        salary
    }
}
```

```
query{
  h1:hello
  h2:hello
  h3:hello
  greet(name: "Pritesh")
  welcome
  m1:movie {
   mid
    name
    duration
  }
  
   m2:movie {

    name
    duration
  }
  
  movies{
    name
  }
}
```

```

  
  query getMovies($m1:String!, $m2:String!){
      m2: movieByName(name: $m1){
      ...MovieFields
      }

      m1: movieByName(name: $m2){
       _id
        mid
        name
        duration
      }
  }

fragment MovieFields on Movie{
  _id
  
    name
    duration
}
```

```


mutation{
  addMovie(mid:2, name:"Movie 2", duration:15.50){
    mid
    name
    duration
  }
}
```
