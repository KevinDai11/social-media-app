const {gql} = require('apollo-server');


module.exports = gql`
    type Post {  #type definition for Post
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Like{
        id: ID!
        username: String!
        createdAt: String!
    }

    type User{ #type definition for User
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Query {
        getPosts: [Post] #calls getPosts function in resolvers/post.js
        getPost(postId: ID!): Post
    }
    input RegisterInput{ #input definition for Register new Users
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Mutation { #changes the database
        register(registerInput: RegisterInput): User! 
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`;



