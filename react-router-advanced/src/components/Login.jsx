import React from "react";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        // Logic to handle login, e.g., setting authentication token in local storage
        localStorage.setItem('authToken', 'your-token');
        navigate("/profile"); // Redirect to the profile after login
    };

    return(
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;