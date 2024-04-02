import React, {useState} from 'react';
import {Button, TextField, Typography} from '@mui/material';
import './LoginPage.css';
import {UserLogin} from '../../api/login';
import {useAuth} from "../../components/AuthContext";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {
            const destination = await UserLogin(username, password, login);
            navigate(destination);

        } catch (error: any) {
            showError(error.message)
        }
    };

    const isFormFilled = () => {
        return username.trim() !== '' && password.trim() !== '';
    };
    const showError = (message: string): void => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                fontSize: "75%",
                color: "#0e131f",
            }
        });
    }

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
                <ToastContainer/>
                <Button variant="contained" className="login-button" onClick={handleLoginClick}
                        disabled={!isFormFilled()}>
                    Login
                </Button>
            </div>
        </>
    );
};

export default LoginPage;