import React, {useEffect, useState} from "react";
import TeamTableView from "../../components/Team/TeamTableView";
import "./DraftRoomPage.scss";
import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    LinearProgress,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {getFantasyLeagueName} from "../../api/league";
import {getPlayersFromPlayerIdsInOrder} from "../../api/team";
import DraftedPlayersTable from "../../components/Team/Player/DraftedPlayersTable";
import { formatDuration, intervalToDuration } from "date-fns";
import AvailableDraftPlayersTable from "../../components/Team/Player/AvailableDraftPlayersTable";
import {draftPlayer, getDraft} from "../../api/draft";

const DraftRoomPage: React.FC = () => {
    const [leagueId, setLeagueId] = useState<number>(parseInt(localStorage.getItem("chosenLeagueId") as string));
    while (leagueId === 0) {
        setLeagueId(parseInt(localStorage.getItem("chosenLeagueId") as string));
    }
    const [leagueName, setLeagueName] = useState<string>("");
    const token = localStorage.getItem("token");
    const [team, setTeam] = useState<any>({});
    const [timer, setTimer] = useState(30); // Timer state
    const [lastPick, setLastPick] = useState<string>('');
    const [currentPick, setCurrentPick] = useState<string>('');
    const [draftStatus, setDraftStatus] = useState<string>('LOADING');
    const [view, setView] = useState<string>('Available Players');
    const [draftDate, setDraftDate] = useState<Date | null>(null);
    const [draftedPlayers, setDraftedPlayers] = useState<any[]>([]);


    const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string) => {
        if (newView !== null) {
            setView(newView);
        }
    }

    const handleDraft = async (player: any) => {
        try {
            await draftPlayer(player.id, team.id, token);
            const draft = await getDraft(leagueId, token);
            setDraftStatus(draft.status);
            setLastPick(draft.lastPick);
            setCurrentPick(draft.currentPick);
            setTimer(30); // Reset the timer to 30 seconds
            await getTeam(); // Call getTeam after drafting a player
        } catch (error: any) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        const fetchLeagueName = async () => {
            const name = await getFantasyLeagueName(leagueId, token);
            setLeagueName(name);
        };
        fetchLeagueName().then();
    }, [leagueId]);

    const getTeam = async () => {
        try {
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('token');
            if (username) {
                const team = await getPlayersFromPlayerIdsInOrder(username, token);
                if (team) {
                    console.log("This is the team: ", team);
                    setTeam(team);
                }
            }
        } catch (error: any) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getTeam().then();
    }, []);

    // Timer logic
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer > 1 ? prevTimer - 1 : 30);
        }, 1000);

        return () => clearInterval(countdown);
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    useEffect(() => {
        if (timer <= 1) {
            getDraft(leagueId, token).then((draft: any) => {
                console.log("Transformed into: ", draft);
                setDraftStatus(draft.status);
                setLastPick(draft.lastPick);
                setCurrentPick(draft.currentPick);
                if (draft.status === 'IN_PROGRESS') {
                    const currentTime = new Date();
                    const endTime = new Date(draft.time_player_should_end);
                    const remainingTime = Math.round((endTime.getTime() - currentTime.getTime()) / 1000);
                    setTimer(remainingTime > 0 ? remainingTime : 0);
                    if (remainingTime <= 1) {
                        getTeam().then(() => {}); // Call getTeam when the timer restarts and the draft is in progress
                    }
                }
            })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }, [leagueId, token, timer]); // Dependencies



    useEffect(() => {
        const fetchDraft = async () => {
            const draft = await getDraft(leagueId, token);
            setDraftStatus(draft.status);
            setDraftDate(draft.date);
            function prepareDraftedPlayersData(draftedPlayers: any[], numTeams: number) {
                return draftedPlayers.map((draftedPlayer, index) => ({
                    id: draftedPlayer.playerIn.id,
                    name: draftedPlayer.playerIn.name,
                    position: draftedPlayer.playerIn.position,
                    teamName: (draftedPlayer.playerIn.team &&  draftedPlayer.playerIn.team.name) || 'No Club',
                    totalPoints: draftedPlayer.playerIn.points,
                    round: Math.ceil((index + 1) / numTeams),
                    pick: (index % numTeams) + 1,
                    manager: draftedPlayer.proposingFantasyTeam.teamName
                }));
            }
            setDraftedPlayers(prepareDraftedPlayersData(draft.draftedPlayers, draft.numTeams));
            setCurrentPick(draft.currentPick);
            setLastPick(draft.lastPick);
            if (draft.status === 'IN_PROGRESS') {
                // If the draft is in progress, set up the interval to poll every 3 seconds
                const interval = setInterval(() => {
                    getDraft(leagueId, token).then((draft: any) => {
                        setDraftStatus(draft.status);
                        setLastPick(draft.lastPick);
                        setCurrentPick(draft.currentPick);
                    })
                        .catch((error: any) => {
                            console.log(error);
                        });
                }, 3000);
                return () => clearInterval(interval); // Cleanup function to clear the interval when the component unmounts
            }
        };
        fetchDraft().then();
    }, [leagueId, token]); // Dependencies


    return (
        (draftStatus === 'LOADING') ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress sx={{color: "#ff0000"}}/>
                </div>
            )
            :
            (
                <div style={{display: 'flex', justifyContent: 'space-between', overflow: 'auto'}}>
                    <div className="draft-page-header">
                        <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                            {leagueName}
                        </Typography>
                        {draftStatus === 'IN_PROGRESS' && (
                            <Card sx={{maxWidth: '90%', margin: '10px', bgcolor: "#1a213c"}}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Typography variant="h6" color='#fff'>
                                                Last Pick
                                                <Typography variant="body1" color='#fff'>
                                                    {lastPick}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h6" color='#fff'>
                                                Currently Picking
                                                <Typography variant="body1" color='#fff'>
                                                    {currentPick}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h6" color='#fff'>
                                                Time remaining
                                                <Typography variant="body1" color='#fff' sx={{
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    {timer < 10 ? "00 : 0" : "00 : "}{timer}
                                                </Typography>
                                            </Typography>
                                            <LinearProgress variant="determinate" value={(timer / 30) * 100}
                                                            sx={{
                                                                height: '30%', bgcolor: "#1a213c",
                                                                '& .MuiLinearProgress-bar': {
                                                                    bgcolor: "#e01a4f"
                                                                }
                                                            }}/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}
                        {draftStatus === 'COMPLETED' &&
                            <Typography variant="h6" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                The draft has been completed!
                            </Typography>}
                        {draftStatus === 'NOT_STARTED' && draftDate && (
                            <Typography variant="h4" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                {'The draft will start in: ' + formatDuration(intervalToDuration({ start: new Date(), end: draftDate }), { format: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] })}
                            </Typography>
                        )}
                        <div style={{display: "flex", justifyContent: "inherit", marginLeft: "1%"}}>
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
                                {draftStatus !== 'COMPLETED' &&
                                    <ToggleButton value="Available Players">Available Players</ToggleButton>}
                                <ToggleButton value="Drafted Players">Drafted Players</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {
                            (view === 'Available Players' && draftStatus !== 'COMPLETED')
                                ?
                                <AvailableDraftPlayersTable draftStatus={draftStatus} handleDraft={handleDraft}/>
                                :
                                <DraftedPlayersTable draftedPlayers={draftedPlayers}/>
                        }
                    </div>
                    <div className="team-view-table-container-draft">
                        <TeamTableView team={team}
                                       inDraftMode={true}/>
                    </div>
                </div>
            )
    );
}

export default DraftRoomPage;