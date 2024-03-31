import React from 'react';
import {
    Card,
    CardContent,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {motion} from 'framer-motion';

const DraftedPlayersTable: React.FC = () => {
    // Mock data
    const draftedPlayers = [
        {name: 'Player 1', position: 'Position 1', teamName: 'Team 1', totalPoints: 100, round: 1, pick: 1},
        {name: 'Player 2', position: 'Position 2', teamName: 'Team 2', totalPoints: 200, round: 2, pick: 2},
        // Add more players as needed
    ];

    const handleOpenModal = (player: any) => {
        console.log("Opening modal for player: ", player);
    }

    return (
            <div>
                <Card sx={{maxWidth: '90%', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                    <CardContent>
                        <TableContainer component={Paper}
                                        sx={{maxHeight: '600px', overflow: 'auto', bgcolor: '#1a213c'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color: '#fff'}}></TableCell>
                                        <TableCell sx={{color: '#fff'}}>Player</TableCell>
                                        <TableCell sx={{color: '#fff'}}>Position</TableCell>
                                        <TableCell sx={{color: '#fff'}}>Club</TableCell>
                                        <TableCell sx={{color: '#fff'}}>Total Points</TableCell>
                                        <TableCell sx={{color: '#fff'}}>Round</TableCell>
                                        <TableCell sx={{color: '#fff'}}>Pick</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {draftedPlayers.map((player, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <IconButton onClick={() => handleOpenModal(player)}
                                                            sx={{color: '#fff'}}>
                                                    <InfoIcon/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{color: '#fff'}}>{player.name}</TableCell>
                                            <TableCell sx={{color: '#fff'}}>{player.position}</TableCell>
                                            <TableCell sx={{color: '#fff'}}>{player.teamName}</TableCell>
                                            <TableCell sx={{color: '#fff'}}>{player.totalPoints}</TableCell>
                                            <TableCell sx={{color: '#fff'}}>{player.round}</TableCell>
                                            <TableCell sx={{color: '#fff'}}>{player.pick}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
    );
};

export default DraftedPlayersTable;