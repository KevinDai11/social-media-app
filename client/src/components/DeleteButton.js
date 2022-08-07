import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Confirm, Icon} from 'semantic-ui-react';

import {FETCH_POSTS_QUERY} from '../utils/graphql';

function DeleteButton({postId, callback}){

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false);
            
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            
            const newData = data.getPosts.filter(post => post.id !== postId);

            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: newData,
                },
            });
            if(callback){
                callback();
            }
        },
        variables: {
            postId
        }

    });



    
    return (
        <>
            <Button 
                as = "div"
                floated='right'
                color = "red"
                onClick = {() => setConfirmOpen(true)}
            >
                <Icon name = "trash" style ={{margin: 0}}/>
            </Button>
            <Confirm
                open={confirmOpen}
                onConfirm={deletePost}
                onCancel={() => setConfirmOpen(false)}
                content="Are you sure you want to delete this post?"
            />
        </>
    )
}


const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;


const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId)
    }
`;

export default DeleteButton;