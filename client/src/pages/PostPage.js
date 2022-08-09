import React, {useContext, useRef, useState} from  'react'
import {gql, useQuery, useMutation} from '@apollo/client'
import {Card, Form, Image, Grid, Button} from 'semantic-ui-react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import {AuthContext} from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import PopUp from '../utils/PopUp';
function PostPage() {
    const postId = useParams().postId;
    const {user} = useContext(AuthContext);
    const history = useNavigate();

    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }   
    });

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body: comment
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
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = data.getPost;
        
        postMarkup = (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        src = "https://react.semantic-ui.com/images/avatar/large/molly.png"
                        size = "small"
                        float = "right"
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as = {Link} to = {`/profile/${username}`}>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>
                                {body}
                            </Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user = {user} post = {{id, likeCount,likes}}/>
                            <Button
                                as = "div"
                                onClick = {() => {
                                    console.log('comment');
                                    }
                                }
                                color='teal'
                                icon = {`${commentCount}` > 1 ? 'comments' : 'comment'}
                                basic = {`${commentCount}` === 0}
                                label={{ basic: true, color: 'teal', pointing: 'left', content: `${commentCount}` }}
                            />

                            {user && user.username === username && ( <DeleteButton postId = {id} callback = {deletePostCallBack}/>)}
                            {user && user.username === username && (
                            <PopUp content = "Edit Post">
                                <Button
                                    icon = 'edit outline'
                                    floated='right'
                                    color = "blue"
                                    as = {Link}
                                    to = {`/edit/${id}`}
                                    >
                                </Button>
                            </PopUp>)}
                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <p>Post a Comment</p>
                                <Form>
                                    <div className = "ui action input fluid">
                                        <input
                                            type = "text"
                                            placeholder = "Comment..."
                                            name = "comment"
                                            value = {comment}
                                            onChange = {(e) => setComment(e.target.value)}
                                            ref = {commentInputRef}
                                        />
                                        <button
                                            type = "submit"
                                            className = "ui blue button"
                                            disabled = {!comment}
                                            onClick = {createComment}
                                        >
                                            Submit
                                        </button>
                                        
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments.map(comment => (
                        <Card fluid key = {comment.id}>
                            <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId = {id} commentId = {comment.id}/>
                                )}
                                <Card.Header as = {Link} to = {`/profile/${comment.username}`}>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                                
                            </Card.Content>
                        </Card>
                    ))}
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


const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: String!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;


export default PostPage;