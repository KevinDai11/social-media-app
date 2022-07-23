const Post = require('../../models/Post');

module.exports = { Query: {
    getPosts: async () => {
        try{
            const posts = await Post.find();  //get posts from database and returns them
            return posts;
        }
        catch(err){
            throw new Error(err);
            console.log(err);
        }
    }
}}