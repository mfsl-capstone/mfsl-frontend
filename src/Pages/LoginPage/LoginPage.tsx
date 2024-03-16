import React, { useState} from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './LoginPage.css';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null)
    

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/login`, {
                params: {
                    username,
                    password
                }
            });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed');
            setError('Invalid username or password');
        }
    };


    const isFormFilled = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    return (
        <>
        <div className="login-container">
            <Typography variant="h5" align="center" gutterBottom className="login-text">
                Login
            </Typography>
            <TextField
                label="Username"
                variant="filled"
                margin="dense"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
            />
            <TextField
                label="Password"
                type="password"
                variant="filled"
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            {error && <Typography variant="body2" color="error" gutterBottom>{error}</Typography>}
            <Button variant="contained" className="login-button" onClick={handleLogin} disabled={!isFormFilled()}>
                Login
            </Button>
        </div>
        </>
    );
};

export default LoginPage;