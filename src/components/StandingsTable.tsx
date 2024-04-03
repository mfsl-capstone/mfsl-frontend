import React, { useState } from 'react';
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
    rank: number; // Include rank in RowData interface
}

interface StandingsTableProps {
    currentUserTeam: string;
    standingsData: RowData[];
}

function StandingsTable({ currentUserTeam, standingsData }: StandingsTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof RowData, direction: 'ascending' | 'descending' } | null>(null);

    // Function to handle column header click event for sorting
    const handleSort = (key: keyof RowData) => {
        if (sortConfig && sortConfig.key === key) {
            // If already sorting by this key, toggle direction
            setSortConfig({
                key,
                direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
            });
        } else {
            // If not sorting by this key, set it to ascending
            setSortConfig({
                key,
                direction: 'ascending'
            });
        }
    };

    const sortedRows = sortConfig ? [...standingsData].sort((a, b) => {
        // Access properties using key
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    }) : standingsData;

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#fff' }}>Rank</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }} onClick={() => handleSort('team')}>Team</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }} onClick={() => handleSort('wins')}>W</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }} onClick={() => handleSort('draws')}>D</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }} onClick={() => handleSort('loses')}>L</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }} onClick={() => handleSort('teamPts')}>±</TableCell>
                            <TableCell align="center" style={{ color: '#F8FAFC' }} onClick={() => handleSort('leaguePts')}>League Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.map((row) => (
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
                                <TableCell align="center" style={{ color: '#fff' }}>{row.leaguePts}</TableCell>
                                <TableCell align="center" style={{ color: '#fff' }}>{row.teamPts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default StandingsTable;
