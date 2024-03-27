import React, { Component} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Player} from "./Player/Player";
import PlayerMatchesModal from "./Player/PlayerMatchesModal/PlayerMatchesModal";

interface TeamTableViewProps {
  teamName: string;
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  attackers: Player[];
}

interface TeamTableViewState {
  selectedPlayer: Player | null;
  isModalOpen: boolean;
}

class TeamTableView extends Component<TeamTableViewProps, TeamTableViewState> {
  constructor(props: TeamTableViewProps) {
    super(props);
    this.state = {
      selectedPlayer: null,
      isModalOpen: false,
    };
  }

  handleOpenModal = (player: Player) => {
    this.setState({ selectedPlayer: player, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { teamName, goalkeepers, defenders, midfielders, attackers } = this.props;
    const { selectedPlayer, isModalOpen } = this.state;
    return (
        <div>
          <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{teamName}</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
              <CardContent>
                <Typography variant="h5" component="div" color='#fff'>
                  Goalkeepers
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{bgcolor: '#1a213c'}}>
                    <TableBody>
                      {goalkeepers.map((goalie : Player) => (
                          <TableRow key={goalie.id}>
                            <TableCell>
                              <IconButton onClick={() => this.handleOpenModal(goalie)}>
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
            </Card>
            <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
              <CardContent>
                <Typography variant="h5" component="div" color='#fff'>
                  Defenders
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{bgcolor: '#1a213c'}}>
                    <TableBody>
                      {defenders.map((defender : Player) => (
                          <TableRow key={defender.id}>
                            <TableCell>
                              <IconButton onClick={() => this.handleOpenModal(defender)}>
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
            </Card>
            <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
              <CardContent>
                <Typography variant="h5" component="div" color='#fff'>
                  Midfielders
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{bgcolor: '#1a213c'}}>
                    <TableBody>
                      {midfielders.map((midfielder : Player) => (
                          <TableRow key={midfielder.id}>
                            <TableCell>
                              <IconButton onClick={() => this.handleOpenModal(midfielder)}>
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
            </Card>
            <Card sx={{ minWidth: 275, margin: '10px', bgcolor: '#1a213c'}}>
              <CardContent>
                <Typography variant="h5" component="div" color='#fff'>
                  Attackers
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{bgcolor: '#1a213c'}}>
                    <TableBody>
                      {attackers.map((attacker : Player) => (
                          <TableRow key={attacker.id}>
                            <TableCell>
                              <IconButton onClick={() => this.handleOpenModal(attacker)}>
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
            </Card>
            {selectedPlayer && (
                <PlayerMatchesModal
                    open={isModalOpen}
                    onClose={this.handleCloseModal}
                    player={selectedPlayer}
                />
            )}
          </div>
        </div>
    );
  }
}

export default TeamTableView;