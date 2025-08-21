import { useRef, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import { UserContext } from '../Contexts/UserContext';

export default function BadgerRegister() {

    const { setUserId } = useContext(UserContext);

    const usernameRef = useRef();
    const pinRef = useRef();
    const pinConfirmRef = useRef();

    const navigate = useNavigate();

    function handleRegisterAttempt(e) {
        e?.preventDefault();

        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        if( !username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        const confirmPin = pinConfirmRef.current.value;

        if(pin !== confirmPin) {
            alert("Your pins do not match!");
            return;
        }

        api.post('/register', {
            username: username,
            password: pin
        })
        .then(response => {
            setUserId(username);
            navigate("../home", {replace: true});
        })
        .catch(error => {
            if(error.response && error.response.status === 409) {
                alert("This username is already in use. Please choose a different one and try again.");
            }
            else {
                alert("An error occurred during the register process. Please try again later.");
            }
        });
    }

    return <>
        <div className="text-center">
        <br/>
        <h3>Create new user</h3>
        <sub>Fill out the fields below to register.</sub>
        <div className="container d-flex justify-content-center mt-5">
            <Form onSubmit={handleRegisterAttempt}>
                <Form.Label htmlFor="usernameInput">Username</Form.Label>
                <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
                <Form.Label htmlFor="pinInput">Pin</Form.Label>
                <Form.Control id="pinInput" type="password" ref={pinRef}></Form.Control>
                <Form.Label htmlFor="pinConfirmInput">Confirm Pin</Form.Label>
                <Form.Control id="pinConfirmInput" type="password" ref={pinConfirmRef}></Form.Control>
                <br/>
                <Button variant="success" type="submit" className="mb-2" onClick={handleRegisterAttempt}>Submit</Button>
                <br/>
                <Button variant="danger" className="mb-2" onClick={() => navigate("/login")}>Cancel</Button>
            </Form>
        </div>
        </div>
    </>
}