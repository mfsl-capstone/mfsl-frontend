import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import './SignUpPage.css';
import {blue} from "@mui/material/colors";
import {UserSignUp} from "../../api/signup";
import {UserLogin} from "../../api/login";
import {useAuth} from "../../components/AuthContext";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setPassword(value);
        if (value.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };
    const handleSignUp = async () => {
        try {
            await UserSignUp(username, password);
            const destination = await UserLogin(username, password, login);
            navigate(destination);
        } catch (error: any) {
            showError(error.message);
        }
    };

    const isFormFilled = () => {
        return username.trim() !== '' && password.trim() !== '' && password.trim().length >= 8;
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
                    <img src="images/MFSL2.png" style={{marginLeft: '52vh'}}/>
                </div>
            <div className="div2">
                <Typography variant="h5" align="center" gutterBottom className="sign-up-text">
                    Sign up
                </Typography>
                <TextField
                    required
                    label="Username"
                    variant="filled"
                    margin="dense"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="sign-up-input"
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    variant="filled"
                    margin="dense"
                    value={password}
                    onChange={handlePasswordChange} // Handle password change
                    className="sign-up-input"
                    error={passwordError !== ''}
                    helperText={passwordError}
                />
                <FormControlLabel
                    required
                    control={
                        <Checkbox
                            sx={{color: blue[50]}}
                            checked={isCheckboxChecked}
                            onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                        />
                    }
                    label={
                        <Typography variant="body1" style={{fontSize: '14px'}}>
                            I accept all terms and conditions
                        </Typography>}
                />
                <ToastContainer/>
                <Button
                    variant="contained"
                    className="sign-up-button"
                    onClick={handleSignUp}
                    disabled={!isCheckboxChecked || !isFormFilled()}
                >
                    Sign Up
                </Button>
            </div>
                </div>
        </>
    );
};

export default SignUpPage;
