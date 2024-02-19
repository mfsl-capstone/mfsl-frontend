import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MatchTable from '../../components/MatchTable';
import './FixturePage.css';

function FixturePage() {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>(''); // State to hold the current user's team name
    const resultsData = [
        {
            gameWeek: 1,
            matches: [
                { homeTeam: 'Team 1', awayTeam: 'Team 2' },
                { homeTeam: 'Team 2', awayTeam: 'Team 8',},
                { homeTeam: 'Team 4', awayTeam: 'Team 9',},
                { homeTeam: 'Team 6', awayTeam: 'Team 10',}

            ]
        },
        {
            gameWeek: 2,
            matches: [
                { homeTeam: 'Team 3', awayTeam: 'Team 4'},
                { homeTeam: 'Team 1', awayTeam: 'Team 8',},
                { homeTeam: 'Team 6', awayTeam: 'Team 9',},
                { homeTeam: 'Team 7', awayTeam: 'Team 10',}
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
    // const resultsData = [
    //     {
    //         gameWeek: 1,
    //         matches: [
    //             { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 2, awayScore: 1 },
    //             { homeTeam: 'Team 5', awayTeam: 'Team 3', homeScore: 3, awayScore: 2 }
    //         ]
    //     },
    //     {
    //         gameWeek: 2,
    //         matches: [
    //             { homeTeam: 'Team 4', awayTeam: 'Team 6', homeScore: 1, awayScore: 1 },
    //             { homeTeam: 'Team 3', awayTeam: 'Team 1', homeScore: 2, awayScore: 2 }
    //         ]
    //     },
    // ];

    useEffect(() => {
        setCurrentUserTeam("Team 1");
    }, []);

  return (
    <div className="fixture-page-container">
         <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>League Fixtures</Typography>
        <div className="fixture-table-container">
            {resultsData.map((weekData, index) => (
                <MatchTable key={index} gameWeek={weekData.gameWeek} matches={weekData.matches} showScore={true} currentTeam={currentUserTeam}/>
            ))}
        </div>

    </div>
  )
}

export default FixturePage;
