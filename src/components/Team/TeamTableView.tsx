import React, { useEffect, useState } from "react";
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
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Player} from "./Player/Player";
import PlayerMatchesModal from "./Player/PlayerMatchesModal/PlayerMatchesModal";
import './TeamTableView.scss';
import { getUserTeamByPosition } from "../../api/team";

const TeamTableView = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [team, setTeam] = useState<any>({});
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // replace with the actual username

  useEffect(() => {
    const getTeam = async () => {
      try {
        if (username) {
          const team = await getUserTeamByPosition(token, username);
          if (team) {
            setTeam(team);
          }
        }
      } catch (error: any) {
        throw new Error(error);
      }
    };
    getTeam().then();
  }, [username, token]);

  const handleOpenModal = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
      <div>
        <div className="team-name">
          <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{team.name}</Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {team.goalkeepers && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
            <CardContent>
              <Typography variant="h5" component="div" color='#fff'>
                Goalkeepers
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{bgcolor: '#1a213c'}}>
                  <TableBody>
                    {team.goalkeepers && team.goalkeepers.map((goalie : Player) => (
                        <TableRow key={goalie.id}>
                          <TableCell>
                            <IconButton onClick={() => handleOpenModal(goalie)}>
                              <InfoIcon sx={{color:"#ffff"}} />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ color: '#ffff'}}>{goalie.name}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>}
          {team.defenders && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
            <CardContent>
              <Typography variant="h5" component="div" color='#fff'>
                Defenders
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{bgcolor: '#1a213c'}}>
                  <TableBody>
                    {team.defenders &&  team.defenders.map((defender : Player) => (
                        <TableRow key={defender.id}>
                          <TableCell>
                            <IconButton onClick={() => handleOpenModal(defender)}>
                              <InfoIcon sx={{color:"#ffff"}}/>
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ color: '#ffff'}}>{defender.name}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>}
          {team.midfielders && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
            <CardContent>
              <Typography variant="h5" component="div" color='#fff'>
                Midfielders
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{bgcolor: '#1a213c'}}>
                  <TableBody>
                    {team.midfielders && team.midfielders.map((midfielder : Player) => (
                        <TableRow key={midfielder.id}>
                          <TableCell>
                            <IconButton onClick={() => handleOpenModal(midfielder)}>
                              <InfoIcon sx={{color:"#ffff"}} />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ color: '#ffff'}}>{midfielder.name}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>}
          {team.attackers && <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
            <CardContent>
              <Typography variant="h5" component="div" color='#fff'>
                Attackers
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{bgcolor: '#1a213c'}}>
                  <TableBody>
                    {team.attackers && team.attackers.map((attacker : Player) => (
                        <TableRow key={attacker.id}>
                          <TableCell>
                            <IconButton onClick={() => handleOpenModal(attacker)}>
                              <InfoIcon sx={{color:"#ffff"}} />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ color: '#ffff'}}>{attacker.name}</TableCell>
                        </TableRow>
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
  );
}

export default TeamTableView;