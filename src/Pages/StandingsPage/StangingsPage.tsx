import React, { useEffect, useState } from 'react';
import './StandingsPage.css';
import StandingsTable from "../../components/StandingsTable";
import Typography from "@mui/material/Typography";

const StandingsPage: React.FC = () => {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>('');

    useEffect(() => {
        setCurrentUserTeam("Team 1");
    }, []);

    return (
        <div className="standing-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>League Standings</Typography>
            <div className='standings-table-container'>
              <StandingsTable currentUserTeam={currentUserTeam} /> {/* Pass currentUserTeam as a prop */}
            </div>
            
        </div>
    );
};

export default StandingsPage;
