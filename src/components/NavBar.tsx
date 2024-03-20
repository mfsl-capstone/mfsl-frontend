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
import { useAuth } from "./AuthContext";

const navItems = ['Home', 'About', 'How to Play', 'Contact'];
const navItemsAuthenticated = ['Home', 'Standings', 'Fixtures', 'Results'];

function NavBar() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => {
        setDrawerOpen(open);
    };
    const renderNavItems = isAuthenticated ? navItemsAuthenticated : navItems;

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
                        {renderNavItems.map((item) => (
                            <Button key={item} component={Link} to={`/${item.toLowerCase()}`} sx={{ color: '#fff', mx: 1 }}>
                                {item}
                            </Button>
                        ))}
                        {
                            isAuthenticated ? (
                                <Button onClick={logout} sx={{ backgroundColor: '#e01a4f', color: '#fff' }}>
                                    Sign Out
                                </Button>
                            ):(
                                <Button component={Link} to="/signup" sx={{ backgroundColor: '#e01a4f', color: '#fff' }}>
                                    Sign Up
                                </Button>
                            )
                        }

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
                    {
                        isAuthenticated ? (
                            <ListItem onClick={() => {toggleDrawer(false); logout();}}>
                                <ListItemText primary="Sign Out" />
                            </ListItem>
                        ) : (
                            <ListItem component={Link} to="/signup" onClick={() => toggleDrawer(false)}>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        )
                    }
                </List>
            </Drawer>
        </>
    );
}

export default NavBar;
