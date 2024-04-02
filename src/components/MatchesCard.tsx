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
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    {!isCompleted ? gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Full Time'}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <img src={game.homeTeam.url} alt={game.homeTeam.name} style={{ width: '30px', height: '30px', marginBottom: '5px' }} />
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>{game.homeTeam.name}</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                        {isCompleted && (
                            <Typography variant="body1" sx={{ color: '#e01a4f', marginTop: 1 }}>
                                {`${game.homeTeamScore}`}
                            </Typography>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>

                        <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 1 }}>vs</Typography>

                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <img src={game.awayTeam.url} alt={game.awayTeam.name} style={{ width: '30px', height: '30px', marginBottom: '5px' }} />
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>{game.awayTeam.name}</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                        {isCompleted && (
                            <Typography variant="body1" sx={{ color: '#e01a4f', marginTop: 1 }}>
                                {`${game.awayTeamScore}`}
                            </Typography>
                        )}
                    </div>
                </div>


            </CardContent>
        </Card>
    );
}

export default GameCard;
// <div style={{ display: 'flex', alignItems: isCompleted ? 'end' : 'start', flexDirection: 'column' }}>
//     {!isCompleted ? (
//         <Typography variant="body1" sx={{ marginTop: 1 }}>vs</Typography>
//     ) : (
//         <Typography variant="body1" sx={{ color: '#e01a4f', marginTop: 1 }}>
//             {`${game.homeTeamScore} - ${game.awayTeamScore}`}
//         </Typography>
//     )}
// </div>