import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

const navItems = ['Home', 'About', 'How to Play', 'Contact'];

function NavBar() {
    return (
        <>
            <AppBar component="nav" sx={{backgroundColor: '#1A213C'}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        MSFL
                    </Typography>
                    {navItems.map((item) => (
                        <Button key={item}
                                sx={{
                                    color: '#fff'
                                }}>
                            {item}
                        </Button>
                    ))}
                    <Button component={Link} to="/signup" sx={{backgroundColor: '#e01a4f', color: '#fff'}}>
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavBar;
