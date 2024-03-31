import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

interface Game {
    id: number;
    date: Date[];
    round: number;
    homeTeam: { name: string; url: string };
    homeTeamScore?: number;
    awayTeam: { name: string; url: string };
    awayTeamScore?: number;
}

const GameTable: React.FC<{ games: Game[] }> = ({ games }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Home Team</TableCell>
                    <TableCell>Away Team</TableCell>
                    <TableCell>Score</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {games.map((game, index) => (
                    <TableRow key={index}>
                        <TableCell>{game.homeTeam.name}</TableCell>
                        <TableCell>{game.awayTeam.name}</TableCell>
                        <TableCell>
                            {game.homeTeamScore !== undefined && game.awayTeamScore !== undefined
                                ? `${game.homeTeamScore} - ${game.awayTeamScore}`
                                : `${game.homeTeam.name} vs ${game.awayTeam.name}`}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const GamePage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetchGamesData(selectedDate);
    }, [selectedDate]);

    const fetchGamesData = async (date: Date) => {
        try {
            const response = await fetch(`https://your-api-url.com/games?date=${formatDate(date)}`);
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error('Error fetching games data:', error);
        }
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (daysToAdd: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + daysToAdd);
        setSelectedDate(newDate);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Games for {selectedDate.toDateString()}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => handleDateChange(-1)}>Previous Day</Button>
                <Button onClick={() => handleDateChange(1)}>Next Day</Button>
            </Grid>
            <Grid item xs={12}>
                <GameTable games={games} />
            </Grid>
        </Grid>
    );
};

export default GamePage;
