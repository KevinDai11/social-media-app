import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';
import moment from 'moment';
import {Card, Image, Grid, Transition} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../utils/graphql';


export default function ProfilePage(props){

    const {user} = useContext(AuthContext);

    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)
    return (
        <Grid columns={1}>
            <Grid.Row className='profile-page'>
                <Card fluid>
                    <Card.Content>
                        <Image
                        floated='right'
                        size='mini'
                        src='https://i.scdn.co/image/ab6775700000ee8597cebb58486061db5b9a29de'
                        />
                        <Card.Header>{user.username}</Card.Header>
                        <Card.Meta>Joined {moment(user.createdAt).format('MMMM Do YYYY')}</Card.Meta>
                    </Card.Content>
                </Card>
            </Grid.Row>

            <Grid.Row>
                {user && <Grid.Column>
                    <PostForm />
                </Grid.Column>
                }
            </Grid.Row>      
            <Grid.Row>
                <h1>{user.username}'s Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (<h1>Loading Posts</h1>) :
                    (
                    <Transition.Group>
                        {posts && posts.map(post => ( post.username === user.username ? (
                            <Grid.Column key={post.id} style ={{ marginBottom: 20}}>
                                <PostCard post = {post} />
                            </Grid.Column>
                        ) : null ))}
                    </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}