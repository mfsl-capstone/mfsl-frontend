import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './LoginPage.css';
import NavBar from '../../components/NavBar';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', { username, password });
    };

    return (
        <>
            <NavBar/>
        <div className="login-container">
            <Typography variant="h5" align="center" gutterBottom className="login-text">
                Login
            </Typography>
            <TextField
                label="Username"
                variant="outlined"
                margin="dense"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            <Button variant="contained" className="login-button" onClick={handleLogin}>
                Login
            </Button>
        </div>
        </>
    );
};

export default LoginPage;
