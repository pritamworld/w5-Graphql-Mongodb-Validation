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
