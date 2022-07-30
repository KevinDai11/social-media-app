import React, {useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'
import {useNavigate} from 'react-router-dom'

import {useForm} from '../utils/hooks'

function Login(props) {
  const history = useNavigate()
  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values} = useForm(logUser,{
    username: '',
    password: '',
  })

  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(_, result) {
      history("/")
    },
    onError(err) { 
        setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  function logUser(){
    loginUser();
  }



  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Login</h1>

        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type='text'
          value = {values.username}
          error = {errors.username}
          onChange = {onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type='password'
          value = {values.password}
          error = {errors.password}
          onChange = {onChange}
        />
        <Button type = "submit" primary>Login</Button>
      </Form>

      {Object.keys(errors).length > 0 && (
         <div className='ui error message'>
         <ul className='list'>
           {Object.values(errors).map(value => <li key={value}>{value}</li>)}
         </ul>
       </div>
      )}
    </div>
  )
}

export default Login;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

