import React, {useState} from 'react';
import {TextField, Button, Typography, FormControlLabel, Checkbox} from '@mui/material';
import './SignUpPage.css';
import NavBar from '../../components/NavBar';
import {blue} from "@mui/material/colors";

const SignUpPage: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleLogin = () => {
        console.log('Logging in with:', {username, password});
    };

    return (
        <>
            <div className="sign-up-container">
                <Typography variant="h5" align="center" gutterBottom className="sign-up-text">
                    Sign up
                </Typography>
                <TextField
                    required
                    label="Name"
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="sign-up-input"
                />
                <TextField
                    required
                    label="Username"
                    variant="outlined"
                    margin="dense"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="sign-up-input"
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="sign-up-input"
                />
                <FormControlLabel required
                                  control={
                                    <Checkbox sx={{color: blue[50]}}
                                              checked={isCheckboxChecked}
                                              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                                    />
                }
                                  label="I accept all terms and conditions"/>
                <Button variant="contained"
                        className="sign-up-button"
                        onClick={handleLogin}
                        disabled={!isCheckboxChecked}
                >
                    Sign Up
                </Button>
            </div>
        </>
    );
};

export default SignUpPage;
