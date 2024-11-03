// src/components/Login.jsx
import React from 'react';
import { AUTH_URL } from '../spotify';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <h1 className="login-title">Spotify</h1>
            <a href={AUTH_URL}>
                <button className="login-button">Login</button>
            </a>
        </div>
    );
};

export default Login;
