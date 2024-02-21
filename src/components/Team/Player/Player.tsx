import React, { Component } from "react";
import "./Player.scss";
import PlayerIcon from "./PlayerIcon"; // Make sure this path is correct

// Define the Player type for the player prop
export type Player = {
    name: string;
    position: string;
    number: number;
    onClick: () => void;
    color: string;
    nameColor: string;
    numberColor: string;
};

// Define the props for the PlayerView component
interface PlayerProps {
    player: Player;
}

// Define the PlayerView component using a class component syntax
class PlayerView extends Component<PlayerProps> {
    render() {
        const { player } = this.props;
        return (
            <div className="player-view" onClick={player.onClick}>
                <PlayerIcon fillColor={player.color} numberColor={player.numberColor} number={player.number.toString()} />
                <div className="player-info">
                    <div className="name" style={{ color: player.nameColor }}>
                        {player.name}
                    </div>
                    {/* Add more stats here like points, and next game
          <div className="number" style={{ color: player.numberColor }}>
            {player.number}
          </div>
          */}
                </div>
            </div>
        );
    }
}

export default PlayerView;
