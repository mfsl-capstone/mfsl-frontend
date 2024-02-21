import React from "react";
import Pitch from "../../components/Pitch/Pitch";
import { Team } from "../../components/Team/Team"; // Ensure this import path matches your project structure

// Example team data
const exampleTeam: Team = {
    squad: {
        goalkeeper: { name: "Goalkeeper", position: "Goalkeeper", number: 1, onClick: () => alert("Goalkeeper clicked"), color: "blue", nameColor: "white", numberColor: "gold" },
        defenders: [
            { name: "Defender 1", position: "Defender", number: 2, onClick: () => alert("Defender 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 2", position: "Defender", number: 3, onClick: () => alert("Defender 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 3", position: "Defender", number: 4, onClick: () => alert("Defender 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 4", position: "Defender", number: 5, onClick: () => alert("Defender 4 clicked"), color: "black", nameColor: "white", numberColor: "gold" },

            // Add more defenders as needed
        ],
        midfielders: [
            { name: "Midfielder 1", position: "Midfielder", number: 6, onClick: () => alert("Midfielder 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 2", position: "Midfielder", number: 7, onClick: () => alert("Midfielder 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 3", position: "Midfielder", number: 8, onClick: () => alert("Midfielder 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 4", position: "Midfielder", number: 9, onClick: () => alert("Midfielder 4 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // Add more midfielders as needed
        ],
        forwards: [
            { name: "Forward 1", position: "Forward", number: 10, onClick: () => alert("Forward 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Forward 2", position: "Forward", number: 11, onClick: () => alert("Forward 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // Add more forwards as needed
        ],
    },
    style: {
        color: "black", // Optional: default team color if not specified per player
        nameColor: "white", // Optional: default name color
        numberColor: "gold", // Optional: default number color
    },
};

const TeamSelectionPage: React.FC = () => {
    return (
        <div className="team-selection-container">
            <h1 className="team-selection-text">Team Selection Page</h1>
            <Pitch team={exampleTeam}></Pitch>
        </div>
    );
};

export default TeamSelectionPage;