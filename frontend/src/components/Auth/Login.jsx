import { useRef, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import { UserContext } from '../Contexts/UserContext';

function Login() {
    const { setUserId } = useContext(UserContext);
    
    const usernameRef = useRef();
    const pinRef = useRef();

    const navigate = useNavigate();
    
    function handleLoginAttempt(e) {
        e?.preventDefault();

        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        if( !username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        api.post('/login', {
            username: username,
            password: pin
        })
        .then(response => {
            setUserId(username);
            navigate("../home", {replace: true});
        })
        .catch(error => {
            if(error.response && error.response.status === 401) {
                alert("The credentials provided were not valid. Please try again.");
            }
            else {
                alert("An error occurred during the login process. Please try again later.");
            }
        });
    }

  return <div className="container d-flex justify-content-center mt-5">
        <Form onSubmit={handleLoginAttempt}>
        <Form.Label htmlFor="usernameInput">Username</Form.Label>
        <Form.Control id="usernameInput" ref={usernameRef} className="w-auto" placeholder="Enter username" />
        <Form.Label htmlFor="pinInput">Pin</Form.Label>
        <Form.Control id="pinInput" type="password" ref={pinRef} className="w-auto" placeholder="Enter PIN" />
        <Button variant="success" type="submit" onClick={handleLoginAttempt} className="m-3">Submit</Button>
        </Form>
    </div>
}

export default Login;