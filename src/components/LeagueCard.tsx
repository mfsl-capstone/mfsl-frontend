import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface LeagueCardProps {
    name: string;
    onSelect: () => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({name, onSelect}) => {
    return (
        <Card
            sx={{
                cursor: 'pointer',
                backgroundColor: '#e10a4f',
                marginBottom: '5%',
                '&:hover': {
                    backgroundColor: '#1A213C', // Change to desired hover color
                },
            }}
            onClick={onSelect}
        >
            <CardContent>
                <Typography variant="h6" sx={{color: "#ffff"}}>{name}</Typography>
            </CardContent>
        </Card>
    );
};

export default LeagueCard;
