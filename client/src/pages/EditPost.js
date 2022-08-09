import React, {useContext, useRef, useState} from  'react'
import {gql, useQuery, useMutation} from '@apollo/client'
import {Card, Form, Image, Grid, Button, CardContent} from 'semantic-ui-react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import {AuthContext} from '../context/auth';
import DeleteButton from '../components/DeleteButton';



export default function EditPost(props) {
    const postId = useParams().postId;
    const {user} = useContext(AuthContext);
    const history = useNavigate();

    const [newBody, setnewBody] = useState('');


    const commentInputRef = useRef(null);

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }   
    });

    //edit post body
    const [editPost] = useMutation(EDIT_POST_MUTATION, {
        update(){
            setnewBody('');
            commentInputRef.current.blur();
            history(`/posts/${postId}`);
        },
        variables:{
            postId,
            body: newBody
        }
    });

    function deletePostCallBack() {
        history('/');
    }
    
    let postMarkup;
    if(!data) {
        postMarkup = <p>Loading Post...</p>
    }
    else{
        const {body, createdAt, username} = data.getPost;
        
        postMarkup = (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>

                </Grid.Column>
                <Grid.Column width={10}>
                    <h1>Edit Post</h1>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as = {Link} to = {`/profile/${username}`}>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            
                            <Card.Content extra>
                                {user.username === username && (
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input 
                                                type="text"
                                                placeholder = {body}
                                                value = {newBody}
                                                onChange = {(e) => setnewBody(e.target.value)}
                                                ref = {commentInputRef}
                                                name = "edit post"
                                            />
                                            <button
                                                className="ui blue button"
                                                type = "submit"
                                                disabled = {!body}
                                                onClick = {editPost}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Card.Content>

                        </Card.Content>

                        <Card.Content extra>
                            <DeleteButton postId = {postId} callback = {deletePostCallBack}/>
                        </Card.Content>
                    </Card>      
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    }

    
    return postMarkup;
   
}


const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                body
                createdAt
                username
            }
        }
    }
`;


const EDIT_POST_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        editPost(postId: $postId, body: $body) {    
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                body
                createdAt
                username
            }
        }
    }
`;


