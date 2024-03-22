import React, { useState } from "react";
import Pitch from "../../components/Pitch/Pitch";
import { Team } from "../../components/Team/Team";
import "./TeamSelectionPage.scss";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Player } from "../../components/Team/Player/Player";

// Example team data
let exampleTeam: Team = {
    squad: {
        goalkeeper: { name: "Goalkeeper", position: "Goalkeeper", number: 1, onClick: () => alert("Goalkeeper clicked"), color: "black", nameColor: "white", numberColor: "white" },
        defenders: [
            { name: "Defender 1", position: "Defender", number: 2, onClick: () => alert("Defender 1 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 2", position: "Defender", number: 3, onClick: () => alert("Defender 2 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            { name: "Defender 3", position: "Defender", number: 4, onClick: () => alert("Defender 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // { name: "Defender 4", position: "Defender", number: 5, onClick: () => alert("Defender 4 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
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
    const [currentStartingPlayer, setCurrentStartingPlayer] = useState<Player | null>(null);
    const [currentSubstitute, setCurrentSubstitute] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subPlayerClicked, setSubPlayerClicked] = useState(false);
    const [subOnClicked, setSubOnClicked] = useState(false);

    const handlePlayerClick = (player: Player) => {
        if (subOnClicked) {
            setCurrentStartingPlayer(player);
            handleSubOn();
            setSubOnClicked(false);
        }
        else {
            setCurrentStartingPlayer(player);
            setIsModalOpen(true);
        }
        console.log(currentStartingPlayer);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSubPlayerClicked(false);
        setSubOnClicked(false);
    }

    const handleSubPlayerClick = (player: Player) => {
        setSubPlayerClicked(true);
        setCurrentSubstitute(player);
        setIsModalOpen(true);
        console.log(currentSubstitute);
    }

    const handleSubOn = () => {
        console.log(currentStartingPlayer);
        console.log(currentSubstitute);
        setIsModalOpen(false);
        setSubOnClicked(true);

        if (currentStartingPlayer && currentSubstitute) {
            let playerPosition = currentStartingPlayer.position.toLowerCase(); // e.g. 'defender'
            let startingPlayerIndex: number;
            let substituteIndex = exampleTeam.squad.bench.findIndex(player => player.name === currentSubstitute.name);

            switch (playerPosition) {
                case 'goalkeeper':
                    startingPlayerIndex = exampleTeam.squad.goalkeeper.name === currentStartingPlayer.name ? 0 : -1;
                    break;
                case 'defender':
                    startingPlayerIndex = exampleTeam.squad.defenders.findIndex(player => player.name === currentStartingPlayer.name);
                    break;
                case 'midfielder':
                    startingPlayerIndex = exampleTeam.squad.midfielders.findIndex(player => player.name === currentStartingPlayer.name);
                    break;
                case 'forward':
                    startingPlayerIndex = exampleTeam.squad.forwards.findIndex(player => player.name === currentStartingPlayer.name);
                    break;
                default:
                    startingPlayerIndex = -1;
            }

            if (startingPlayerIndex !== -1 && substituteIndex !== -1) {
                // Swap players
                let temp: Player = null as unknown as Player;
                switch (playerPosition) {
                    case 'goalkeeper':
                        temp = exampleTeam.squad.goalkeeper;
                        exampleTeam.squad.goalkeeper = exampleTeam.squad.bench[substituteIndex];
                        break;
                    case 'defender':
                        temp = exampleTeam.squad.defenders[startingPlayerIndex];
                        exampleTeam.squad.defenders[startingPlayerIndex] = exampleTeam.squad.bench[substituteIndex];
                        break;
                    case 'midfielder':
                        temp = exampleTeam.squad.midfielders[startingPlayerIndex];
                        exampleTeam.squad.midfielders[startingPlayerIndex] = exampleTeam.squad.bench[substituteIndex];
                        break;
                    case 'forward':
                        temp = exampleTeam.squad.forwards[startingPlayerIndex];
                        exampleTeam.squad.forwards[startingPlayerIndex] = exampleTeam.squad.bench[substituteIndex];
                        break;
                }
                exampleTeam.squad.bench[substituteIndex] = temp;
            }
        }
        setSubPlayerClicked(false);
    }

    exampleTeam = {
        ...exampleTeam,
        squad: {
            ...exampleTeam.squad,
            goalkeeper: {
                ...exampleTeam.squad.goalkeeper,
                onClick: () => handlePlayerClick(exampleTeam.squad.goalkeeper)
            },
            defenders: exampleTeam.squad.defenders.map(defender => {
                return {
                    ...defender,
                    onClick: () => handlePlayerClick(defender)
                }
            }),
            midfielders: exampleTeam.squad.midfielders.map(midfielder => {
                return {
                    ...midfielder,
                    onClick: () => handlePlayerClick(midfielder)
                }
            }),
            forwards: exampleTeam.squad.forwards.map(forward => {
                return {
                    ...forward,
                    onClick: () => handlePlayerClick(forward)
                }
            }),
            bench: exampleTeam.squad.bench.map(substitute => {
                return {
                    ...substitute,
                    onClick: () => {handleSubPlayerClick(substitute)}
                }
            }),
        }
    }

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
            <Modal
                open={isModalOpen}
                onClose={() => handleCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#0E131F',
                        border: '2px solid #e01a4f',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex', // Use Flexbox for layout
                        flexDirection: 'column', // Stack children vertically
                        alignItems: 'center', // Center children horizontally
                        justifyContent: 'center', // Center children vertically
                    }}
                >
                    {subPlayerClicked &&
                        <Button onClick={() => handleSubOn()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                            Sub-On
                        </Button>
                    }
                    <Button onClick={() => handleCloseModal()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        View Results
                    </Button>
                    <Button onClick={() => handleCloseModal()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        View Fixtures
                    </Button>
                </Box>
            </Modal>
        </>

    );
};

export default TeamSelectionPage;
