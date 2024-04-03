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
import {getPlayerById} from "../../../api/player";
import {Player} from "./Player";
import PlayerMatchesModal from "./PlayerMatchesModal/PlayerMatchesModal";

interface DraftedPlayersTableProps {
    draftedPlayers?: any[];
}

const DraftedPlayersTable: React.FC<DraftedPlayersTableProps> = ({draftedPlayers}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(null);

    const handleOpenModal = (player: Player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Card sx={{maxWidth: '90%', maxHeight: '80vh', margin: '10px', bgcolor: '#1a213c'}}>
                <CardContent>
                    <TableContainer component={Paper}
                                    sx={{maxHeight: '60vh', overflow: 'auto', bgcolor: '#1a213c'}}>
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
                                    <TableCell sx={{color: '#fff'}}>Manager</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {draftedPlayers?.map((player, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <IconButton onClick={ async () => handleOpenModal(await getPlayerById(player.id, localStorage.getItem('token')))}
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
                                        <TableCell sx={{color: '#fff'}}>{player.manager}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <div>
                {selectedPlayer && <PlayerMatchesModal
                    player={selectedPlayer}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    token={localStorage.getItem("token")}/>}
            </div>
        </div>
    );
};

export default DraftedPlayersTable;