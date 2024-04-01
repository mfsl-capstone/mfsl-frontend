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
import {acceptTrade, rejectTrade} from "../../api/transaction";
import {useNavigate} from "react-router-dom";

interface ProposedTradesProps {
    userProposedTrades: {id: number, playerIn: {id: number, name: string}, playerOut: {id: number, name: string}}[];
    userReceivedTrades: {id: number, playerIn: {id: number, name: string}, playerOut: {id: number, name: string}}[];
}

export const ProposedTrades: React.FC<ProposedTradesProps> = ({userReceivedTrades, userProposedTrades}) => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [userProposedTradesState, setUserProposedTradesState] = useState<ProposedTradesProps["userProposedTrades"]>(userProposedTrades);
    const [userReceivedTradesState, setUserReceivedTradesState] = useState<ProposedTradesProps["userReceivedTrades"]>(userReceivedTrades);

    const navigate = useNavigate();

    const handleOpenModal = (player: Player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAcceptTrade = (id: number) => {
        // Accept trade
        acceptTrade(id).then((t : any) => {
            // filter out the accepted trade from the userReceivedTrades or the userProposedTrades depending on which one it is in
            if (t.status === "ACCEPTED") {
                navigate('/My Team');
            }
            else {
                const updatedUserReceivedTrades = userReceivedTradesState.filter(trade => trade.id !== t.id);
                const updatedUserProposedTrades = userProposedTradesState.filter(trade => trade.id !== t.id);
                setUserReceivedTradesState(updatedUserReceivedTrades);
                setUserProposedTradesState(updatedUserProposedTrades);
                console.log(t);
            }

        });
    }

    const handleRejectTrade = (id: number) => {
        // Reject trade
        rejectTrade(id).then((t : any) => {
            // filter out the rejected trade from the userReceivedTrades or the userProposedTrades depending on which one it is in
            const updatedUserReceivedTrades = userReceivedTradesState.filter(trade => trade.id !== t.id);
            const updatedUserProposedTrades = userProposedTradesState.filter(trade => trade.id !== t.id);
            setUserReceivedTradesState(updatedUserReceivedTrades);
            setUserProposedTradesState(updatedUserProposedTrades);
            console.log(t);
        });
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
                        <Card sx={{width: '95vh', maxHeight: '80vh', margin: '1vh', bgcolor: '#1a213c'}}>
                            <CardContent>
                                <Typography variant="h4" sx={{color: '#ffff'}}>Trades You've Received</Typography>
                                <TableContainer component={Paper}
                                                sx={{maxHeight: '60vh', overflow: 'auto', bgcolor: '#1a213c'}}>
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
                                            {userReceivedTradesState.map((trade, index) => (
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
                        <Card sx={{width: '95vh', maxHeight: '90vh', margin: '1vh', bgcolor: '#1a213c'}}>
                            <CardContent>
                                <Typography variant="h4" sx={{color: '#ffff'}}>Trades You've Proposed</Typography>
                                <TableContainer component={Paper}
                                                sx={{maxHeight: '60vh', overflow: 'auto', bgcolor: '#1a213c'}}>
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
                                            {userProposedTradesState.map((trade, index) => (
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
