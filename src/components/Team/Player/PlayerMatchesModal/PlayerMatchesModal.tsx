import React, { useState } from "react";
import "./PlayerMatchesModal.scss";
import {Modal, Table, TableContainer, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
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

const resultsExplanationsGoalkeeper = {
    GW: 'Game Week',
    OPP: 'Opponent',
    PTS: 'Points',
    MP: 'Minutes Played',
    GS: 'Goals Scored',
    A: 'Assists',
    GC: 'Goals Conceded',
    CS: 'Clean Sheet',
    S: 'Saves',
    PS: 'Penalties Saved',
    PC: 'Penalties Conceded',
    PM: 'Penalties Missed',
    MR: 'Match Rating',
    YC: 'Yellow Cards',
    RC: 'Red Cards',
};

const resultsExplanationsAttacker = {
    GW: 'Game Week',
    OPP: 'Opponent',
    PTS: 'Points',
    MP: 'Minutes Played',
    GS: 'Goals Scored',
    A: 'Assists',
    SA: 'Shot Accuracy',
    PC: 'Penalties Conceded',
    PM: 'Penalties Missed',
    MR: 'Match Rating',
    YC: 'Yellow Cards',
    RC: 'Red Cards',
};

const resultsExplanationsDefender = {
    GW: 'Game Week',
    OPP: 'Opponent',
    PTS: 'Points',
    MP: 'Minutes Played',
    GS: 'Goals Scored',
    A: 'Assists',
    CS: 'Clean Sheet',
    S: 'Saves',
    PC: 'Penalties Conceded',
    PM: 'Penalties Missed',
    MR: 'Match Rating',
    YC: 'Yellow Cards',
    RC: 'Red Cards',
};

const resultsExplanationsMidfielder = {
    GW: 'Game Week',
    OPP: 'Opponent',
    PTS: 'Points',
    MP: 'Minutes Played',
    GS: 'Goals Scored',
    A: 'Assists',
    CS: 'Clean Sheet',
    PC: 'Penalties Conceded',
    PM: 'Penalties Missed',
    MR: 'Match Rating',
    YC: 'Yellow Cards',
    RC: 'Red Cards',
};


const fixturesExplanations = {
    GW: 'Game Week',
};

const HeaderExplanations = ({ explanations, style}: { explanations: Record<string, string>, style: React.CSSProperties }) => (
    <ul style={style}>
        {Object.entries(explanations).map(([header, explanation], index) => (
            <li key={index}><strong>{header}:</strong> {explanation}</li>
        ))}
    </ul>
);

// Define the results table
const resultsTable = (player: Player) => {
    let resultsExplanations: Record<string, string>;
    let gridTemplateColumns = 'repeat(4, 1fr)';
    switch (player.position) {
        case 'Goalkeeper':
            resultsExplanations = resultsExplanationsGoalkeeper;
            gridTemplateColumns = 'repeat(3, 1fr)';
            break;
        case 'Attacker':
            resultsExplanations = resultsExplanationsAttacker;
            break;
         case 'Defender':
            resultsExplanations = resultsExplanationsDefender;
            break;
        case 'Midfielder':
            resultsExplanations = resultsExplanationsMidfielder;
            break;
        default:
            throw new Error('Invalid player position ' + player.position);
    }
    return (
        <>
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
                            {player.position === 'Attacker' && <TableCell>SA</TableCell>}
                            {player.position === 'Goalkeeper' && <TableCell>GC</TableCell>}
                            {player.position !== 'Attacker' && <TableCell>CS</TableCell>}
                            {(player.position === 'Goalkeeper' || player.position === 'Defender') && <TableCell>S</TableCell>}
                            {player.position === 'Goalkeeper' && <TableCell>PS</TableCell>}
                            <TableCell>PC</TableCell>
                            <TableCell>PM</TableCell>
                            <TableCell>MR</TableCell>
                            <TableCell>YC</TableCell>
                            <TableCell>RC</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {player.results && player.results.length > 0 && player.results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell>{result.round}</TableCell>
                                <TableCell>{result.opp}</TableCell>
                                <TableCell>{result.score}</TableCell>
                                <TableCell>{result.points}</TableCell>
                                <TableCell>{result.minutes}</TableCell>
                                <TableCell>{result.goalsScored}</TableCell>
                                <TableCell>{result.assists}</TableCell>
                                {player.position === 'Attacker' && <TableCell>{result.shotAccuracy}%</TableCell>}
                                {player.position === 'Goalkeeper' && <TableCell>{result.goalsConceded}</TableCell>}
                                {player.position !== 'Attacker' &&
                                    <TableCell>{result.cleanSheet ? '✅' : '❌'}</TableCell>}
                                {(player.position === 'Goalkeeper' || player.position === 'Defender') &&
                                    <TableCell>{result.saves}</TableCell>}
                                <TableCell>{result.penaltiesCommitted}</TableCell>
                                <TableCell>{result.penaltiesMissed}</TableCell>
                                {player.position === 'Goalkeeper' && <TableCell>{result.penaltiesSaved}</TableCell>}
                                <TableCell>{result.rating}</TableCell>
                                <TableCell>{result.yellowCards}</TableCell>
                                <TableCell>{result.redCards}</TableCell>
                            </TableRow>
                        ))}
                        {player.totals && (
                            <TableRow>
                                <TableCell colSpan={3}><Typography variant="body1" style={{ fontWeight: 'bold' }}>Totals</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalPoints}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalMinutes}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalGoalsScored}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalAssists}</Typography></TableCell>
                                {player.position === 'Attacker' && <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.averageShotAccuracy}%</Typography></TableCell>}
                                {player.position === 'Goalkeeper' && <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalGoalsConceded}</Typography></TableCell>}
                                {player.position !== 'Attacker' && <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalCleanSheets}</Typography></TableCell>}
                                {(player.position === 'Goalkeeper' || player.position === 'Defender') && <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalSaves}</Typography></TableCell>}
                                {player.position === 'Goalkeeper' && <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalPenaltiesSaved}</Typography></TableCell>}
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalPenaltiesCommitted}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalPenaltiesMissed}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.averageRating}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalYellowCards}</Typography></TableCell>
                                <TableCell><Typography variant="body1" style={{ fontWeight: 'bold' }}>{player.totals.totalRedCards}</Typography></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <HeaderExplanations
                explanations={resultsExplanations}
                style={{display: 'grid', gridTemplateColumns: gridTemplateColumns}}
            />
        </>
    );
};

// Define the fixtures table
const fixturesTable = (player: Player) => (
    <>
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
                {player.fixtures && player.fixtures.length > 0 && player.fixtures.map((fixture, index) => (
                    <TableRow key={index}>
                        <TableCell>{fixture.date.toString()}</TableCell>
                        <TableCell>{fixture.round}</TableCell>
                        <TableCell>{fixture.opponent}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
        <HeaderExplanations explanations={fixturesExplanations} style={{}} />
    </>
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
                    {table === 'Results' ? resultsTable(player) : fixturesTable(player)}
                </div>
            </Box>
        </Modal>
    );
}

export default PlayerMatchesModal;