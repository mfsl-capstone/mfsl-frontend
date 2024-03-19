import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import MatchTable from '../../components/MatchTable';
import TeamPicker from "../../components/TeamPicker";
import './FixturePage.css';


function FixturePage() {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>(''); // State to hold the current user's team name
    const resultsData = [
        {
            gameWeek: 1,
            matches: [
                { homeTeam: 'Team 1', awayTeam: 'Team 2' },
                { homeTeam: 'Team 2', awayTeam: 'Team 8',},
                { homeTeam: 'Team 3', awayTeam: 'Team 9',},
                { homeTeam: 'Team 4', awayTeam: 'Team 6',}

            ]
        },
        {
            gameWeek: 2,
            matches: [
                { homeTeam: 'Team 3', awayTeam: 'Team 4'},
                { homeTeam: 'Team 1', awayTeam: 'Team 8',},
                { homeTeam: 'Team 9', awayTeam: 'Team 5',},
                { homeTeam: 'Team 7', awayTeam: 'Team 9',}
            ]
        },
        {
            gameWeek: 4,
            matches: [
                { homeTeam: 'Team 4', awayTeam: 'Team 2' },
                { homeTeam: 'Team 5', awayTeam: 'Team 6',},
                { homeTeam: 'Team 7', awayTeam: 'Team 8',},
                { homeTeam: 'Team 1', awayTeam: 'Team 5',}

            ]
        },
        {
            gameWeek: 5,
            matches: [
                { homeTeam: 'Team 1', awayTeam: 'Team 6'},
                { homeTeam: 'Team 2', awayTeam: 'Team 5',},
                { homeTeam: 'Team 3', awayTeam: 'Team 3',},
                { homeTeam: 'Team 4', awayTeam: 'Team 2',}
            ]
        },
    ];

    const [selectedTeam, setSelectedTeam] = useState<string>('');

    const handleTeamSelect = (team: string) => {
        setSelectedTeam(team); // Update the selected team state
    }

    useEffect(() => {
        setCurrentUserTeam("Team 1");
    }, []);

    return (
        <div className="fixture-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>League Fixtures</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '20px' }}>
                <Typography variant="subtitle1" sx={{ textAlign: 'left', marginLeft: '30px', color: '#e01a4f', paddingRight:'10px'}}>Filter Matches:</Typography>
                <TeamPicker resultsData={resultsData} onTeamSelect={handleTeamSelect} />
            </Box>
            <div className="fixture-table-container">
                {resultsData.map((weekData, index) => (
                    <MatchTable key={index} gameWeek={weekData.gameWeek} matches={weekData.matches} showScore={false} currentTeam={currentUserTeam} selectedTeam={selectedTeam}/>
                ))}
            </div>
        </div>
    )
}

export default FixturePage;