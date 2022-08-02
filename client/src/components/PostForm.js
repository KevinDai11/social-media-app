import React from "react";
import {Button, Form} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';


import {useForm} from '../utils/hooks'
import {FETCH_POSTS_QUERY} from '../utils/graphql';
function PostForm(){

    const {values, onChange, onSubmit} = useForm(createPostCB, {
        body: ''
        }
    );
    
    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                  getPosts: [result.data.createPost, ...data.getPosts],
                },
              });

            values.body = '';
        }
    });

    function createPostCB(){
        createPost();
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Text"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error = {error ? true : false}
                />
                <Button type="submit" color = "blue" style = {{marginBottom: 20}}>Submit</Button>
            </Form.Field>
        </Form>
        {error && 
            <div className="ui error message" style={{marginBottom: 20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        }
        </>
    )
}

export default PostForm;


const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id 
            body
            createdAt
            username
            likeCount
            likes{
                id
                username 
                createdAt
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;