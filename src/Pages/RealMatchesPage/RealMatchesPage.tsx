import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Grid, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGameStats } from "../../api/game";
import MatchesCard from "./../../components/MatchesCard";
import "./RealMatchesPage.css";

interface GameData {
    id: number;
    date: number[];
    round: number;
    homeTeam: {
        teamId: number;
        name: string;
        url: string;
    };
    homeTeamScore: number;
    awayTeam: {
        teamId: number;
        name: string;
        url: string;
    };
    awayTeamScore: number;
}

function RealMatchesPage() {
    const token = localStorage.getItem('token');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10)); // Initial date is today
    const [games, setGames] = useState<GameData[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    }

    const getGames = async () => {
        try {
            setLoading(true);
            const response = await getGameStats(selectedDate, selectedDate, token);
            const gamesData = response.data.map((game: GameData) => {
                const date: number[] = game.date;
                const offsetInHours = new Date().getTimezoneOffset() / 60;
                offsetInHours > 0 ? date[3] -= offsetInHours : date[3] += offsetInHours;
                date[1] -= 1;
                console.log(date);
                const dateObject = new Date(date[0], date[1], date[2], date[3], date[4]);
                const userLocale = navigator.language;
                const dateString = dateObject.toLocaleString(userLocale, {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true  // Include AM/PM designation
                });
                return { ...game, dateString };
            });
            setGames(gamesData);
            setLoading(false);
        } catch (error: any) {
            showError(error);
        }
    };

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

    useEffect(() => {
        getGames();
    }, [selectedDate]); // Fetch games whenever the selected date changes

    const isGameCompleted = (game: GameData): boolean => {
        const currentDate = new Date();
        const gameDate = new Date(game.date[0], game.date[1], game.date[2], game.date[3], game.date[4]);
        return gameDate < currentDate;
    }

    return (
        <>
            <div className={games.length === 0 && !loading ? "fixture-page" : "fixture-page-container"}>
        <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>Matches</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '20px' }}>
            <TextField
                id="date"
                label="Select Date"
                variant="filled"
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                sx={{ marginLeft: '30px', backgroundColor: '#fff' }}
            />
        </Box>
        {games.length === 0 && !loading && (
            <Typography variant="h4" sx={{ textAlign: 'center', color: '#e01a4f' }}>There is no game on this date.</Typography>
        )}
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress sx={{ color: "#ff0000" }} />
            </div>
        ) : (
            <>
                <Grid container spacing={2}>
                    {games.map((game) => (
                        <Grid item xs={12} sm={6} md={3} key={game.id}>
                            <MatchesCard game={game} isCompleted={isGameCompleted(game)} />
                        </Grid>
                    ))}
                </Grid>
            </>
        )}
        <ToastContainer />
        </div>
    </>
)
}

export default RealMatchesPage;
