import React, { Component} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@mui/material';
import { Player} from "./Player/Player";

interface TeamTableViewProps {
  teamName: string;
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  attackers: Player[];
}

class TeamTableView extends Component<TeamTableViewProps> {
  render() {
    const { teamName, goalkeepers, defenders, midfielders, attackers } = this.props;
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
                            <TableCell sx={{ color: '#ffff'}}>{attacker.name}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        </div>
    );
  }
}

export default TeamTableView;