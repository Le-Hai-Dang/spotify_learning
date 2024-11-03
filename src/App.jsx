// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const token = new URLSearchParams(hash.substring(1)).get("access_token");
        window.location.hash = "";
        setAccessToken(token);
    }, []);

    const handleLogout = () => {
        setAccessToken(null); // Reset accessToken khi logout
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={accessToken ? <Navigate to="/dashboard" /> : <Login />}
                />
                <Route
                    path="/dashboard"
                    element={accessToken ? <Dashboard accessToken={accessToken} onLogout={handleLogout} /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
