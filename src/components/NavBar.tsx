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
        <AppBar component="nav" sx={{ backgroundColor: '#1A213C' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => toggleDrawer(true)}
                    sx={{ display: { sm: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        marginRight: '50%',
                    }}
                >
                    MFSL
                </Typography>

                {/* Navigation items and Sign Up button on the right */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                    {navItems.map((item) => (
                        <Button key={item} sx={{ color: '#fff', mx: 1 }}>
                            {item}
                        </Button>
                    ))}
                    <Button component={Link} to="/signup" sx={{ backgroundColor: '#e01a4f', color: '#fff' }}>
                        Sign Up
                    </Button>
                </Box>

                <Drawer anchor="right" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
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
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
