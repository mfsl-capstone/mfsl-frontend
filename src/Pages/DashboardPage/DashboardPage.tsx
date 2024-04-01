import React, {useState} from "react";
import {Typography, Card, CardContent, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import "./DashboardPage.scss";
import AllPlayersTable from "../../components/Team/Player/AllPlayersTable";
import {motion} from "framer-motion";

const DashboardPage: React.FC = () => {
    const [currentLeagueId, setCurrentLeagueId] = useState<string | null>(localStorage.getItem('chosenLeagueId'));
    while (currentLeagueId === null) {
        setCurrentLeagueId(localStorage.getItem('chosenLeagueId'));
    }
    return (
        <div className="home-page-header">
            <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                Current League - League Name
            </Typography>
            <Typography variant="h6" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                Team Name
            </Typography>
            <motion.div
                initial={{x: -100}}
                animate={{x: 0}}
                transition={{duration: 1}}
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
                                <Link to="/opponent" style={{color: '#fff', textDecoration: 'none'}}>
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
                                <Link to="/points" style={{color: '#fff', textDecoration: 'none'}}>
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
                initial={{x: 100}}
                animate={{x: 0}}
                transition={{duration: 1}}
            >
                <Card sx={{maxWidth: '90%', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{textAlign: 'center', color: "#ffff"}}>
                            Upcoming Deadline
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Link to="/gameweek31" style={{color: '#fff', textDecoration: 'none'}}>
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
                    <AllPlayersTable topPlayers={true}/>
                </>
        </div>
);
};

export default DashboardPage;