import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LeagueCard from "./LeagueCard";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {createLeague, getUserLeagues} from "../api/league";
import {CircularProgress} from "@mui/material";

interface LeagueModalProps {
    open: boolean;
}

interface LeagueInfo {
    leagueName: string;
    id: string;

}

const LeagueModal: React.FC<LeagueModalProps> = ({open}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [action, setAction] = useState<'join' | 'create' | null>(null);
    const [leaguesInfo, setLeaguesInfo] = useState<LeagueInfo[] | null>(null);
    const [leagueName, setLeagueName] = useState("");
    const [teamName, setTeamName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [draftDate, setDraftDate] = useState<Date | null>(null);
    const [color, setColor] = useState('');
    const lastPage = localStorage.getItem('lastPage');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // replace with the actual username

    const handleLeagueNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeagueName(event.target.value);
    };

    const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(event.target.value);
    };
    const handleJoinCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJoinCode(event.target.value);
    };

    const handleDraftDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateTime = event.target.value;
        if (selectedDateTime) {
            const localDate = new Date(selectedDateTime + 'Z');
            setDraftDate(localDate);
        } else {
            setDraftDate(null);
        }
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };
    const handleJoin = () => {
        setAction('join');
    };

    const handleCreate = () => {
        setAction('create');
    };

    const handleJoinForm = () => {
        //add api call
        handleClose();
    }
    const handleCreateForm = async () => {
        try {
            const formattedDraftDate = draftDate ? draftDate.toISOString().slice(0, 16) : '';
            const response = await createLeague(leagueName, formattedDraftDate, token);
            localStorage.setItem('chosenLeagueId', response);

        } catch (error: any) {
            showError(error.message);
        }
        navigate("/home");
    }

    const handleClose = () => {
        setAction(null);
        if (lastPage) {
            navigate(lastPage);
        } else {
            navigate('/');
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Ensure leaguesInfo is properly typed and initialized
    const filteredLeagues = leaguesInfo && leaguesInfo.length
        ? leaguesInfo
            .filter((info: any) =>
                info.leagueName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : [];


    const handleSelectLeague = (leagueId: string) => {
        handleClose();
        localStorage.setItem('chosenLeagueId', leagueId);
        navigate("/home"); // Redirect to home page when a league is selected
    };

    useEffect(() => {
        const getLeagues = async () => {
            try {
                if (username) {
                    setLoading(true);
                    const leaguesInfo = await getUserLeagues(token, username);
                    setLeaguesInfo(leaguesInfo);
                    setLoading(false);
                }
            } catch (error: any) {
                showError(error);
            }
        };
        getLeagues().then();
    }, []);

    const showError = (message: string): void => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                fontSize: "75%",
                color: "#0e131f",
            }
        });
    }
