import React, {useEffect, useState} from 'react'; // will start working when connected to backend
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress
} from '@mui/material'; // will start working when connected to backend
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InfoIcon from '@mui/icons-material/Info';
import {Player} from './Player/Player';
import PlayerMatchesModal from './Player/PlayerMatchesModal/PlayerMatchesModal';

export const ProposedTrades: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token');

    // will start working when connected to backend
    const handleOpenModal = (player: Player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // mock trades data
    const userProposedTrades = [
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        }
    ];

    const userReceivedTrades = [
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        },
        {
            playerIn: {
                id: 1,
                name: 'Player 1'
            },
            playerOut: {
                id: 1,
                name: 'Player 1'
            }
        }
    ];

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', overflow: 'auto'}}>
                <div>
                    <Card sx={{width: '950px', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                        <CardContent>
                            <Typography variant="h4" sx={{color: '#ffff'}}>Trades You've Received</Typography>
                            <TableContainer component={Paper}
                                            sx={{maxHeight: '600px', overflow: 'auto', bgcolor: '#1a213c'}}>
                                <Table sx={{bgcolor: '#1a213c'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                            <TableCell sx={{color: '#ffff'}}>
                                                Player In
                                            </TableCell>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                            <TableCell sx={{color: '#ffff'}}>
                                                Player Out
                                            </TableCell>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userReceivedTrades.map((trade, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <IconButton>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: "#ffff"}}>
                                                    {trade.playerIn.name}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: "#ffff"}}>
                                                    {trade.playerOut.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color={"success"}>Accept</Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color={"error"}>Reject</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                    <Card sx={{width: '950px', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c'}}>
                        <CardContent>
                            <Typography variant="h4" sx={{color: '#ffff'}}>Trades You've Proposed</Typography>
                            <TableContainer component={Paper}
                                            sx={{maxHeight: '600px', overflow: 'auto', bgcolor: '#1a213c'}}>
                                <Table sx={{bgcolor: '#1a213c'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                            <TableCell sx={{color: '#ffff'}}>
                                                Player In
                                            </TableCell>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                            <TableCell sx={{color: '#ffff'}}>
                                                Player Out
                                            </TableCell>
                                            <TableCell sx={{color: '#ffff'}}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userProposedTrades.map((trade, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <IconButton>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: "#ffff"}}>
                                                    {trade.playerIn.name}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: "#ffff"}}>
                                                    {trade.playerOut.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Button sx={{bgcolor: '#e01a4f', color: '#ffff'}}>Cancel</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {selectedPlayer && <PlayerMatchesModal
                player={selectedPlayer}
                open={isModalOpen}
                onClose={handleCloseModal}
                token={token}/>}
        </div>
    )
};
