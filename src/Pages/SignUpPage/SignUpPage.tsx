import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './SignUpPage.css';
import NavBar from '../../components/NavBar';

const SignUpPage: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', { username, password });
    };

    return (
        <>
            <NavBar/>
            <div className="sign-up-container">
                <Typography variant="h5" align="center" gutterBottom className="sign-up-text">
                    Login
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="sign-up-input"
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="dense"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="sign-up-input"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="sign-up-input"
                />

                <Button variant="contained" className="sign-up-button" onClick={handleLogin}>
                    Sign Up
                </Button>
            </div>
        </>
    );
};

export default SignUpPage;
