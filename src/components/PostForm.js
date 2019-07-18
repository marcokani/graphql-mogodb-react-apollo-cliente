import React,{Fragment} from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'

import { FETCH_POST_QUERY } from '../util/graphql'

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {

            const data= proxy.readQuery({
                query: FETCH_POST_QUERY
            })
            data.getPosts=[result.data.createPost, ...data.getPosts]
            proxy.writeQuery({query:FETCH_POST_QUERY, data})
            console.log(result)
            values.body = ""
        }
    })

    function createPostCallback() {
        createPost()
    }
    return (
        <Fragment>
        <Form onSubmit={onSubmit}>
            <h1>Crear Post: </h1>
            <Form.Field>
                <Form.Input
                    placeholder='Hola mundo!!!'
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error?true:false}
                />
                <Button type="submit" color="green">
                    Guardar
                </Button>
            </Form.Field>
        </Form>
{
    error &&(
        <div className="ui error message" style={{marginBottom:20}}>
                    <ul className="list">
                        {/* {Object.values(errors).map(value => ( */}
                            <li>{error.graphQLErrors[0].message}</li>
                        {/* ))} */}
                    </ul>
                </div>
    )
}
</Fragment>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost(
    $body:String!
    ){
        createPost(
            body:$body
        ){
            id
            body
            createdAt
            username
            likes{
                id
                username
                createdAt
            }
            likeCount
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

export default PostForm
