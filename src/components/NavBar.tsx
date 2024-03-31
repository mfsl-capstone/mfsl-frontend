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
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {Collapse, ListItemButton} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const navItemsAuthenticated: string[] = ['Home', 'My Team'];

const NavBar: React.FC = () => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [tablesAnchorEl, setTablesAnchorEl] = useState<null | HTMLElement>(null);
    const [transactionsAnchorEl, setTransactionsAnchorEl] = useState<null | HTMLElement>(null);
    const { logout } = useAuth();
    const [openTransactions, setOpenTransactions] = React.useState(false);
    const [openStatistics, setOpenStatistics] = React.useState(false);

    const handleTransactionsDropDown = () => {
        setOpenTransactions(!openTransactions);
    };

    const handleStatisticsDropDown = () => {
        setOpenStatistics(!openStatistics);
    };
    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };
    const location = useLocation();

    const storingLastPath = () => {
        localStorage.setItem('lastPage', location.pathname);
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
                        sx={{ display: { xs: 'block', lg: 'none' } }}
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
                            marginRight: '50%',
                        }}
                    >
                        MFSL
                    </Typography>

                    <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                        {navItemsAuthenticated.map((item) => (
                            <Button key={item} component={Link} to={`/${item.toLowerCase()}`} sx={{ color: '#fff', mx: 1 }}>
                                {item}
                            </Button>
                        ))}
                        <>
                            <Button
                                aria-controls="leagues-menu"
                                aria-haspopup="true"
                                component={Link}
                                to={`/leagueModal`}
                                onClick={storingLastPath}
                                sx={{ color: '#fff' }}
                            >
                                Leagues
                            </Button>
                            <Button
                                aria-controls="transactions-menu"
                                aria-haspopup="true"
                                onClick={(event: React.MouseEvent<HTMLElement>) => {
                                    setTransactionsAnchorEl(event.currentTarget);
                                }}
                                sx={{ color: '#fff', mx: 1 }}
                            >
                                Transactions
                                <ArrowDropDownIcon />
                            </Button>
                            <Menu
                                id="transactions-menu"
                                anchorEl={transactionsAnchorEl}
                                open={Boolean(transactionsAnchorEl)}
                                onClose={() => {
                                    setTransactionsAnchorEl(null);
                                }}
                                sx={{ '& .MuiPaper-root': { color: 'white', backgroundColor: '#1A213C' } }}
                            >
                                <MenuItem component={Link} to="/draftRoom" onClick={() => { setTransactionsAnchorEl(null); }}>
                                    Draft Room
                                </MenuItem>
                                <MenuItem component={Link} to="/trade" onClick={() => { setTransactionsAnchorEl(null); }}>
                                    Trade
                                </MenuItem>
                            </Menu>
                            <Button
                                aria-controls="tables-menu"
                                aria-haspopup="true"
                                onClick={(event: React.MouseEvent<HTMLElement>) => {
                                    setTablesAnchorEl(event.currentTarget);
                                }}
                                sx={{ color: '#fff', mx: -1 }}
                            >
                                My Statistics
                                <ArrowDropDownIcon />
                            </Button>
                            <Menu
                                id="tables-menu"
                                anchorEl={tablesAnchorEl}
                                open={Boolean(tablesAnchorEl)}
                                onClose={() => {
                                    setTablesAnchorEl(null);
                                }}
                                sx={{ '& .MuiPaper-root': { color: 'white', backgroundColor: '#1A213C' } }}
                            >
                                <MenuItem component={Link} to="/standings" onClick={() => { setTablesAnchorEl(null); }}>
                                    Standings
                                </MenuItem>
                                <MenuItem component={Link} to="/results" onClick={() => { setTablesAnchorEl(null); }}>
                                    Results
                                </MenuItem>
                                <MenuItem component={Link} to="/fixtures" onClick={() => { setTablesAnchorEl(null); }}>
                                    Fixtures
                                </MenuItem>
                            </Menu>

                            <Button component={Link} to={`/ResultsIrl`} sx={{ color: '#fff', mx: 1 }}>
                                Matches
                            </Button>
                            <Button onClick={logout} sx={{ backgroundColor: '#e01a4f', color: '#fff' }}>
                                Sign Out
                            </Button>
                        </>
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
                        color: '#fff',
                    },
                }}
            >
                <List>
                    {navItemsAuthenticated.map((item) => (
                        <ListItemButton key={item} component={Link} to={`/${item.toLowerCase()}`} onClick={() => toggleDrawer(false)}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    ))}
                    <ListItemButton component={Link} to="/leagueModal" onClick={() => { toggleDrawer(false); storingLastPath(); }}>
                        <ListItemText primary="Leagues" />
                    </ListItemButton>

                    <ListItemButton onClick={handleTransactionsDropDown}>
                        <ListItemText primary="Transactions" />
                        {openTransactions ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openTransactions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => {
                                toggleDrawer(false);}} component={Link}  to="/draftRoom" sx={{ pl: 4 }}>
                                <ListItemText primary="Draft Room" />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                toggleDrawer(false);}} component={Link} to="/trade" sx={{ pl: 4 }}>
                                <ListItemText primary="Trade" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleStatisticsDropDown}>
                        <ListItemText primary="My Statistics" />
                        {openStatistics ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openStatistics} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => {
                                toggleDrawer(false);}} component={Link}  to="/results" sx={{ pl: 4 }}>
                                <ListItemText primary="Results" />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                toggleDrawer(false);}} component={Link} to="/fixtures" sx={{ pl: 4 }}>
                                <ListItemText primary="Fixtures" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton  component={Link} to="/ResultsIrl" onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="Matches" />
                    </ListItemButton>
                    <ListItemButton  onClick={() => { toggleDrawer(false); logout(); }}>
                        <ListItemText primary="Sign Out" />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
};

export default NavBar;
