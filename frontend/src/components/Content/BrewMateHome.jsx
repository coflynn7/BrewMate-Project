import React from "react";

import Login from '../Auth/Login';

function BrewMateHome () {
    return <div className="text-center">
        <h1>Welcome to BrewMate!</h1>
        <p>Please login to get started.</p>
        <Login />
        <p>TO DO: add register and continue as guest options</p>
    </div>
}

export default BrewMateHome;