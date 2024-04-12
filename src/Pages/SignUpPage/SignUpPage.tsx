import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import './SignUpPage.css';
import {blue} from "@mui/material/colors";
import {UserSignUp} from "../../api/signup";
import {UserLogin} from "../../api/login";
import {useAuth} from "../../components/AuthContext";
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from '@mui/material/DialogContentText';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [open, setOpen] = useState(false);
    const [canSignUp, setCanSignUp] = useState(false);
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

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAgree = () => {
        setIsCheckboxChecked(true);
        setCanSignUp(true);
        handleClose();
    }

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
                            onChange={() => setOpen(true)}
                        />
                    }
                    label={
                        <Typography variant="body1" style={{fontSize: '14px'}} onClick={handleOpen}>
                            I have read and accepted all terms and conditions
                        </Typography>}
                />
                <ToastContainer/>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>{"Terms and Conditions"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <ol>
                                <li><strong>Account Eligibility and Registration:</strong>
                                    <ul>
                                        <li>Users must be at least 13 years of age.</li>
                                        <li>Users under 18 require parental consent to register.</li>
                                    </ul>
                                </li>
                                <li><strong>Use of Service:</strong>
                                    <ul>
                                        <li>MFSL is for personal, non-commercial use only.</li>
                                        <li>Selling, trading, or transferring accounts to another user is not allowed.</li>
                                        <li>Users must ensure their use of MFSL does not violate local laws or regulations.</li>
                                    </ul>
                                </li>
                                <li><strong>Data Protection and Privacy:</strong>
                                    <ul>
                                        <li>We are committed to protecting your privacy and personal information. Our data use policies comply with the latest data protection regulations.</li>
                                        <li>User data will not be shared with third parties without consent, except as required by law.</li>
                                    </ul>
                                </li>
                                <li><strong>Prohibited Activities:</strong>
                                    <ul>
                                        <li>Betting, gambling, or any form of wagering through the MFSL platform is strictly prohibited.</li>
                                        <li>Users must not engage in activities that harm other users or the integrity of the game.</li>
                                        <li>Manipulation of game mechanics or exploitation of software bugs is not allowed.</li>
                                    </ul>
                                </li>
                                <li><strong>Encouraging Responsible Use:</strong>
                                    <ul>
                                        <li>MFSL incorporates features to promote balanced use, including:
                                            <ul>
                                                <li>Break reminders.</li>
                                                <li>Highlighting the importance of offline activities.</li>
                                                <li>Encouraging a community that values healthy competition.</li>
                                            </ul>
                                            <li>Users are encouraged to take regular breaks and maintain a balanced
                                                lifestyle.
                                            </li>
                                        </li>
                                    </ul>
                                </li>
                                <li><strong>Community Standards:</strong>
                                    <ul>
                                        <li>Users must behave respectfully towards others and not engage in harassment, abuse, or any behavior that infringes on the rights of others.</li>
                                        <li>Hate speech, discriminatory remarks, and threats of violence are strictly prohibited.</li>
                                        <li>MFSL reserves the right to suspend or ban users who violate community standards.</li>
                                    </ul>
                                </li>
                                <li><strong>Changes to Terms and Conditions:</strong>
                                    <ul>
                                        <li>MFSL reserves the right to modify these T&C at any time. Users will be notified of significant changes.</li>
                                    </ul>
                                </li>
                                <li><strong>Governing Law:</strong>
                                    <ul>
                                        <li>These terms shall be governed by the laws of the jurisdiction in which the service is based, without regard to its conflict of law provisions.</li>
                                    </ul>
                                </li>
                                <li><strong>Contact Information:</strong>
                                    <ul>
                                        <li>For any questions or concerns regarding these Terms and Conditions, please contact our support team at
                                            <a href="mailto:mfsl.capstone@gmail.com"> mfsl.capstone@gmail.com</a>.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            I Disagree
                        </Button>
                        <Button onClick={handleAgree}>
                            I Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    variant="contained"
                    className="sign-up-button"
                    onClick={handleSignUp}
                    disabled={!canSignUp || !isFormFilled()}
                >
                    Sign Up
                </Button>
            </div>
                </div>
        </>
    );
};

export default SignUpPage;
