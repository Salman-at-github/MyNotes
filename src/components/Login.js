import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props) => {
  const NavigateTo = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      //get redir once auth token saved:
      NavigateTo('/');
      props.showAlert("Logged in successfully", "success")

    }
    else {
      props.showAlert("Invalid credentials", "danger")
    }
  };
  const changeFormData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) //setCredentials({...whatever curr value is [whatever the name tag represents]: to its value })
  }
  return (<>
    <div className=' my-3'>
      <h2 className='login my-3' id='hlogin'>Log into MyNotebook</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' id='email' value={credentials.email} onChange={changeFormData} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' id='password' value={credentials.password} onChange={changeFormData} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
    <div>
      <p>Don't have an account? <Link to='/signup'>Sign up</Link> here.</p>
    </div>
  </>)
}

export default Login
