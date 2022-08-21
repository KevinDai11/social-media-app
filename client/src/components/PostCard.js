import React, {useContext} from 'react';
import {Card, Image, Button} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PopUp from '../utils/PopUp';

export default function PostCard({post : {id, body, createdAt, username, likeCount, likes, commentCount, comments}}) {


    const {user} = useContext(AuthContext);
    
    return(
        <Card fluid>
            <Card.Content as = {Link} to ={`/profile/${username}`}>
                <Image
                    floated='right'
                    size='mini'
                    src='https://i.scdn.co/image/ab6775700000ee8597cebb58486061db5b9a29de'
                    />
                <PopUp content = {`View ${username}'s Profile`}>
                        <Card.Header>{username}</Card.Header>
                </PopUp>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            </Card.Content>

          
                
            <Card.Content as = {Link} to ={`/posts/${id}`}>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
                


            <Card.Content extra>
                <LikeButton user = {user} post = {{id, likes, likeCount}}/>
                <PopUp
                    content = "Comment on post" >
                        <Button
                        as = {Link}
                        to = {`/posts/${id}`}
                        color='teal'
                        icon = {`${commentCount}` > 1 ? 'comments' : 'comment'}
                        basic = {`${commentCount}` === 0}
                        label={{ basic: true, color: 'teal', pointing: 'left', content: `${commentCount}` }}
                        />
                </PopUp>
                
                {user && user.username === username && (
                    <DeleteButton postId = {id}/>
                )}
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

    )

}