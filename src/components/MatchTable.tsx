import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Typography from "@mui/material/Typography";

interface MatchTableProps {
  gameWeek: number;
  matches: {
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
  }[];
  showScore?: boolean;
  currentTeam?: string;
  selectedTeam?: string; // Add selectedTeam attribute
}

const MatchTable: React.FC<MatchTableProps> = ({ gameWeek, matches, showScore = true, currentTeam, selectedTeam }) => {
  // Filter matches based on selectedTeam
  const filteredMatches = selectedTeam ? matches.filter(match => match.homeTeam === selectedTeam || match.awayTeam === selectedTeam) : matches;

  return (
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6" sx={{ textAlign: 'left', marginLeft: '10px', marginBottom: '10px', color: '#e01a4f' }}>Game Week {gameWeek}</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ color: '#fff' }}>Home Team</TableCell>
                {showScore && <TableCell align="center" style={{ color: '#fff' }}>Score</TableCell>}
                {!showScore && <TableCell align="center" style={{ color: '#fff'}}></TableCell>}
                <TableCell align="center" style={{ color: '#fff' }}>Away Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMatches.map((match, index) => (
                  <TableRow key={index} sx={{
                    backgroundColor: match.homeTeam === currentTeam || match.awayTeam === currentTeam ? '#e01a4f' : 'inherit',
                    '&:hover': {
                      backgroundColor: '#e01a4f',
                    },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}>
                    <TableCell align="center" style={{ color: '#fff' }}>{match.homeTeam}</TableCell>
                    {showScore ? (match.homeScore && match.awayScore ? (
                        <TableCell align="center" style={{ color: '#fff' }}>{match.homeScore} - {match.awayScore}</TableCell>
                    ) : (
                        <TableCell align="center" style={{ color: '#fff' }}>v</TableCell>
                    )) : (
                        <TableCell align="center" style={{ color: '#fff' }}>v</TableCell>
                    )}
                    <TableCell align="center" style={{ color: '#fff' }}>{match.awayTeam}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default MatchTable;
