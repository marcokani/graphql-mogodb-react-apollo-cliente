import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard';

function Home() {
    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POST_QUERY);

    return (
        <Grid columns={3} >
            <Grid.Row className="page-title">
                <h1>Posts recientes</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading Posts..</h1>
                ) : (
                        posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{marginBottom:20}}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POST_QUERY = gql`
    {
        getPosts
        {
            id
            body
            createdAt
            username
            likeCount
            commentCount
            comments{
                id
                body
                createdAt
                username
            },
            likes{
            id
            createdAt
            username
            }  
        }   
    }
`
export default Home