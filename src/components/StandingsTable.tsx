import * as React from 'react';
import { Table, TableContainer } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
    team: string,
    wins: number,
    draws: number,
    loses: number,
    teamPts: number,
    leaguePts: number
) {
    return { team, wins, draws, loses, teamPts, leaguePts };
}
//mock data
const initialRows = [

    createData('Team 6', 31, 24, 20, 56, 20),
    createData('Team 7', 34, 28, 15, 59, 21),
    createData('Team 8', 33, 22, 18, 63, 22),
    createData('Team 10', 38, 19, 15, 77, 24),
    createData('Team 1', 26, 28, 21, 47, 13),
    createData('Team 2', 19, 32, 24, 37, 16),
    createData('Team 3', 30, 23, 22, 51, 17),
    createData('Team 4', 27, 21, 27, 45, 18),
    createData('Team 11', 39, 18, 13, 82, 25),
    createData('Team 12', 40, 20, 10, 85, 26),
    createData('Team 5', 42, 17, 9, 91, 28),
    createData('Team 9', 43, 16, 8, 94, 29),
];

const currentUserTeam = 'Team 1';

function StandingsTable() {
    // Sort the rows based on league points
    const sortedRows = initialRows.slice().sort((a, b) => b.leaguePts - a.leaguePts);

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
                        {sortedRows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: row.team === currentUserTeam ? '#e01a4f' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: '#e01a4f',
                                    },
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row" style={{ color: '#fff' }}>
                                    {index + 1}
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
