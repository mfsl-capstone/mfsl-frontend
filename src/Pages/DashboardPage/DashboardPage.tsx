import React, {useEffect, useState} from "react";
import {Typography, Card, CardContent, Grid, CircularProgress} from "@mui/material";
import { Link } from "react-router-dom";
import "./DashboardPage.scss";
import AllPlayersTable from "../../components/Team/Player/AllPlayersTable";
import {getFantasyLeagueName} from "../../api/league";
import {getDraftDate, getDraftStatus} from "../../api/draft";
import {getTeamName} from "../../api/team";
import {motion} from "framer-motion";

const DashboardPage: React.FC = () => {
    const [currentLeagueId, setCurrentLeagueId] = useState<string | null>(localStorage.getItem('chosenLeagueId'));
    while (currentLeagueId === null) {
        setCurrentLeagueId(localStorage.getItem('chosenLeagueId'));
    }
    const [leagueName, setLeagueName] = useState<string | null>(null);
    const [draftDate, setDraftDate] = useState<string | null>(null);
    const [teamName, setTeamName] = useState<string | null>(null);
    const [draftStatus, setDraftStatus] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        getFantasyLeagueName(Number(currentLeagueId), token).then((name) => {
            setLeagueName(name);
        });
        getDraftDate(Number(currentLeagueId), token).then((date) => {
            setDraftDate(date);
        });
        getDraftStatus(Number(currentLeagueId), token).then((status) => {
            setDraftStatus(status);
        });
        if (username) {
            getTeamName(token, username).then((teamName) => {
                setTeamName(teamName);
            });
        }
        setLoading(false);
    }, [leagueName, teamName, draftDate, draftStatus, token, username, currentLeagueId]);
    return (
        loading ? (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress sx={{color: "#ff0000"}}/>
            </div>
        ) : (
            <div className="home-page-header">
                <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                    Current League - {leagueName}
                </Typography>
                <Typography variant="h6" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                    {teamName}
                </Typography>
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5, delay: 0}}
                >
                    <Card sx={{maxWidth: '90%', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                Gameweek 30
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                        Opponent
                                    </Typography>
                                    <Link to="/head-to-head/402/403/30" style={{color: '#fff', textDecoration: 'none'}}>
                                        <Typography variant="body1" component="div"
                                                    sx={{textAlign: 'center', color: "#ffff"}}>
                                            Opponent Placeholder
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                        Points
                                    </Typography>
                                    <Link to="/head-to-head/402/403/30" style={{color: '#fff', textDecoration: 'none'}}>
                                        <Typography variant="body1" component="div"
                                                    sx={{textAlign: 'center', color: "#ffff"}}>
                                            Points Placeholder
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, x: 100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5, delay: 0}}
                >
                    <Card sx={{maxWidth: '90%', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                Upcoming Deadline
                            </Typography>
                            <Typography variant="body2" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                Opponent: Placeholder
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Link to="/My Team" style={{color: '#fff', textDecoration: 'none'}}>
                                        <Typography variant="h6" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                            Gameweek 31
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                        Date Placeholder
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </motion.div>
                <>
                    {draftStatus && draftStatus === 'NOT_STARTED' ? <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 0}}
                    >
                        <Card sx={{maxWidth: '90%', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                    The Draft has been scheduled for
                                </Typography>
                                <Typography variant="body2" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                                    {draftDate}
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div> : <AllPlayersTable topPlayers={true}/>
                    }
                </>
            </div>
        )
    );
};

export default DashboardPage;