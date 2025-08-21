import { Link } from "react-router-dom";
import Login from './Login';

function BrewMateLogin () {
    return <div className="text-center">
        <br/>
        <h1>Welcome to BrewMate!</h1>
        <h5>Please login to get started.</h5>
        <Login />
        <p>New here? <Link to="/register">Register Here</Link></p>
    </div>
}

export default BrewMateLogin;