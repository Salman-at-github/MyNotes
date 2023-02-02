import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigation = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://127.0.0.1:5000/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      //get redir once auth token saved:
      navigation('/signin');
      props.showAlert("User created successfully", "success")

    }
    else {
      props.showAlert("Invalid cred or user already exists", "danger")
    }
  };
  const changeFormData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) //setCredentials({...whatever curr value is [whatever the name tag represents]: to its value })
  }

  return (<>
    <div className='my-3'>
      <h2>Create a free account</h2>
    </div>
    <div>
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" name='name' id='name' value={credentials.name} onChange={changeFormData} minLength={5} required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' id='email' value={credentials.email} onChange={changeFormData} required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' id='password' value={credentials.password} onChange={changeFormData} minLength={8} required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name='cpassword' id='cpassword' value={credentials.cpassword} onChange={changeFormData} />
        </Form.Group>

        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Passwords do not match!</Tooltip>}>
          <span className="d-inline-block">
            <Button variant="primary" type="submit" disabled={credentials.password !== credentials.cpassword}>
              Sign Up
            </Button>
          </span>
        </OverlayTrigger>
      </Form>
    </div>
    <div className='my-3'>
      <p>Already have an account? <Link to='/signin'>Login</Link> here.</p>
    </div>
  </>)
}

export default Signup
