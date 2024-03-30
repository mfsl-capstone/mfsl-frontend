import React, {useEffect, useState} from "react";
import TeamTableView from "../../components/Team/TeamTableView";
import "./DraftRoomPage.scss";
import {CircularProgress, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {getFantasyLeagueName} from "../../api/league";
import AllPlayersTable from "../../components/Team/Player/AllPlayersTable";
import {getUserTeamByPosition} from "../../api/team";
import {motion} from "framer-motion";
import DraftedPlayersTable from "../../components/Team/Player/DraftedPlayersTable";

interface DraftRoomPageProps {
    leagueId: number;
}

const DraftRoomPage: React.FC<DraftRoomPageProps> = ({leagueId}) => {
    const [leagueName, setLeagueName] = useState<string>("");
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<any>({});
    const [view, setView] = useState<string>('Available Players');
    const [timer, setTimer] = useState(30); // Timer state
    const [lastPick, setLastPick] = useState<string>('Last Pick');
    const [currentPick, setCurrentPick] = useState<string>('Current Pick');

    const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string) => {
        if (newView !== null) {
            setView(newView);
        }
    }

    useEffect(() => {
        const fetchLeagueName = async () => {
            const name = await getFantasyLeagueName(leagueId, token);
            setLeagueName(name);
        };
        fetchLeagueName().then();
    }, [leagueId]);

    useEffect(() => {
        const getTeam = async () => {
            try {
                setLoading(true);
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token');
                if (username) {
                    const team = await getUserTeamByPosition(token, username);
                    if (team) {
                        setTeam(team);
                        setLoading(false);
                    }
                }
            } catch (error: any) {
                throw new Error(error);
            }
        };
        getTeam().then();
    }, []);

    // Timer logic
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 0) {
                    // Update lastPick and currentPick here
                    setLastPick('New Last Pick');
                    setCurrentPick('New Current Pick');
                    return 30;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    return (
        loading ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress sx={{color: "#ff0000"}}/>
                </div>
            )
            :
            (
                <div style={{display: 'flex', justifyContent: 'space-between', overflow: 'auto'}}>
                    <div className="draft-page-header">
                        <motion.div
                            initial={{opacity: 0, x: -100}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                {leagueName}
                            </Typography>
                            <motion.div
                                initial={{x: 0}}
                                animate={{x: timer === 0 ? '-100%' : 0}}
                                transition={{duration: 0.5}}
                            >
                                <Typography variant="h6" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                    Last Pick: {lastPick}
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial={{x: 0}}
                                animate={{x: timer === 0 ? '-100%' : 0}}
                                transition={{duration: 0.5}}
                            >
                                <Typography variant="h6" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                    Currently Picking: {currentPick}
                                </Typography>
                            </motion.div>
                            <Typography variant="h3" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                Time remaining: {timer} seconds
                            </Typography>
                            <ToggleButtonGroup
                                color="primary"
                                value={view}
                                exclusive
                                onChange={handleViewChange}
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        color: '#fff',
                                        bgcolor: '#1a213c',
                                        '&.Mui-selected': {color: '#fff', bgcolor: '#e01a4f', fontWeight: 'bold'}
                                    }
                                }}
                            >
                                <ToggleButton value="Available Players">Available Players</ToggleButton>
                                <ToggleButton value="Drafted Players">Drafted Players</ToggleButton>
                            </ToggleButtonGroup>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, x: -100}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            {
                                view === 'Available Players'
                                    ?
                                    <AllPlayersTable leagueId={leagueId}
                                                     currentTeam={team}
                                                     inDraftMode={true}/>
                                    :
                                    <DraftedPlayersTable/>
                            }
                        </motion.div>
                    </div>
                    <div className="team-view-table-container-draft">
                        <TeamTableView team={team}/>
                    </div>
                </div>
            )
    );
}

export default DraftRoomPage;