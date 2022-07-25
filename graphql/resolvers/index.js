const postsResolver = require('./post.js');
const usersResolver = require('./user.js');
const commentsResolver = require('./comments.js');


module.exports = {
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },

    Query: {
        ...postsResolver.Query, //export queury from for post and users
        //...usersResolver.Query,
    },

    Mutation: {
        ...usersResolver.Mutation,
        ...postsResolver.Mutation,
        ...commentsResolver.Mutation,
    }
};
