import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Alert from '@mui/material/Alert';

const NotFoundPage: React.FC = () => {
    return (
        <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <WarningAmberIcon style={{ fontSize: '100px' }} />
            <h1>404 Not Found</h1>
        </div>
            <Alert severity="error">The page you are looking for does not exist</Alert>
        </div>
    );
};

export default NotFoundPage;