// when you cancel go back to selection modal for both
    // if user is only in one league then i don't show the search and cards
    //leagues before
    return (
        <>
            <Modal open={open} onClose={handleClose} sx={{color: '#1A213C', backgroundColor: '#1A213C'}}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        maxWidth: '30vw', // Set max width to 90vw for responsiveness
                        maxHeight: '60vh', // Set max height to 90vh for scrolling
                        overflowY: 'auto', // Enable vertical scrolling
                        bgcolor: '#1A213C',
                        border: '2px solid #e01a4f',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {action === null ? (
                        <Box>
                            <Typography variant="h6" component="h2" color="white" gutterBottom>
                                Leagues
                            </Typography>
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress sx={{ color: "#ff0000" }} />
                                </div>
                            ) : (
                                <>
                                    {(!leaguesInfo || leaguesInfo.length === 0) ? (
                                        <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                                            <Button onClick={handleJoin} sx={{backgroundColor: '#e01a4f', color: '#fff', mr: 1 }}>
                                                Join New
                                            </Button>
                                            <Button onClick={handleCreate} sx={{backgroundColor: '#e01a4f', color: '#fff', mr: 1}}>
                                                Create New
                                            </Button>
                                        </Box>
                                    ) : (
                                        <>
                                            <Box>
                                                <TextField
                                                    margin="dense"
                                                    id="search"
                                                    label="Search League"
                                                    type="text"
                                                    variant="filled"
                                                    fullWidth
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                    sx={{bgcolor: '#fff', marginBottom: '5%'}}
                                                />
                                                {loading ? (
                                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        <CircularProgress sx={{color: "#ff0000"}}/>
                                                    </div>
                                                ) : (
                                                    <Box sx={{
                                                        mt: 2,
                                                        maxWidth: '30vw',
                                                        maxHeight: '20vh',
                                                        overflowY: 'auto',
                                                    }}>
                                                        {filteredLeagues?.map((league: any) => (
                                                            <div key={league.id} onClick={() => handleSelectLeague(league.id)}>
                                                                <LeagueCard name={league.leagueName}
                                                                            onSelect={() => handleSelectLeague(league.id)}/>
                                                            </div>
                                                        ))}
                                                    </Box>
                                                )}
                                                <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                                                    <Button onClick={handleJoin} sx={{backgroundColor: '#e01a4f', color: '#fff', mr: 1,}}>
                                                        Join
                                                    </Button>
                                                    <Button onClick={handleCreate} sx={{backgroundColor: '#e01a4f', color: '#fff', mr: 1,}}>
                                                        Create
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </>
                                    )}
                                </>
                            )}
                        </Box>

                    ) : action === 'join' ? (
                        <Box>
                            <Typography variant="h6" component="h2" color="white" gutterBottom>
                                Join League
                            </Typography>
                            <TextField
                                margin="dense"
                                id="leagueName"
                                label="League Name"
                                type="text"
                                variant="filled"
                                fullWidth
                                value={leagueName}
                                onChange={handleLeagueNameChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                            />
                            <TextField
                                margin="dense"
                                id="joinCode"
                                label="Join Code"
                                type="text"
                                variant="filled"
                                fullWidth
                                value={joinCode}
                                onChange={handleJoinCodeChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                            />
                            <Typography variant="h6" component="h2" color="white" gutterBottom>
                                Your Team
                            </Typography>
                            <TextField
                                margin="dense"
                                id="teamName"
                                label="Team Name"
                                type="text"
                                variant="filled"
                                fullWidth
                                value={teamName}
                                onChange={handleTeamNameChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                            />

                            <TextField
                                select
                                margin="dense"
                                id="color"
                                label="Color"
                                variant="filled"
                                value={color}
                                onChange={handleColorChange}
                                fullWidth
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                            >
                                {['Red', 'Blue', 'White', 'Yellow'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button onClick={handleJoinForm} sx={{backgroundColor: '#e01a4f', color: '#fff', mx: 1}}>
                                Join League
                            </Button>
                            <Button onClick={handleClose} sx={{color: '#e01a4f'}}>
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="h6" component="h2" color="white" gutterBottom>
                                Create League
                            </Typography>
                            <TextField
                                margin="dense"
                                id="leagueName"
                                label="League Name"
                                type="text"
                                variant="filled"
                                fullWidth
                                value={leagueName}
                                onChange={handleLeagueNameChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                            />
                            <TextField
                                margin="dense"
                                id="draftDate"
                                label="Draft Date"
                                type="datetime-local"
                                variant="filled"
                                fullWidth
                                value={draftDate ? draftDate.toISOString().slice(0, 16) : ''}
                                onChange={handleDraftDateChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Typography variant="h6" component="h2" color="white" gutterBottom>
                                Your Team
                            </Typography>
                            <TextField
                                margin="dense"
                                id="teamName"
                                label="Team Name"
                                type="text"
                                variant="filled"
                                fullWidth
                                value={teamName}
                                onChange={handleTeamNameChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                            />
                            <TextField
                                select
                                margin="dense"
                                id="color"
                                label="Color"
                                variant="filled"
                                value={color}
                                onChange={handleColorChange}
                                sx={{bgcolor: '#fff', marginBottom: '5%'}}
                                fullWidth
                            >
                                {['Red', 'Blue', 'White', 'Yellow'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button onClick={handleCreateForm} sx={{backgroundColor: '#e01a4f', color: '#fff', mx: 1}}>
                                Create League
                            </Button>
                            <Button onClick={handleClose} sx={{color: '#e01a4f'}}>
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>
            <ToastContainer/>
        </>
    );
};

export default LeagueModal;
