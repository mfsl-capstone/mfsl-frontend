import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGameStats } from "../../api/game";

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

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    }

    const getGames = async () => {
        try {
            const response = await getGameStats(selectedDate, selectedDate, token);
            const gamesData = response.data; // Extract data from the Axios response
            setGames(gamesData);
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
        const gameDate = new Date(game.date[0], game.date[1] - 1, game.date[2], game.date[3], game.date[4]);
        return gameDate < currentDate;
    }

    return (
        <div className="fixture-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>Matches</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '20px' }}>
                <TextField
                    id="date"
                    label="Select Date"
                    variant="filled"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    sx={{ marginLeft: '30px', backgroundColor:'#fff' }}
                />
            </Box>
            <Typography variant="h6" sx={{ textAlign: 'left', marginLeft: '10px', marginBottom: '10px', color: '#e01a4f' }}>Games on {selectedDate}</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ color: '#fff' }}>Home Team</TableCell>
                            {games.some(game => isGameCompleted(game)) ? (
                                <TableCell align="center" style={{ color: '#fff' }}>Score</TableCell>
                            ) : (
                                <TableCell align="center" style={{ color: '#fff' }}></TableCell>
                            )}
                            <TableCell align="center" style={{ color: '#fff' }}>Away Team</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map((game) => (
                            <TableRow key={game.id}>
                                <TableCell align="center" style={{ color: '#fff' }}>{game.homeTeam.name}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>
                                    {isGameCompleted(game) ?
                                        `${game.homeTeamScore} - ${game.awayTeamScore}` :
                                        "vs"}
                                </TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{game.awayTeam.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    )
}

export default RealMatchesPage;
