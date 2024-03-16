import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import MatchTable from '../../components/MatchTable';
import TeamPicker from '../../components/TeamPicker'
import './ResultsPage.css';


function ResultPage() {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>(''); // State to hold the current user's team name
    const resultsData = [
        {
            gameWeek: 1,
            matches: [
                { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 2, awayScore: 1 },
                { homeTeam: 'Team 2', awayTeam: 'Team 8', homeScore: 0, awayScore: 3 },
                { homeTeam: 'Team 3', awayTeam: 'Team 9', homeScore: 1, awayScore: 1 },
                { homeTeam: 'Team 4', awayTeam: 'Team 6', homeScore: 2, awayScore: 2 }

            ]
        },
        {
            gameWeek: 2,
            matches: [
                { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 2, awayScore: 4 },
                { homeTeam: 'Team 1', awayTeam: 'Team 8', homeScore: 4, awayScore: 7 },
                { homeTeam: 'Team 9', awayTeam: 'Team 5', homeScore: 6, awayScore: 3 },
                { homeTeam: 'Team 7', awayTeam: 'Team 9', homeScore: 2, awayScore: 0 }
            ]
        },
        {
            gameWeek: 4,
            matches: [
                { homeTeam: 'Team 4', awayTeam: 'Team 2', homeScore: 9, awayScore: 9  },
                { homeTeam: 'Team 5', awayTeam: 'Team 6', homeScore: 7, awayScore: 3 },
                { homeTeam: 'Team 7', awayTeam: 'Team 8', homeScore: 4, awayScore: 4 },
                { homeTeam: 'Team 1', awayTeam: 'Team 5', homeScore: 1, awayScore: 7 }

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
        <div className="results-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>League Results</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '20px' }}>
                <Typography variant="subtitle1" sx={{ textAlign: 'left', marginLeft: '30px', color: '#e01a4f', paddingRight:'10px'}}>Filter Matches:</Typography>
                <TeamPicker resultsData={resultsData} onTeamSelect={handleTeamSelect} />
            </Box>
            <div className="results-table-container">
                {resultsData.map((weekData, index) => (
                    <MatchTable key={index} gameWeek={weekData.gameWeek} matches={weekData.matches} showScore={true} currentTeam={currentUserTeam} selectedTeam={selectedTeam}/>
                ))}
            </div>
        </div>
    )
}

export default ResultPage;