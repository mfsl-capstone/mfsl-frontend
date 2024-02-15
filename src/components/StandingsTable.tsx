import * as React from 'react';
import { Table, TableContainer } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
    rank: number,
    team: string,
    wins: number,
    draws: number,
    loses: number,
    teamPts: number,
    leaguePts: number
) {
    return { rank, team, wins, draws, loses, teamPts, leaguePts };
}

const rows = [
    createData(1, 'Team 1', 23, 36, 24, 40, 3),
    createData(2, 'Team 2', 21, 39, 37, 43, 4),
    createData(3, 'Team 3', 22, 16, 24, 60, 4),
    createData(4, 'Team 4', 25, 37, 67, 43, 6),
    createData(5, 'Team 5', 35, 12, 49, 39, 8),
    createData(6, 'Team 6', 36, 26, 49, 39, 8),
];

const currentUserTeam = 'Team 7';

function StandingsTable() {
    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#fff' }}> Rank </TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }}>Team & Manager</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }}>W</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }}>D</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }}>L</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }}>±</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }}>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.rank}
                                sx={{
                                    backgroundColor: row.team === currentUserTeam ? '#e01a4f' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: '#e01a4f',
                                    },
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row" style={{ color: '#fff' }}>
                                    {row.rank}
                                </TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.team}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.wins}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.draws}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.loses}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.teamPts}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.leaguePts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default StandingsTable;
