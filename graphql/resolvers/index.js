const postsResolver = require('./post.js');
const usersResolver = require('./user.js');


module.exports = {
    Query: {
        ...postsResolver.Query, //export queury from for post and users
        //...usersResolver.Query,
    },

    Mutation: {
        ...usersResolver.Mutation,
        ...postsResolver.Mutation,
    }
};
