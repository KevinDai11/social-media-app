const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const {MONGODB} = require('./config.js');
const typeDefs = require('./graphql/typedefs.js');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) => ({req}) }); //create a new ApolloServer

mongoose.connect(MONGODB, {useNewUrlParser: true}).then( () => { //connect to mongodb 
    console.log('Connected to MongoDB');
    return server.listen({port: 5000});})
    
    .then((res) => {
        console.log(`Server ready at ${res.url}`);
    });



