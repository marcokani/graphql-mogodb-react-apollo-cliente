import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
//import gql from 'graphql-tag'
import { Grid, Transition } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { FETCH_POST_QUERY } from '../util/graphql'

function Home() {

    const { user } = useContext(AuthContext);

    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POST_QUERY);

    return (
        <Grid columns={3} >
            <Grid.Row className="page-title">
                <h1>Posts recientes</h1>
            </Grid.Row>
            <Grid.Row>

                {
                    user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
                    )
                }

                {loading ? (
                    <h1>Loading Posts..</h1>
                ) : (
                        <Transition.Group animation='slide up'>
                            {
                                posts && posts.map(post => (
                                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )}
            </Grid.Row>
        </Grid>
    )
}

export default Home