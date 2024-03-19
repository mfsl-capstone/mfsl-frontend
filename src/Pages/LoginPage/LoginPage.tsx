import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './LoginPage.css';
import { UserLogin } from '../../api/login';
import { useAuth } from "../../components/AuthContext";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const {login} = useAuth();

    const handleLoginClick = async () => {
        try {
            await UserLogin(username, password,login);
        } catch (error:any) {
            setError(error.message);
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
            <Button variant="contained" className="login-button" onClick={handleLoginClick} disabled={!isFormFilled()}>
                Login
            </Button>
        </div>
        </>
    );
};

export default LoginPage;