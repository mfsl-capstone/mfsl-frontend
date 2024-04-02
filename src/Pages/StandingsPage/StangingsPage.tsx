import React, { useState, useEffect } from 'react';
import './StandingsPage.css';
import StandingsTable from "../../components/StandingsTable";
import Typography from "@mui/material/Typography";
import { getStandingsLeague } from "../../api/league";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TeamData {
    id: number;
    teamName: string;
    wins: number;
    ties: number;
    losses: number;
    points: number;
    fantasyPoints: number;
}

interface RowData {
    team: string;
    wins: number;
    draws: number;
    loses: number;
    teamPts: number;
    leaguePts: number;
}

const StandingsPage: React.FC = () => {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>('Team 1');
    const [standingsData, setStandingsData] = useState<RowData[]>([]);
    const token = localStorage.getItem('token');
    const leagueId = localStorage.getItem('chosenLeagueId');

    useEffect(() => {
        setCurrentUserTeam("Team 1");
        getStandings();
    }, []);

    const getStandings = async () => {
        try {
            const responseData = await getStandingsLeague(leagueId, token);
            const transformedData = transformData(responseData);
            setStandingsData(transformedData);
        } catch (error) {
            showError("Error fetching data. Please try again later.");
        }
    };

    const transformData = (apiData: TeamData[]): RowData[] => {
        return apiData.map((team: TeamData, index: number) => ({
            team: team.teamName,
            wins: team.wins,
            draws: team.ties,
            loses: team.losses,
            teamPts: team.points,
            leaguePts: team.fantasyPoints,
        }));
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
        <div className="standing-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>League Standings</Typography>
            <div className='standings-table-container'>
                <StandingsTable standingsData={standingsData} currentUserTeam={currentUserTeam} />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default StandingsPage;
