import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

interface GameData {
    id: number;
    date: number[];
    homeTeam: {
        name: string;
        url: string; // URL for the team logo
    };
    awayTeam: {
        name: string;
        url: string; // URL for the team logo
    };
    homeTeamScore: number;
    awayTeamScore: number;
}

interface GameCardProps {
    game: GameData;
    isCompleted: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isCompleted }) => {
    const gameDate = new Date(game.date[0], game.date[1] - 1, game.date[2], game.date[3], game.date[4]);

    return (
        <Card>
            <CardContent>
                {!isCompleted && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {`${gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </Typography>
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={game.homeTeam.url} alt={game.homeTeam.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>{game.homeTeam.name}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <img src={game.awayTeam.url} alt={game.awayTeam.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>{game.awayTeam.name}</Typography>
                </div>
                {isCompleted && (
                    <Typography variant="body1" sx={{ color: '#e01a4f', marginTop: '10px' }}>
                        {`${game.homeTeamScore} - ${game.awayTeamScore}`}
                    </Typography>
                )}
                {!isCompleted && (
                    <Typography variant="body1" sx={{ marginTop: '10px' }}>vs</Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default GameCard;
