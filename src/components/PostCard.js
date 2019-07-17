import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import moment from 'moment'

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {

function likePost(){
    alert("like ")
}

function commentOnPost(){
    alert("comem ")
}

    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='green'>
                        <Icon name='heart' />
                    </Button>
                    <Label as='a' basic color='green' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentOnPost}>
                    <Button color='yellow' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='yellow' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )

}
export default PostCard;