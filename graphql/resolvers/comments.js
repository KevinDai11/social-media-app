const {AuthenticationError, UserInputError} = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check_auth');

module.exports = {
    Mutation: {
        async createComment(_, {postId, body}, context) { //returns the mutation for createComment
            const {username} = checkAuth(context);

            if(body.trim() === ''){ //check if empty comment
                throw new UserInputError('Empty comment',{
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                });
            }
            

            const post = await Post.findById(postId); //get post from database

            if(!post){ //check if post exists
                throw new UserInputError('Post not found');
            }

            post.comments.unshift({ //add comment to post
                body,
                username,
                createdAt: new Date().toISOString(),
            });

            await post.save();
            return post;
        },


        async deleteComment(_, {postId, commentId}, context) { //returns the mutation for deleteComment
 
            const {username} = checkAuth(context);

            const post = await Post.findById(postId); //get post from database

            if(!post){ //check if post exists
                throw new UserInputError('Post not found'); 
            }

            const commentIndex = post.comments.findIndex(comment => comment.id === commentId); //find index of comment

            if(commentIndex < 0){ //check if comment exists
                throw new UserInputError('Comment not found');
            }

            if(post.comments[commentIndex].username !== username){ //check if user is authorized to delete comment
                throw new AuthenticationError('Not authorized');
            }

            post.comments.splice(commentIndex, 1); //delete comment from post
            await post.save()
            return post;
        },
    }
}