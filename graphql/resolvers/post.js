const {AuthenticationError, UserInputError} = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check_auth');


module.exports = { Query: {
    async getPosts() {
        try{
            const posts = await Post.find().sort({createdAt: -1});  //get posts from database and returns them
            return posts;
        }
        catch(err){
            throw new Error(err);
            console.log(err);
        }
    },

    async getPost(_, {postId}) {
        try{
            const post = await Post.findById(postId); //get post from database and returns it
            if(post){
                return post;
            }
            else{
                throw new Error('Post not found');
            }
        }
        catch(err){
            throw new Error("Post not found");
            console.log(err);
        }
    },


    },

    Mutation: {
        async createPost(_, {body}, context) { //returns the mutation for createPost
            const user = checkAuth(context);

            const newPost = new Post({body, user: user.id, username: user.username, createdAt: new Date().toISOString()}); //create new post
            const post = await newPost.save(); //save post to database

            return post;
        },


        async deletePost(_, {postId}, context) { //returns the mutation for deletePost
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId); //get post from database
                if(post.username != user.username){
                    throw new AuthenticationError('Not authorized');
                }
                await Post.findByIdAndDelete(postId); //delete post from database
                return "Post deleted";
            }
            catch(err){
                throw new Error(err);
                console.log(err);
            }
        },


        async likePost(_, {postId}, context) { //returns the mutation for likePost
            const {username} = checkAuth(context);

            const post = await Post.findById(postId); //get post from database

            if(!post){ //check if post exists
                throw new UserInputError('Post not found');
            }

            if(post.likes.find(like => like.username === username)){ //check if user has already liked post
                //unlike post

                const likeIndex = post.likes.findIndex(like => like.username === username);
                post.likes.splice(likeIndex, 1);
                

            }
            else{
                //like post
                post.likes.unshift({username, createdAt: new Date().toISOString()});
            }
            await post.save();
            
            return post;
        },

    },

}