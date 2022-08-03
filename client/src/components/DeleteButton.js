import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Confirm, Icon} from 'semantic-ui-react';

function DeleteButton({postId}){

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){
            setConfirmOpen(false);
            //TODO: remove post from cache
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


export default DeleteButton;