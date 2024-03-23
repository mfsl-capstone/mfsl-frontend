import React, { useState } from "react";
import "./PlayerMatchesModal.scss";
import {Modal, Table, TableContainer, ToggleButton, ToggleButtonGroup} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Player} from "../Player";
import Box from "@mui/material/Box";

// Define the PlayerMatchesModalProps interface
interface PlayerMatchesModalProps {
    open: boolean;
    onClose: () => void;
    player : Player;
}
// Define the explanations for the results table header
const headersExplanations = {
    OPP: 'Opponent',
    PTS: 'Points',
    MP: 'Minutes Played',
    GS: 'Goals Scored',
    A: 'Assists',
    GC: 'Goals Conceded',
    S: 'Saves',
    PS: 'Penalties Saved',
    PM: 'Penalties Missed',
    YC: 'Yellow Cards',
    RC: 'Red Cards',
};

// Define the Headers Explanations component
const HeadersExplanations = () => (
    <div className="headers-explanations">
        <ul>
            {Object.entries(headersExplanations).map(([header, explanation], index) => (
                <li key={index}><strong>{header}:</strong> {explanation}</li>
            ))}
        </ul>
    </div>
);

// Define the results table
const resultsTable = (player: Player) => (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>GW</TableCell>
                    <TableCell>OPP</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>PTS</TableCell>
                    <TableCell>MP</TableCell>
                    <TableCell>GS</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell>GC</TableCell>
                    <TableCell>S</TableCell>
                    <TableCell>PS</TableCell>
                    <TableCell>PM</TableCell>
                    <TableCell>YC</TableCell>
                    <TableCell>RC</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {player.results.map((result, index) => (
                    <TableRow key={index}>
                        <TableCell>{result.gameWeek}</TableCell>
                        <TableCell>{result.opponent}</TableCell>
                        <TableCell>{result.score}</TableCell>
                        <TableCell>{result.points}</TableCell>
                        <TableCell>{result.minutesPlayed}</TableCell>
                        <TableCell>{result.goalsScored}</TableCell>
                        <TableCell>{result.assists}</TableCell>
                        <TableCell>{result.goalsConceded}</TableCell>
                        <TableCell>{result.saves}</TableCell>
                        <TableCell>{result.penaltiesSaved}</TableCell>
                        <TableCell>{result.penaltiesMissed}</TableCell>
                        <TableCell>{result.yellowCards}</TableCell>
                        <TableCell>{result.redCards}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

// Define the fixtures table
const fixturesTable = (player: Player) => (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>GW</TableCell>
                    <TableCell>Opponent</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {player.fixtures.map((fixture, index) => (
                    <TableRow key={index}>
                        <TableCell>{fixture.date}</TableCell>
                        <TableCell>{fixture.gameWeek}</TableCell>
                        <TableCell>{fixture.opponent}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

// Define the PlayerMatchesModal component

const PlayerMatchesModal = ({ open, onClose, player }: PlayerMatchesModalProps) => {
    const [table, setTable] = useState('Results');

    const handleTableChange = (event: React.MouseEvent<HTMLElement>, newTable: string) => {
        if (newTable !== null) {
            setTable(newTable);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    height: '70%',
                    bgcolor: '#ffff',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex', // Use Flexbox for layout
                    flexDirection: 'column', // Stack children vertically
                    overflow: 'auto', // make the content scrollable
                    overflowX: 'auto', // hide the horizontal scrollbar
                }}>
                <div className="modal">
                    <div className="player-modal">
                        <img className="player-picture" src={player.pictureUrl} alt={player.name} />
                        <div className="player-text" style={{alignItems: 'center'}}>
                            <h2>{player.position}</h2>
                            <h1>{player.name}</h1>
                            <h3>{player.teamName}</h3>
                        </div>
                        <img className="team-image" src={player.teamPictureUrl} alt={player.teamName} />
                    </div>
                    <h1>This Season: {player.totalPoints} Points</h1>
                    <ToggleButtonGroup
                        color="primary"
                        value={table}
                        exclusive
                        onChange={handleTableChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="Results">Results</ToggleButton>
                        <ToggleButton value="Fixtures">Fixtures</ToggleButton>
                    </ToggleButtonGroup>
                    {table === 'Results' ? resultsTable(player) : fixturesTable(player) }
                    <ul>
                        <li><strong>GW:</strong> Game Week</li>
                    </ul>
                    {table === 'Results' && <HeadersExplanations /> }
                </div>
            </Box>
        </Modal>
    );
}

export default PlayerMatchesModal;