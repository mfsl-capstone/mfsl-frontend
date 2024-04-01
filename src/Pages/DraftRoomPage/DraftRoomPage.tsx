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
import {getUserTeamInfo} from "../../api/team";
import DraftedPlayersTable from "../../components/Team/Player/DraftedPlayersTable";
import {addSeconds, format} from "date-fns";
import AvailableDraftPlayersTable from "../../components/Team/Player/AvailableDraftPlayers";

const DraftRoomPage: React.FC = () => {
    const [leagueId, setLeagueId] = useState<number>(parseInt(localStorage.getItem("chosenLeagueId") as string));
    while (leagueId === 0) {
        setLeagueId(parseInt(localStorage.getItem("chosenLeagueId") as string));
    }
    const [leagueName, setLeagueName] = useState<string>("");
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState<any>({});
    const [timer, setTimer] = useState(30); // Timer state
    const [lastPick, setLastPick] = useState<string>('Last Pick by User 1');
    const [currentPick, setCurrentPick] = useState<string>('Current Pick User 2');
    const [draftStatus, setDraftStatus] = useState<string>('In Progress');
    const [view, setView] = useState<string>('Available Players');


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
                    const team = await getUserTeamInfo(token, username);
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
                if (prevTimer <= 1) {
                    // Update lastPick and currentPick here
                    setLastPick('New Last Pick by User 2');
                    setCurrentPick('New Current Pick User 3');
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
                        <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                            {leagueName}
                        </Typography>
                        {draftStatus === 'In Progress' && (
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
                        {draftStatus === 'Completed' &&
                            <Typography variant="h6" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                The draft has been completed!
                            </Typography>}
                        {draftStatus === 'Not Started' &&
                            <Typography variant="h3" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>
                                {'The draft will start in: ' + format(addSeconds(new Date(), 30), 'HH:mm:ss')}
                            </Typography>}
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
                                {draftStatus !== 'Completed' &&
                                    <ToggleButton value="Available Players">Available Players</ToggleButton>}
                                <ToggleButton value="Drafted Players">Drafted Players</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {
                            (view === 'Available Players' && draftStatus !== 'Completed')
                                ?
                                <AvailableDraftPlayersTable leagueId={leagueId}
                                                            currentTeam={team}
                                />
                                :
                                <DraftedPlayersTable/>
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