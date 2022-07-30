import React, {useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'
import {useNavigate} from 'react-router-dom'

import {useForm} from '../utils/hooks'

function Register(props) {
  const history = useNavigate()
  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values} = useForm(registerUser,{
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [addUser, {loading}] = useMutation(REGISTER_USER_MUTATION, {
    update(_, result) {
      history("/")
    },
    onError(err) { 
        setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  function registerUser(){
    addUser();
  }



  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>

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
          label="Email"
          placeholder="Email"
          name="email"
          type='email'
          value = {values.email}
          error = {errors.email }
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type='password'
          value = {values.confirmPassword}
          error = {errors.confirmPassword}
          onChange = {onChange}
        />
        <Button type = "submit" primary>Register</Button>
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

export default Register;

const REGISTER_USER_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) 
  {
    register(registerInput: {username: $username, email: $email, password: $password, confirmPassword: $confirmPassword})
    {
      id
      email
      username
      createdAt
      token
    }
  }
`;