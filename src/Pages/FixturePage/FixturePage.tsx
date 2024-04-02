import React, {useEffect, useState} from 'react'
import {Typography} from '@mui/material';
import Box from "@mui/material/Box";
import MatchTable from '../../components/MatchTable';
import TeamPicker from "../../components/TeamPicker";
import './FixturePage.css';
import {getFixturesLeague} from "../../api/league";
import {toast} from "react-toastify";


function FixturePage() {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>(''); // State to hold the current user's team name
    const [fixturesData, setFixturesData] = useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const token = localStorage.getItem('token');
    const leagueId = localStorage.getItem('chosenLeagueId');
    const getFixtures = async () => {
        try {
            const responseData = await getFixturesLeague(leagueId, token);

            const transformedData = responseData.weeks.map((weekArray: any[]) => ({
                gameWeek: weekArray[0].weekNumber,
                matches: weekArray.map(match => ({
                    homeTeam: match.fantasyTeamA,
                    awayTeam: match.fantasyTeamB,
                    homeScore: match.teamAScore,
                    awayScore: match.teamBScore
                }))
            }));
            setFixturesData(transformedData); // Update the resultsData state with transformed data
        } catch (error) {
            showError("Error fetching data. Please try again later.");
        }
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
    }

    const handleTeamSelect = (team: string) => {
        setSelectedTeam(team); // Update the selected team state
    }

    useEffect(() => {
        getFixtures();
        setCurrentUserTeam("Team 1"); // Set default current user's team
    }, []);
    return (
        <div className="fixture-page-container">
            <Typography variant="h2" sx={{textAlign: 'left', marginLeft: '10px', color: '#e01a4f'}}>League
                Fixtures</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '20px'}}>
                <Typography variant="subtitle1"
                            sx={{textAlign: 'left', marginLeft: '30px', color: '#e01a4f', paddingRight: '10px'}}>Filter
                    Matches:</Typography>
                <TeamPicker resultsData={fixturesData} onTeamSelect={handleTeamSelect}/>
            </Box>
            <div className="fixture-table-container">
                {fixturesData.map((weekData, index) => (
                    <MatchTable key={index} gameWeek={weekData.gameWeek} matches={weekData.matches} showScore={false}
                                currentTeam={currentUserTeam} selectedTeam={selectedTeam}/>
                ))}
            </div>
        </div>
    )
}

export default FixturePage;