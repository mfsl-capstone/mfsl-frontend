import React, { Component } from "react";
import "./Player.scss";
import PlayerIcon from "./PlayerIcon";
import PlayerCard from "./PlayerCard/PlayerCard"; // Make sure this path is correct

// Define the Player type for the player prop
export type Player = {
    id: number;
    name: string;
    position: string;
    number: number;
    totalPoints: number;
    onClick: () => void;
    color: string;
    nameColor: string;
    numberColor: string;
    pictureUrl: string;
    teamPictureUrl: string;
    teamName: string;
    teamId: number;
    results: {
        round: string, // all
        opp: string; // all
        score: string, // all
        minutes: number, // all
        points: number; // all
        goalsScored: number; // all
        assists: number; // all
        shotAccuracy: number; // only attacker
        goalsConceded: number; // only goalie
        cleanSheet: boolean; // all except Attacker
        saves: number, // only goalie and defender
        penaltiesCommitted: number, // all
        penaltiesSaved: number, // only goalie
        penaltiesMissed: number, // all
        rating: number, // all
        yellowCards: number, // all
        redCards: number}[] | null;
    fixtures: {
        date: string;
        round: string;
        opponent: string }[] | null;
    upcomingGames: string;
    totals: {
        totalMinutes: number;
        totalPoints: number;
        totalGoalsScored: number;
        totalAssists: number;
        averageShotAccuracy: number;
        totalGoalsConceded: number;
        totalCleanSheet: number;
        totalSaves: number;
        totalPenaltiesCommitted: number;
        totalPenaltiesSaved: number;
        totalPenaltiesMissed: number;
        averageRating: number;
        totalYellowCards: number;
        totalRedCards: number;
        totalCleanSheets: number;
    } | null;
    taken?: boolean;
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
                        <PlayerCard name={player.name} info={player.upcomingGames}/>
                    </div>
                    {/* Add more stats here like points, and next game */}
                </div>
            </div>
        );
    }
}

export default PlayerView;
