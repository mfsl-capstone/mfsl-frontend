import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LeagueModal from './LeagueModal';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const navItems: string[] = ['About', 'How to Play', 'Contact'];
const navItemsAuthenticated: string[] = ['Home', 'My Team'];

const NavBar: React.FC = () => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [leaguesAnchorEl, setLeaguesAnchorEl] = useState<null | HTMLElement>(null);
    const [tablesAnchorEl, setTablesAnchorEl] = useState<null | HTMLElement>(null);
    const [transactionsAnchorEl, setTransactionsAnchorEl] = useState<null | HTMLElement>(null);
    const [leagueModalOpen, setLeagueModalOpen] = useState<boolean>(false);
    const [leagueAction, setLeagueAction] = useState<'join' | 'create'>('join');
    const { isAuthenticated, logout } = useAuth();
    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };
    const handleLeagueModalOpen = (action: 'join' | 'create') => {
        setLeagueAction(action);
        setLeagueModalOpen(true);
    };
    const handleLeagueModalClose = () => {
        setLeagueModalOpen(false);
    };
    const renderNavItems: string[] = isAuthenticated ? navItemsAuthenticated : navItems;

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
                            <>
                                <Button
                                    aria-controls="transactions-menu"
                                    aria-haspopup="true"
                                    onClick={(event: React.MouseEvent<HTMLElement>) => { setTransactionsAnchorEl(event.currentTarget); }}
                                    sx={{ color: '#fff', mx: -1}}
                                >
                                    Transactions
                                    <ArrowDropDownIcon/>
                                </Button>
                                <Menu
                                    id="transactions-menu"
                                    anchorEl={transactionsAnchorEl}
                                    open={Boolean(transactionsAnchorEl)}
                                    onClose={() => { setTransactionsAnchorEl(null); }}
                                    sx = {{"& .MuiPaper-root": { color: "white" , backgroundColor: "#1A213C"}}}
                                >
                                    <MenuItem component={Link} to="/draftRoom" onClick={() => { setTransactionsAnchorEl(null); }}>Draft Room</MenuItem>
                                    <MenuItem component={Link} to="/trade" onClick={() => { setTransactionsAnchorEl(null); }}>Trade</MenuItem>
                                </Menu>
                                <Button
                                    aria-controls="leagues-menu"
                                    aria-haspopup="true"
                                    onClick={(event: React.MouseEvent<HTMLElement>) => { setLeaguesAnchorEl(event.currentTarget); }}
                                    sx={{ color: '#fff'}}
                                >
                                    Leagues
                                    <ArrowDropDownIcon />
                                </Button>
                                <Menu
                                    id="leagues-menu"
                                    anchorEl={leaguesAnchorEl}
                                    open={Boolean(leaguesAnchorEl)}
                                    onClose={() => { setLeaguesAnchorEl(null); }}
                                    sx = {{"& .MuiPaper-root": { color: "white" , backgroundColor: "#1A213C"}}}
                                >
                                    <MenuItem onClick={() => handleLeagueModalOpen('join')}>Join League</MenuItem>
                                    <MenuItem onClick={() => handleLeagueModalOpen('create')}>Create League</MenuItem>
                                </Menu>
                                <Button
                                    aria-controls="tables-menu"
                                    aria-haspopup="true"
                                    onClick={(event: React.MouseEvent<HTMLElement>) => { setTablesAnchorEl(event.currentTarget); }}
                                    sx={{ color: '#fff', mx: -1}}
                                >
                                    My Statistics
                                    <ArrowDropDownIcon/>
                                </Button>
                                <Menu
                                    id="tables-menu"
                                    anchorEl={tablesAnchorEl}
                                    open={Boolean(tablesAnchorEl)}
                                    onClose={() => { setTablesAnchorEl(null); }}
                                    sx = {{"& .MuiPaper-root": { color: "white" , backgroundColor: "#1A213C"}}}
                                >
                                    <MenuItem component={Link} to="/standings" onClick={() => { setTablesAnchorEl(null); }}>Standings</MenuItem>
                                    <MenuItem component={Link} to="/results" onClick={() => { setTablesAnchorEl(null); }}>Results</MenuItem>
                                    <MenuItem component={Link} to="/fixtures" onClick={() => { setTablesAnchorEl(null); }}>Fixtures</MenuItem>
                                </Menu>

                                <Button component={Link} to={`/ResultsIrl`} sx={{ color: '#fff', mx: 1 }}>
                                     Results
                                </Button>
                                <Button component={Link} to={`/FixturesIrl`} sx={{ color: '#fff', mx: 1 }}>
                                     Fixtures
                                </Button>
                            </>

                                <Button onClick={logout} sx={{ backgroundColor: '#e01a4f', color: '#fff'}}>
                                    Sign Out
                                </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => toggleDrawer(false)}
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
                        <ListItem onClick={() => { toggleDrawer(false); logout(); }}>
                            <ListItemText primary="Sign Out" />
                        </ListItem>
                </List>
            </Drawer>

            <LeagueModal
                open={leagueModalOpen}
                onClose={handleLeagueModalClose}
                action={leagueAction}
            />
        </>
    );
}

export default NavBar;
