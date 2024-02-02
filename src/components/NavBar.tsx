import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const navItems = ['Home', 'About', 'How to Play', 'Contact'];

function NavBar() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar component="nav" sx={{ backgroundColor: '#1A213C' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginRight: '50%'

                        }}
                    >
                        MFSL
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Button key={item} component={Link} to={`/${item.toLowerCase()}`} sx={{ color: '#fff', mx: 1 }}>
                                {item}
                            </Button>
                        ))}
                        <Button component={Link} to="/signup" sx={{ backgroundColor: '#e01a4f', color: '#fff' }}>
                            Sign Up
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                    anchor="right"
                    open={isDrawerOpen} onClose={() => toggleDrawer(false)}
                    sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: '#1A213C',
                    width: '250px',
                    padding: '20px',
                    color: '#fff',
                },
            }}>
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item} component={Link} to={`/${item.toLowerCase()}`} onClick={() => toggleDrawer(false)}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                    <ListItem component={Link} to="/signup" onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="Sign Up" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default NavBar;
