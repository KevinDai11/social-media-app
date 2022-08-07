import React, {useContext} from  'react'
import {gql, useQuery} from '@apollo/client'
import {Card, Image, Grid, Button} from 'semantic-ui-react'
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import {AuthContext} from '../context/auth';
import DeleteButton from '../components/DeleteButton';
function PostPage(props) {
    const postId = useParams().postId;
    const {user} = useContext(AuthContext);
    const history = useNavigate();

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
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
                            <Card.Header>{username}</Card.Header>
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

export default PostPage;