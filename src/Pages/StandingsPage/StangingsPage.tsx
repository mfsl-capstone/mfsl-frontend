import React from 'react';
import './StandingsPage.css';
import StandingsTable from "../../components/StandingsTable";
import Typography from "@mui/material/Typography";

const StandingsPage: React.FC = () => {
    return (
        <div className="standing-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>League Standings</Typography>
            <div className="standings-table-container">
                <StandingsTable/>
            </div>
        </div>
    );
};

export default StandingsPage;
