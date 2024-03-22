import React, { useState } from "react";
import Pitch from "../../components/Pitch/Pitch";
import { Team } from "../../components/Team/Team";
import "./TeamSelectionPage.scss";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Player } from "../../components/Team/Player/Player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const [currentPlayerToSubOff, setCurrentPlayerToSubOff] = useState<Player | null>(null);
    const [currentPlayerToSubOn, setCurrentPlayerToSubOn] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [substituteClicked, setSubstituteClicked] = useState(false);

    const handlePlayingXIClick = (player: Player) => {
        setSubstituteClicked(false);
        setCurrentPlayerToSubOff(player);
        setIsModalOpen(true);
    }

    const handleBenchClick = (player: Player) => {
        setSubstituteClicked(true);
        setCurrentPlayerToSubOn(player);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSubstituteClicked(false);
    }

    const handleSubOnClick = () => {
        if (currentPlayerToSubOff) {
            makeSubstitution();
        }
        setIsModalOpen(false);
    }

    const handleSubOffClick = () => {
        if (currentPlayerToSubOn) {
            makeSubstitution();
        }
            setIsModalOpen(false);
    }


    const makeSubstitution = () => {
        let playerPositionOff = currentPlayerToSubOff?.position.toLowerCase(); // e.g. 'defender'
        let playerPositionOn = currentPlayerToSubOn?.position.toLowerCase(); // e.g. 'midfielder'

        if (playerPositionOn === 'goalkeeper' && playerPositionOff !== 'goalkeeper') {
            toast.error('Only a goalkeeper can be subbed off for another goalkeeper', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: {
                    fontSize: "75%",
                    color: "#0e131f",
                }
            });
            setSubstituteClicked(false);
            setCurrentPlayerToSubOff(null);
            setCurrentPlayerToSubOn(null);
            return;
        }

        let startingPlayerIndex: number;
        let substituteIndex = exampleTeam.squad.bench.findIndex(player => player.name === currentPlayerToSubOn?.name);
        let playerToSubOff: Player | null = null;

        // Find the index of the player to be substituted off in the array corresponding to their position
        switch (playerPositionOff) {
            case 'goalkeeper':
                startingPlayerIndex = exampleTeam.squad.goalkeeper.name === currentPlayerToSubOff?.name ? 0 : -1;
                playerToSubOff = exampleTeam.squad.goalkeeper;
                break;
            case 'defender':
                startingPlayerIndex = exampleTeam.squad.defenders.findIndex(player => player.name === currentPlayerToSubOff?.name);
                playerToSubOff = exampleTeam.squad.defenders[startingPlayerIndex];
                break;
            case 'midfielder':
                startingPlayerIndex = exampleTeam.squad.midfielders.findIndex(player => player.name === currentPlayerToSubOff?.name);
                playerToSubOff = exampleTeam.squad.midfielders[startingPlayerIndex];
                break;
            case 'forward':
                startingPlayerIndex = exampleTeam.squad.forwards.findIndex(player => player.name === currentPlayerToSubOff?.name);
                playerToSubOff = exampleTeam.squad.forwards[startingPlayerIndex];
                break;
            default:
                startingPlayerIndex = -1;
        }

        // add the player that is being subbed off to the bench
        if (playerToSubOff) {
            exampleTeam.squad.bench.push(playerToSubOff);
        }

        // If the player is found, remove them from the array
        if (startingPlayerIndex !== -1 && substituteIndex !== -1) {
            switch (playerPositionOff) {
                case 'goalkeeper':
                    exampleTeam.squad.goalkeeper = exampleTeam.squad.bench[substituteIndex];
                    break;
                case 'defender':
                    exampleTeam.squad.defenders.splice(startingPlayerIndex, 1);
                    break;
                case 'midfielder':
                    exampleTeam.squad.midfielders.splice(startingPlayerIndex, 1);
                    break;
                case 'forward':
                    exampleTeam.squad.forwards.splice(startingPlayerIndex, 1);
                    break;
            }


            // Find the position of the player to be substituted on and add them to the corresponding array
            switch (playerPositionOn) {
                case 'goalkeeper':
                    exampleTeam.squad.goalkeeper = exampleTeam.squad.bench[substituteIndex];
                    break;
                case 'defender':
                    exampleTeam.squad.defenders.push(exampleTeam.squad.bench[substituteIndex]);
                    break;
                case 'midfielder':
                    exampleTeam.squad.midfielders.push(exampleTeam.squad.bench[substituteIndex]);
                    break;
                case 'forward':
                    exampleTeam.squad.forwards.push(exampleTeam.squad.bench[substituteIndex]);
                    break;
            }

            // Remove the player from the bench
            exampleTeam.squad.bench.splice(substituteIndex, 1);
        }

        setSubstituteClicked(false);
        setCurrentPlayerToSubOff(null);
        setCurrentPlayerToSubOn(null);
    }

    exampleTeam = {
        ...exampleTeam,
        squad: {
            ...exampleTeam.squad,
            goalkeeper: {
                ...exampleTeam.squad.goalkeeper,
                onClick: () => handlePlayingXIClick(exampleTeam.squad.goalkeeper)
            },
            defenders: exampleTeam.squad.defenders.map(defender => {
                return {
                    ...defender,
                    onClick: () => handlePlayingXIClick(defender)
                }
            }),
            midfielders: exampleTeam.squad.midfielders.map(midfielder => {
                return {
                    ...midfielder,
                    onClick: () => handlePlayingXIClick(midfielder)
                }
            }),
            forwards: exampleTeam.squad.forwards.map(forward => {
                return {
                    ...forward,
                    onClick: () => handlePlayingXIClick(forward)
                }
            }),
            bench: exampleTeam.squad.bench.map(substitute => {
                return {
                    ...substitute,
                    onClick: () => {handleBenchClick(substitute)}
                }
            }),
        }
    }

    return (
        <>
            <div className="team-selection-text">
                <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{exampleTeam.style?.name}</Typography>
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
                    {substituteClicked ? (
                        <Button onClick={() => handleSubOnClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                            Sub-On
                        </Button>
                    ) : (
                        <Button onClick={() => handleSubOffClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                            Sub-Off
                        </Button>
                    )}
                    <Button onClick={() => handleCloseModal()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        View Results
                    </Button>
                    <Button onClick={() => handleCloseModal()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        View Fixtures
                    </Button>
                </Box>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default TeamSelectionPage;
