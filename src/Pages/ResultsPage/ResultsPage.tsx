import React, { useEffect, useState } from 'react';
import './ResultsPage.css';
import Typography from "@mui/material/Typography";

const ResultsPage: React.FC = () => {
    const [currentUserTeam, setCurrentUserTeam] = useState<string>('');

    useEffect(() => {
        setCurrentUserTeam("Team 1");
    }, []);

    return (
        <div className="results-page-container">
            <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>Game Results</Typography>
        </div>
    );
};

export default ResultsPage;
