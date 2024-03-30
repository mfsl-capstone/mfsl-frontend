import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface LeagueCardProps {
    name: string;
    onSelect: () => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ name, onSelect }) => {
    return (
        <Card
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#f0f0f0', // Change to desired hover color
                },
            }}
            onClick={onSelect}
        >
            <CardContent>
                <Typography variant="body1">{name}</Typography>
            </CardContent>
        </Card>
    );
};

export default LeagueCard;
