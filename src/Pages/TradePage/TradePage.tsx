import React, {useEffect, useState} from "react";
import TeamTableView from "../../components/Team/TeamTableView";
import "./TradePage.scss";
import {CircularProgress, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {getFantasyLeagueName} from "../../api/league";
import AllPlayersTable from "../../components/Team/Player/AllPlayersTable";
import {getPlayersFromPlayerIdsInOrder} from "../../api/team";
import {ProposedTrades} from "../../components/Team/ProposedTrades";
import {getDraftStatus} from "../../api/draft";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const TradePage: React.FC = () => {
    const [leagueId, setLeagueId] = useState<number>(parseInt(localStorage.getItem("chosenLeagueId") as string));
    while (leagueId === 0) {
        setLeagueId(parseInt(localStorage.getItem("chosenLeagueId") as string));
    }
    const [leagueName, setLeagueName] = useState<string>("");
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<any>({});
    const {mode} = useParams<{ mode: string }>();
    const [view, setView] = useState<string | undefined>(mode);
    const [draftStatus, setDraftStatus] = useState<string>("");

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
        const fetchDraftStatus = async () => {
            const status = await getDraftStatus(leagueId, token);
            setDraftStatus(status);
        };
        fetchDraftStatus().then();
    }, [leagueId, token]);

    useEffect(() => {
        const getTeam = async () => {
            try {
                setLoading(true);
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token');
                if (username) {
                    const team = await getPlayersFromPlayerIdsInOrder(username, token);
                    if (team) {
                        setTeam(team);
                    }
                    setLoading(false);
                }
            } catch (error: any) {
                throw new Error(error);
            }
        };
        getTeam().then();
    }, []);

    return (
        view !== 'All Players' && view !== 'Proposed Trades' ? <NotFoundPage/> :
            loading ? (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <CircularProgress sx={{color: "#ff0000"}}/>
                    </div>
                )
                :
                (
                    <div style={{display: 'flex', justifyContent: 'space-between', overflow: 'auto'}}>
                        <div className="trade-page-header">
                            <motion.div
                                initial={{opacity: 0, x: -100}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5}}
                            >
                                <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                    {leagueName}
                                </Typography>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    sx={{
                                        marginLeft: '1%',
                                        '& .MuiToggleButton-root': {
                                            color: '#fff',
                                            bgcolor: '#1a213c',
                                            '&.Mui-selected': {color: '#fff', bgcolor: '#e01a4f', fontWeight: 'bold'}
                                        }
                                    }}
                                >
                                    <ToggleButton value="All Players">All Players</ToggleButton>
                                    <ToggleButton value="Proposed Trades">Proposed Trades</ToggleButton>
                                </ToggleButtonGroup>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, x: -100}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5}}
                            >
                                {
                                    view === 'All Players'
                                        ?
                                        <AllPlayersTable currentTeam={team} draftStatus={draftStatus}/>
                                        :
                                        <ProposedTrades userProposedTrades={team.userProposedTrades}
                                                        userReceivedTrades={team.userReceivedTrades}/>
                                }
                            </motion.div>
                        </div>
                        <div className="team-view-table-container">
                            <TeamTableView team={team}/>
                        </div>
                    </div>
                )
    );
}

export default TradePage;