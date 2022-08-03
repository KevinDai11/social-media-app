import React, {useContext} from 'react';
import {Card, Image, Button} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

export default function PostCard({post : {id, body, createdAt, username, likeCount, likes, commentCount, comments}}) {


    const {user} = useContext(AuthContext);

    return(
        <Card fluid>
            <Card.Content as ={Link} to ={`/posts/${id}`}>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user = {user} post = {{id, likes, likeCount}}/>
                <Button
                    as = {Link}
                    to = {`/posts/${id}`}
                    color='teal'
                    icon = {`${commentCount}` > 1 ? 'comments' : 'comment'}
                    basic = {`${commentCount}` === 0}
                    label={{ basic: true, color: 'teal', pointing: 'left', content: `${commentCount}` }}
                />
                {user && user.username === username && (
                    <DeleteButton postId = {id}/>
                )}

            </Card.Content>
        </Card>

    )

}