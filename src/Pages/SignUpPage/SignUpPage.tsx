import React, { useState } from 'react';
import { TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import './SignUpPage.css';
import {blue} from "@mui/material/colors";
import {UserSignUp} from "../../api/signup";
import {UserLogin} from "../../api/login";
import { useAuth } from "../../components/AuthContext";

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const {login} = useAuth();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
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
            await UserLogin(username, password, login);
        } catch (error:any) {
            setPasswordError(error.message);
        }
    };

    const isFormFilled = () => {
        return username.trim() !== '' && password.trim() !== '' &&  password.trim().length >= 8;
    };

    return (
        <>
            <div className="sign-up-container">
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
                            sx={{ color: blue[50] }}
                            checked={isCheckboxChecked}
                            onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                        />
                    }
                    label={
                                    <Typography variant="body1" style={{ fontSize: '14px' }}>
                                      I accept all terms and conditions
                                  </Typography>}
                />
                                  
                <Button
                    variant="contained"
                    className="sign-up-button"
                    onClick={handleSignUp}
                    disabled={!isCheckboxChecked || !isFormFilled()}
                >
                    Sign Up
                </Button>
            </div>
        </>
    );
};

export default SignUpPage;
