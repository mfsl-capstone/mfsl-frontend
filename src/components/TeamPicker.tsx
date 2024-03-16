import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface TeamSelectorProps {
    resultsData: any[];
    onTeamSelect: (selectedTeam: string) => void; // Callback function to pass the selected team
}

const TeamPicker: React.FC<TeamSelectorProps> = ({ resultsData, onTeamSelect }) => {
    const [selectedTeam, setSelectedTeam] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const team = event.target.value;
        setSelectedTeam(team);
        onTeamSelect(team); // Call the callback function with the selected team
    };

    const teams = Array.from(new Set(resultsData.flatMap(weekData => weekData.matches.flatMap((match: { homeTeam: string; awayTeam: string; }) => [match.homeTeam, match.awayTeam]))))
        .sort((a, b) => a.localeCompare(b));
    return (
        <Select
            value={selectedTeam}
            onChange={handleChange}
            displayEmpty
            label="Filter Matches"
            sx={{
                backgroundColor: '#101523',
                width: '500px',
                color: '#fff',
                "& .MuiSvgIcon-root": { color: "white" },
                    "&:hover": {
                        "&& fieldset": {
                         border: "1px solid white"
                        }
                     }
            }}
        >
            <MenuItem value="">None</MenuItem>
            {teams.map((team) => (
                <MenuItem key={team} value={team}>{team}</MenuItem>
            ))}
        </Select>
    );
}

export default TeamPicker;
