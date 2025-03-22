import {Row,Col,Form,FormGroup,FormLabel,Button} from "react-bootstrap"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const credentials = { username, password };
        
        props.handleLogin(credentials);
    };
  
    return (
      <Row>
        <Col lg={6} sm={9} className='mx-auto mt-4'>
          <Form onSubmit={handleSubmit} className="rounded-5 p-5 mb-3 bg-form border border-4 border-dark">
            <FormGroup>
              <FormLabel as="h4" className="mb-3 text-center d-block">Login</FormLabel>
            </FormGroup>
            <Form.Group controlId='username' className='mb-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
            </Form.Group>
  
            <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
            </Form.Group>
  
            <Button type='submit' variant="outline-light" className="bg-nav border border-dark">Login</Button>
            <Link to={'/'} ><Button data-bs-theme='dark' variant="outline-dark" className='bg-bd mx-2 my-2 text-white'>Continue as a Guest</Button></Link>
        </Form>
      </Col>
    </Row>
    )
  };

function LogoutButton(props) {
    return(
      <Button variant='outline-light' onClick={props.handleLogout}><i className="bi bi-box-arrow-right fs-5 align-middle"></i>{' '}Logout</Button>
    )
  }

export { LoginForm, LogoutButton };