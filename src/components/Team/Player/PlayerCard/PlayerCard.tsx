import React from 'react';
import './PlayerCard.scss'; // Assuming you have a CSS file named PlayerCard.css

// Define a type for the props that the PlayerCard component will accept
type PlayerCardProps = {
    name: string;
    info: string;
};

// React Component for Player Card
const PlayerCard: React.FC<PlayerCardProps> = ({name, info}) => {
    return (
        <div className="player-card">
            <div className="player-name">{name}</div>
            <div className="player-info">{info}</div>
        </div>
    );
};

export default PlayerCard;
