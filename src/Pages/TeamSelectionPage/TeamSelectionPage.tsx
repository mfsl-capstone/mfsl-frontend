import { Typography } from "@mui/material";
import React from "react";
import Pitch from "../../components/Pitch/Pitch";
import { Team } from "../../components/Team/Team";
import "./TeamSelectionPage.scss";
import Button from "@mui/material/Button";

// Example team data
const exampleTeam: Team = {
    squad: {
        goalkeeper: { name: "Goalkeeper", position: "Goalkeeper", number: 1, onClick: () => alert("Goalkeeper clicked"), color: "black", nameColor: "white", numberColor: "white" },
        defenders: [
            { name: "Defender 1", position: "Defender", number: 2, onClick: () => alert("Defender 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 2", position: "Defender", number: 3, onClick: () => alert("Defender 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 3", position: "Defender", number: 4, onClick: () => alert("Defender 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            //{ name: "Defender 4", position: "Defender", number: 5, onClick: () => alert("Defender 4 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // { name: "Defender 5", position: "Defender", number: 12, onClick: () => alert("Defender 5 clicked"), color: "black", nameColor: "white", numberColor: "gold" },


            // Add more defenders as needed
        ],
        midfielders: [
            { name: "Midfielder 1", position: "Midfielder", number: 6, onClick: () => alert("Midfielder 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 2", position: "Midfielder", number: 7, onClick: () => alert("Midfielder 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 3", position: "Midfielder", number: 8, onClick: () => alert("Midfielder 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 4", position: "Midfielder", number: 21, onClick: () => alert("Midfielder 4 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Midfielder 5", position: "Midfielder", number: 14, onClick: () => alert("Midfielder 5 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // Add more midfielders as needed
        ],
        forwards: [
            { name: "Forward 1", position: "Forward", number: 10, onClick: () => alert("Forward 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Forward 2", position: "Forward", number: 11, onClick: () => alert("Forward 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // { name: "Forward 3", position: "Forward", number: 9, onClick: () => alert("Forward 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // Add more forwards as needed
        ],
        bench: [
            { name: "Substitute 1", position: "Goalkeeper", number: 13, onClick: () => alert("Substitute 1 clicked"), color: "black", nameColor: "white", numberColor: "gold"},
            { name: "Substitute 2", position: "Defender", number: 17, onClick: () => alert("Substitute 2 clicked"), color: "black", nameColor: "white", numberColor: "gold"},
            { name: "Substitute 3", position: "Midfielder", number: 18, onClick: () => alert("Substitute 3 clicked"), color: "black", nameColor: "white", numberColor: "gold"},
            { name: "Substitute 4", position: "Forward", number: 19, onClick: () => alert("Substitute 4 clicked"), color: "black", nameColor: "white", numberColor: "gold"},
        ],
    },
    style: {
        color: "red",
        nameColor: "white",
        numberColor: "white",
        name: `My Team`,
    },
};

const TeamSelectionPage: React.FC = () => {
    return (
        <>
            <div className="team-selection-text">
                <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{exampleTeam.style?.name}</Typography>
            </div>
            <div className="save-team-button">
                <Button sx={{ backgroundColor: '#e01a4f', color: '#fff'}}>
                    Save Your Team
                </Button>
            </div>
            <div className="team-selection-container">
                <Pitch team={exampleTeam}></Pitch>
            </div>

        </>

    );
};

export default TeamSelectionPage;
