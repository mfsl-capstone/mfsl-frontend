import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {Player} from "./Player/Player";
import PlayerMatchesModal from "./Player/PlayerMatchesModal/PlayerMatchesModal";
import './TeamTableView.scss';
import {motion} from "framer-motion";
import {signPlayer} from "../../api/transaction";
import {useNavigate} from "react-router-dom";

interface TeamTableViewProps {
    team?: any;
    inTradeMode?: boolean;
    inDraftMode?: boolean;
    playerIn?: Player;
    eligiblePlayers?: any;
}

const TeamTableView: React.FC<TeamTableViewProps> = ({team, inTradeMode, inDraftMode, playerIn, eligiblePlayers}) => {
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

    const navigate = useNavigate();

    const handleSwapPlayer = async (playerOut: Player) => {
        if (playerIn) {
            await signPlayer(playerIn.id, playerOut.id, team.id).then();
            if (playerIn.taken) {
                navigate('/Trade/Proposed Trades');
                window.location.reload();
            } else {
                navigate('/My Team');
            }
        }
    }
    let allPlayers: any = [];
    if (team) {
        allPlayers = team.goalkeepers?.concat(team.defenders, team.midfielders, team.attackers);
    }
    if (eligiblePlayers) {
        const eligibleIds = eligiblePlayers.map((player: any) => player.playerId);
        allPlayers = allPlayers.filter((player: Player) => eligibleIds.includes(player.id));
    }

    if (inTradeMode && allPlayers) {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', overflow: 'auto'}}>
                <TableContainer component={Paper}>
                    <Table sx={{bgcolor: "#0E131F"}}>
                        <TableBody>
                            {allPlayers && allPlayers?.map((player: Player) => (
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenModal(player)}>
                                            <InfoIcon sx={{color: "#ffff"}}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{color: '#ffff'}}>{player.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{backgroundColor: '#e01a4f', color: '#fff', margin: '10px'}}
                                            onClick={async () => {
                                                await handleSwapPlayer(player).then();
                                            }}
                                        >
                                            Swap
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selectedPlayer && (
                    <PlayerMatchesModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        player={selectedPlayer}
                        token={token}
                    />
                )}
            </div>
        );
    }

    const nameTypography = (
        <Typography variant="h2" sx={{
            textAlign: 'left',
            marginLeft: '10px',
            color: '#e01a4f',
            flexWrap: 'wrap'
        }}>{team.name}</Typography>
    );

    const table = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
        }}>
            <Card sx={{minWidth: 275, margin: '10px', bgcolor: "#1a213c"}}>
                <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                        Goalkeepers {inDraftMode && <Typography variant="caption" component="span"
                                                                color='#fff'>Min: 1</Typography>}
                    </Typography>
                    {team.goalkeepers && team.goalkeepers.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table sx={{bgcolor: "#1a213c"}}>
                                <TableBody>
                                    {team.goalkeepers.map((goalie: Player) => (
                                            <TableRow key={goalie.id}>
                                                <TableCell>
                                                    <IconButton onClick={() => handleOpenModal(goalie)}>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{goalie.name}</TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
            <Card sx={{minWidth: 275, margin: '10px', bgcolor: "#1a213c"}}>
                <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                        Defenders {inDraftMode && <Typography variant="caption" component="span"
                                                              color='#fff'>Min: 4</Typography>}
                    </Typography>
                    {team.defenders && team.defenders.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table sx={{bgcolor: "#1a213c"}}>
                                <TableBody>
                                    {team.defenders.map((defender: Player) => (
                                            <TableRow key={defender.id}>
                                                <TableCell>
                                                    <IconButton onClick={() => handleOpenModal(defender)}>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{defender.name}</TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
            <Card sx={{minWidth: 275, margin: '10px', bgcolor: "#1a213c"}}>
                <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                        Midfielders {inDraftMode && <Typography variant="caption" component="span"
                                                                color='#fff'>Min: 4</Typography>}
                    </Typography>
                    {team.midfielders && team.midfielders.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table sx={{bgcolor: "#1a213c"}}>
                                <TableBody>
                                    {team.midfielders.map((midfielder: Player) => (
                                            <TableRow key={midfielder.id}>
                                                <TableCell>
                                                    <IconButton onClick={() => handleOpenModal(midfielder)}>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{midfielder.name}</TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
            <Card sx={{minWidth: 275, margin: '10px', bgcolor: "#1a213c"}}>
                <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                        Attackers {inDraftMode && <Typography variant="caption" component="span"
                                                              color='#fff'>Min: 2</Typography>}
                    </Typography>
                    {team.attackers && team.attackers.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table sx={{bgcolor: "#1a213c"}}>
                                <TableBody>
                                    {team.attackers.map((attacker: Player) => (
                                            <TableRow key={attacker.id}>
                                                <TableCell>
                                                    <IconButton onClick={() => handleOpenModal(attacker)}>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{attacker.name}</TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
            {selectedPlayer && (
                <PlayerMatchesModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    player={selectedPlayer}
                    token={token}
                />
            )}
        </div>
    )

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <div className="team-name">
                    {!inDraftMode ? (
                        <motion.div
                            initial={{opacity: 0, x: -100}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            {nameTypography}
                        </motion.div>
                    ) : (nameTypography)}
                    {inDraftMode && <Typography variant="h6" sx={{
                        textAlign: 'left',
                        marginLeft: '10px',
                        color: '#e01a4f',
                        flexWrap: 'wrap'
                    }}>{allPlayers?.length || 0}/15</Typography>}
                </div>
                {!inDraftMode ? (
                    <motion.div
                        initial={{opacity: 0, x: 100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                    >
                        {table}
                    </motion.div>
                ) : (table)}
            </div>
        </div>
    );
}

export default TeamTableView;