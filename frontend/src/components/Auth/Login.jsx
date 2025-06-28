import React, { useRef, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

function Login() {
    const usernameRef = useRef();
    const pinRef = useRef();
    const [greeting, setGreeting] = useState('');
    const navigate = useNavigate();
    
    function handleLoginAttempt(e) {
        e?.preventDefault();

        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        if( !username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        api.get('/login')
        .then(response => navigate("../search", {replace: true}))
        .catch(error => console.error('API error:', error));
    }

  return <div>
        <Form onSubmit={handleLoginAttempt}>
        <Form.Label htmlFor="usernameInput">Username</Form.Label>
        <Form.Control id="usernameInput" ref={usernameRef} className="w-auto" />
        <Form.Label htmlFor="pinInput">Pin</Form.Label>
        <Form.Control id="pinInput" type="password" ref={pinRef} className="w-auto"/>
        <Button variant="success" type="submit" onClick={handleLoginAttempt} className="m-3">Submit</Button>
        </Form>
    </div>
}

export default Login;