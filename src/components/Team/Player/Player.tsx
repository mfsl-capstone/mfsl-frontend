import React, { Component } from "react";
import "./Player.scss";
import PlayerIcon from "./PlayerIcon";
import PlayerCard from "./PlayerCard/PlayerCard"; // Make sure this path is correct

// Define the Player type for the player prop
export type Player = {
    name: string;
    position: string;
    number: number;
    onClick: () => void;
    color: string;
    nameColor: string;
    numberColor: string;
    totalPoints: number;
    pictureUrl: string;
    teamPictureUrl: string;
    teamName: string;
    results: { gameWeek: string, opponent: string; score: string, minutesPlayed: number, points: number; goalsScored: number; assists: number; goalsConceded: number, saves: number, penaltiesSaved: number, penaltiesMissed: number, yellowCards: number, redCards: number }[];
    fixtures: { date: string; gameWeek: string; opponent: string }[];
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
                <div className="player-icon-container">
                    <div className="player-real-name" style={{ color: player.nameColor, transform: 'rotate(270deg)'}}>
                        <PlayerCard name={player.name} info={player.fixtures[0].opponent}/>
                    </div>
                    {/* Add more stats here like points, and next game */}
                </div>
            </div>
        );
    }
}

export default PlayerView;
