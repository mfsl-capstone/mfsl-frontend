import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import MatchTable from '../../components/MatchTable';
import TeamPicker from '../../components/TeamPicker';
import './ResultsPage.css';
import { getResultsLeague } from "../../api/league";
import { toast } from "react-toastify";


function ResultPage() {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>(''); // State to hold the current user's team name
    const [resultsData, setResultsData] = useState<any[]>([]); // Initialize resultsData state as an empty array
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const token = localStorage.getItem('token');
    const leagueId = localStorage.getItem('chosenLeagueId');
    useEffect(() => {
        // Fetch results data when the component mounts
        getResults();
        setCurrentUserTeam("Team 1"); // Set default current user's team
    }, []);

    const getResults = async () => {
        try {
            const responseData = await getResultsLeague(leagueId, token);

            const transformedData = responseData.weeks.map((weekArray: any[]) => ({
                gameWeek: weekArray[0].weekNumber,
                matches: weekArray.map(match => ({
                    homeTeam: match.fantasyTeamA,
                    awayTeam: match.fantasyTeamB,
                    homeScore: match.teamAScore,
                    awayScore: match.teamBScore
                }))
            }));
            setResultsData(transformedData); // Update the resultsData state with transformed data
        } catch (error) {
            showError("Error fetching data. Please try again later.");
        }
    };

    const handleTeamSelect = (team: string) => {
        setSelectedTeam(team); // this fix will be done on a future pr
    };

    const showError = (message: string): void => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                fontSize: "75%",
                color: "#0e131f",
            }
        });
    };

    return (
        <div className="results-page-container">
            <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>League Results</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '20px'}}>
                <Typography variant="subtitle1"
                            sx={{textAlign: 'left', marginLeft: '30px', color: '#e01a4f', paddingRight: '10px'}}>Filter Matches:</Typography>
                <TeamPicker resultsData={resultsData} onTeamSelect={handleTeamSelect}/>
            </Box>
            <div className="results-table-container">
                {resultsData.map((weekData, index) => (
                    <MatchTable key={index} gameWeek={weekData.gameWeek} matches={weekData.matches} showScore={true}
                                currentTeam={currentUserTeam} selectedTeam={selectedTeam}/>
                ))}
            </div>
        </div>
    );
}

export default ResultPage;
