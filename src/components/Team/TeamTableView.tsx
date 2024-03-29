import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Player} from "./Player/Player";
import PlayerMatchesModal from "./Player/PlayerMatchesModal/PlayerMatchesModal";
import './TeamTableView.scss';

interface TeamTableViewProps {
  inTradeMode?: boolean;
  team?: any;
}

const TeamTableView: React.FC<TeamTableViewProps> = ({ inTradeMode, team }) => {
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

  return (
      <div style={{ display: 'flex', justifyContent: 'space-between', overflow: 'auto'}}>
            <div>
              {!inTradeMode && <div className="team-name">
                <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f', flexWrap: 'wrap'}}>{team.name}</Typography>
              </div>}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {team.goalkeepers && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                  <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                      Goalkeepers
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                        <TableBody>
                          {team.goalkeepers && team.goalkeepers.map((goalie : Player) => (
                              inTradeMode ? (
                                  <div key={goalie.id}>
                                    <Button sx={{backgroundColor: '#e01a4f', color: '#fff', margin: '10px'}}>
                                      For {goalie.name}
                                    </Button>
                                  </div>
                              ) : (
                                  <TableRow key={goalie.id}>
                                    <TableCell>
                                      <IconButton onClick={() => handleOpenModal(goalie)}>
                                        <InfoIcon sx={{color:"#ffff"}} />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ color: '#ffff'}}>{goalie.name}</TableCell>
                                  </TableRow>
                              )
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>}
                {team.defenders && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                  <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                      Defenders
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                        <TableBody>
                          {team.defenders && team.defenders.map((defender : Player) => (
                              inTradeMode ? (
                                  <div key={defender.id}>
                                    <Button sx={{backgroundColor: '#e01a4f', color: '#fff', margin: '10px'}}>
                                      For {defender.name}
                                    </Button>
                                  </div>
                              ) : (
                                  <TableRow key={defender.id}>
                                    <TableCell>
                                      <IconButton onClick={() => handleOpenModal(defender)}>
                                        <InfoIcon sx={{color:"#ffff"}} />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ color: '#ffff'}}>{defender.name}</TableCell>
                                  </TableRow>
                              )
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>}
                {team.midfielders && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                  <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                      Midfielders
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                        <TableBody>
                          {team.midfielders && team.midfielders.map((midfielder : Player) => (
                              inTradeMode ? (
                                  <div key={midfielder.id}>
                                    <Button sx={{backgroundColor: '#e01a4f', color: '#fff', margin: '10px'}}>
                                      For {midfielder.name}
                                    </Button>
                                  </div>
                              ) : (
                                  <TableRow key={midfielder.id}>
                                    <TableCell>
                                      <IconButton onClick={() => handleOpenModal(midfielder)}>
                                        <InfoIcon sx={{color:"#ffff"}} />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ color: '#ffff'}}>{midfielder.name}</TableCell>
                                  </TableRow>
                              )
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>}
                {team.attackers && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                  <CardContent>
                    <Typography variant="h5" component="div" color='#fff'>
                      Attackers
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{bgcolor: inTradeMode ? "#0E131F" : "#1a213c"}}>
                        <TableBody>
                          {team.attackers && team.attackers.map((attacker : Player) => (
                              inTradeMode ? (
                                  <div key={attacker.id}>
                                    <Button sx={{backgroundColor: '#e01a4f', color: '#fff', margin: '10px'}}>
                                      For {attacker.name}
                                    </Button>
                                  </div>
                              ) : (
                                  <TableRow key={attacker.id}>
                                    <TableCell>
                                      <IconButton onClick={() => handleOpenModal(attacker)}>
                                        <InfoIcon sx={{color:"#ffff"}} />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ color: '#ffff'}}>{attacker.name}</TableCell>
                                  </TableRow>
                              )
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>}
                {selectedPlayer && (
                    <PlayerMatchesModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        player={selectedPlayer}
                        token={token}
                    />
                )}
              </div>
            </div>
      </div>
  );
}

export default TeamTableView;