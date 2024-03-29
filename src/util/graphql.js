import gql from 'graphql-tag'

export const FETCH_POST_QUERY = gql`
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