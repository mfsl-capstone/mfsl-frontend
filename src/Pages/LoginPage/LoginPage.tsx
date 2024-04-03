import React, {useState} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import './LoginPage.css';
import {UserLogin} from '../../api/login';
import {useAuth} from "../../components/AuthContext";
import {useNavigate, Link as RouterLink} from "react-router-dom";
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
            showError(error.message);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && isFormFilled()) {
            handleLoginClick();
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
            <div className="parent">
                <div className="div1">
                    <img src="images/background1.jpg" className="soccer_player"/>
                </div>
                <div className="div1">
                    <img src="images/soccer_ball.png" style={{marginLeft: '50vh', marginTop: '20vh'}}/>
                </div>

                <div className="div1">
                    <img src="images/MFSL.png" style={{marginLeft: '9vh', marginTop: '20vh'}}/>
                    <img src="images/mfsl_motto.png"style={{marginLeft: '9vh', marginTop: '3vh'}}/>
            </div>

                <div className="div2">
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
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="filled"
                        margin="dense"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        onKeyDown={handleKeyDown}
                    />
                    <ToastContainer/>
                    <Button
                        variant="contained"
                        className="login-button"
                        onClick={handleLoginClick}
                        disabled={!isFormFilled()}
                    >
                        Login
                    </Button>
                    <div className="create-account-text">
                        <Typography variant="body1" align="center">
                            New here? <RouterLink to="/signup">Create an account</RouterLink>
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
