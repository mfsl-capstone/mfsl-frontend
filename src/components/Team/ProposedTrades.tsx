import React, {useState} from 'react';
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
    Typography
} from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InfoIcon from '@mui/icons-material/Info';
import {Player} from './Player/Player';
import PlayerMatchesModal from './Player/PlayerMatchesModal/PlayerMatchesModal';
import {motion} from 'framer-motion';
import {getPlayerById} from "../../api/player";

interface ProposedTradesProps {
    userProposedTrades: {id: number, playerIn: {id: number, name: string}, playerOut: {id: number, name: string}}[];
    userReceivedTrades: {id: number, playerIn: {id: number, name: string}, playerOut: {id: number, name: string}}[];
}

export const ProposedTrades: React.FC<ProposedTradesProps> = ({userReceivedTrades, userProposedTrades}) => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token');

    const handleOpenModal = (player: Player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAcceptTrade = (id: number) => {
        // Accept trade
        console.log("Trade accepted for id: ", id);
    }

    const handleRejectTrade = (id: number) => {
        // Reject trade
        console.log("Trade rejected for id: ", id);
    }

    return (
        <motion.div
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
        >
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
                                                        <IconButton onClick={ async () => handleOpenModal(await getPlayerById(trade.playerOut.id.toString(), token))}>
                                                            <InfoIcon sx={{color: "#ffff"}}/>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell sx={{color: "#ffff"}}>
                                                        {trade.playerOut.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={ async () => handleOpenModal(await getPlayerById(trade.playerIn.id.toString(), token))}>
                                                            <InfoIcon sx={{color: "#ffff"}}/>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell sx={{color: "#ffff"}}>
                                                        {trade.playerIn.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color={"success"} onClick={() => handleAcceptTrade(trade.id)}>Accept</Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color={"error"} onClick={() => handleRejectTrade(trade.id)}>Reject</Button>
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
                                                        <IconButton onClick={async () => handleOpenModal(await getPlayerById(trade.playerIn.id.toString(), token))}>
                                                            <InfoIcon sx={{color: "#ffff"}}/>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell sx={{color: "#ffff"}}>
                                                        {trade.playerIn.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={async () => handleOpenModal(await getPlayerById(trade.playerOut.id.toString(), token))}>
                                                            <InfoIcon sx={{color: "#ffff"}}/>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell sx={{color: "#ffff"}}>
                                                        {trade.playerOut.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            sx={{bgcolor: '#e01a4f', color: '#ffff'}} onClick={() => handleRejectTrade(trade.id)}>Cancel</Button>
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
        </motion.div>
    )
};
