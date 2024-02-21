import React from 'react';
import { ReactComponent as PlayerIconSVG } from './img/shirt.svg';

// Define a type for the props
interface PlayerIconProps {
    color: string;
    number: string;
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color, number }) => (
    <div style={{ position: 'relative', width: '100pt', height: '100pt' }}>
        <PlayerIconSVG style={{ width: '100%', height: '100%' }} />
        <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: color,
            fontSize: '48pt',
            pointerEvents: 'none',
        }}>
      {number}
    </span>
    </div>
);

export default PlayerIcon;
