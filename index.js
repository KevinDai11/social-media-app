const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const {MONGODB} = require('./config.js');

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query {
        getPosts: [Post]
    }
`

const resolvers ={
    Query: {
        getPosts: async () => {
            try{
                const posts = await Post.find();
                return posts;
            }
            catch(err){
                throw new Error(err);
                console.log(err);
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB, {useNewUrlParser: true}).then( () => {
    console.log('Connected to MongoDB');
    return server.listen({port: 5000});})
    
    .then((res) => {
        console.log(`Server ready at ${res.url}`);
    });



