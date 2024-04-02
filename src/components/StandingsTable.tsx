import React from 'react';
import { Table, TableContainer } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface RowData {
    team: string;
    wins: number;
    draws: number;
    loses: number;
    teamPts: number;
    leaguePts: number;
}

interface StandingsTableProps {
    currentUserTeam: string;
    standingsData: RowData[];
}

function StandingsTable({ currentUserTeam, standingsData }: StandingsTableProps) {
    // Sort the rows based on league points
    const sortedRows = standingsData.slice().sort((a, b) => b.leaguePts - a.leaguePts);

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
