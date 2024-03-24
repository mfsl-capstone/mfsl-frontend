import React, {useCallback, useEffect, useState} from "react";
import Pitch from "../../components/Pitch/Pitch";
import { Team } from "../../components/Team/Team";
import "./TeamSelectionPage.scss";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Player } from "../../components/Team/Player/Player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerMatchesModal from "../../components/Team/Player/PlayerMatchesModal/PlayerMatchesModal";
import {getUserTeam} from "../../api/team";

const TeamSelectionPage: React.FC = () => {
    const [currentPlayerToSubOff, setCurrentPlayerToSubOff] = useState<Player | null>(null);
    const [currentPlayerToSubOn, setCurrentPlayerToSubOn] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [substituteClicked, setSubstituteClicked] = useState(false);
    const [benchPlayer1, setBenchPlayer1] = useState<Player | null>(null);
    const [, setBenchPlayer2] = useState<Player | null>(null);
    const [viewInformationClicked, setViewInformationClicked] = useState(false);
    const [playerToViewInfo, setPlayerToViewInfo] = useState<Player | null>(null);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

    const makeBenchSwitch = () => {
        // find the index of the players in the bench array
        if (currentTeam) {
            let benchPlayer1Index = currentTeam.squad.bench.findIndex(player => player.name === benchPlayer1?.name);
            let benchPlayer2Index = currentTeam.squad.bench.findIndex(player => player.name === currentPlayerToSubOn?.name);

            // switch the players in the bench array
            if (benchPlayer1Index !== -1 && benchPlayer2Index !== -1) {
                let tempPlayer = currentTeam.squad.bench[benchPlayer1Index];
                currentTeam.squad.bench[benchPlayer1Index] = currentTeam.squad.bench[benchPlayer2Index];
                currentTeam.squad.bench[benchPlayer2Index] = tempPlayer;
            }
            showSuccess(`Switched ${benchPlayer1?.name} with ${currentPlayerToSubOn?.name} successfully`);
            setBenchPlayer1(null);
            setBenchPlayer2(null);
            setSubstituteClicked(false);
            setCurrentPlayerToSubOn(null);
            setCurrentPlayerToSubOff(null);
            setCurrentTeam(updateTeamHandlers(currentTeam));
        }
    }

    const makeSubstitution = () => {
        if (currentTeam) {
            let playerPositionOff = currentPlayerToSubOff?.position.toLowerCase(); // e.g. 'defender'
            let playerPositionOn = currentPlayerToSubOn?.position.toLowerCase(); // e.g. 'midfielder'

            if (playerPositionOn === 'goalkeeper' && playerPositionOff !== 'goalkeeper') {
                showError('Only a goalkeeper can be subbed off for another goalkeeper');
                setSubstituteClicked(false);
                setCurrentPlayerToSubOff(null);
                setCurrentPlayerToSubOn(null);
                return;
            }

            if (playerPositionOff === 'goalkeeper' && playerPositionOn !== 'goalkeeper') {
                showError('Only a goalkeeper can be subbed on for another goalkeeper');
                setSubstituteClicked(false);
                setCurrentPlayerToSubOff(null);
                setCurrentPlayerToSubOn(null);
                return;
            }

            let startingPlayerIndex: number;
            let substituteIndex = currentTeam.squad.bench.findIndex(player => player.name === currentPlayerToSubOn?.name);
            let playerToSubOff: Player | null = null;

            // Find the index of the player to be substituted off in the array corresponding to their position
            switch (playerPositionOff) {
                case 'goalkeeper':
                    startingPlayerIndex = currentTeam.squad.goalkeeper.name === currentPlayerToSubOff?.name ? 0 : -1;
                    playerToSubOff = currentTeam.squad.goalkeeper;
                    break;
                case 'defender':
                    startingPlayerIndex = currentTeam.squad.defenders.findIndex(player => player.name === currentPlayerToSubOff?.name);
                    playerToSubOff = currentTeam.squad.defenders[startingPlayerIndex];
                    break;
                case 'midfielder':
                    startingPlayerIndex = currentTeam.squad.midfielders.findIndex(player => player.name === currentPlayerToSubOff?.name);
                    playerToSubOff = currentTeam.squad.midfielders[startingPlayerIndex];
                    break;
                case 'attacker':
                    startingPlayerIndex = currentTeam.squad.attackers.findIndex(player => player.name === currentPlayerToSubOff?.name);
                    playerToSubOff = currentTeam.squad.attackers[startingPlayerIndex];
                    break;
                default:
                    startingPlayerIndex = -1;
            }

            // add the player that is being subbed off to the bench
            if (playerToSubOff) {
                currentTeam.squad.bench.splice(substituteIndex, 0, playerToSubOff);
            }

            // If the player is found, remove them from the array
            if (startingPlayerIndex !== -1 && substituteIndex !== -1) {
                switch (playerPositionOff) {
                    case 'goalkeeper':
                        currentTeam.squad.goalkeeper = currentTeam.squad.bench[substituteIndex];
                        break;
                    case 'defender':
                        currentTeam.squad.defenders.splice(startingPlayerIndex, 1);
                        break;
                    case 'midfielder':
                        currentTeam.squad.midfielders.splice(startingPlayerIndex, 1);
                        break;
                    case 'attacker':
                        currentTeam.squad.attackers.splice(startingPlayerIndex, 1);
                        break;
                }


                // Find the position of the player to be substituted on and add them to the corresponding array
                switch (playerPositionOn) {
                    case 'goalkeeper':
                        currentTeam.squad.goalkeeper = currentTeam.squad.bench[substituteIndex + 1];
                        break;
                    case 'defender':
                        currentTeam.squad.defenders.push(currentTeam.squad.bench[substituteIndex + 1]);
                        break;
                    case 'midfielder':
                        currentTeam.squad.midfielders.push(currentTeam.squad.bench[substituteIndex + 1]);
                        break;
                    case 'attacker':
                        currentTeam.squad.attackers.push(currentTeam.squad.bench[substituteIndex + 1]);
                        break;
                }

                // Remove the player from the bench
                currentTeam.squad.bench.splice(substituteIndex + 1, 1);

                currentTeam.squad.bench.sort((a : Player, b : Player) => {
                    if (a.position === 'Goalkeeper' && b.position !== 'Goalkeeper') {
                        return -1;
                    } else if (a.position !== 'Goalkeeper' && b.position === 'Goalkeeper') {
                        return 1;
                    }
                    return 0;
                });
            }
            showSuccess(`Substituted ${currentPlayerToSubOff?.name} off for ${currentPlayerToSubOn?.name} successfully`);
            setSubstituteClicked(false);
            setCurrentPlayerToSubOff(null);
            setCurrentPlayerToSubOn(null);
            setCurrentTeam(updateTeamHandlers(currentTeam));
        }
    }

    const updateTeamHandlers = useCallback((team : Team) => {
        return {
            ...team,
            squad: {
                ...team.squad,
                goalkeeper: {
                    ...team.squad.goalkeeper,
                    onClick: () => handlePlayingXIClick(team.squad.goalkeeper)
                },
                defenders: team.squad.defenders.map((defender) => {
                    return {
                        ...defender,
                        onClick: () => handlePlayingXIClick(defender)
                    }
                }),
                midfielders: team.squad.midfielders.map((midfielder) => {
                    return {
                        ...midfielder,
                        onClick: () => handlePlayingXIClick(midfielder)
                    }
                }),
                attackers: team.squad.attackers.map((attacker) => {
                    return {
                        ...attacker,
                        onClick: () => handlePlayingXIClick(attacker)
                    }
                }),
                bench: team.squad.bench.map((substitute) => {
                    return {
                        ...substitute,
                        onClick: () => handleBenchClick(substitute)
                    }
                })
            }
        }
    }, []);

    // Fetch team data on mount or when username or token changes
    useEffect(() => {
        const getTeam = async () => {
            try {
                if (username) {
                    const team = await getUserTeam(token, username);
                    if (team) {
                        // Here, use the updateTeamHandlers function to prepare the team object
                        setCurrentTeam(updateTeamHandlers(team));
                    }
                }
            } catch (error: any) {
                showError(error.message);
            }
        };
        getTeam().then();
    }, [username, token, updateTeamHandlers]);

    useEffect(() => {
    }, [currentTeam]); // This useEffect will run after currentTeam has been updated

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
        setViewInformationClicked(false);
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

    const handleSwitchFirstClick = () => {
            setBenchPlayer1(currentPlayerToSubOn);
            setIsModalOpen(false);
    }

    const handleConfirmSwitch = () => {
        setIsModalOpen(false);
        makeBenchSwitch();
    }

    const handleViewInformationClick = () => {
        setViewInformationClicked(prevState => !prevState);
        setIsModalOpen(false);
        if (substituteClicked) {
            setPlayerToViewInfo(currentPlayerToSubOn);
        } else {
            setPlayerToViewInfo(currentPlayerToSubOff);
        }
    }

    const showError = (message : string) : void => {
        toast.error(message, {
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
    }

    const showSuccess = (message : string) : void => {
        toast.success(message, {
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
            }
        });
    }

    const RenderSubstitutionButtons = () => {
        return (
            substituteClicked ? (
                <>
                    <Button onClick={() => handleSubOnClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        {currentPlayerToSubOff ? `Sub-On for ${currentPlayerToSubOff.name}` : 'Sub-On'}
                    </Button>
                    {currentPlayerToSubOn?.position !== 'Goalkeeper' &&
                        (
                            !benchPlayer1 ? (
                                <>
                                    <Button onClick={() => handleSwitchFirstClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                                        Switch Bench Position
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => handleConfirmSwitch()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                                        {`Switch with ${benchPlayer1?.name}`}
                                    </Button>
                                </>
                            )
                        )
                    }
                </>
            ) : (
                <Button onClick={() => handleSubOffClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                    {currentPlayerToSubOn ? `Sub-Off for ${currentPlayerToSubOn.name}` : 'Sub-Off'}
                </Button>
            )
        );

    };

    const RenderModal = () => {
        return (
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
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#ffff' }}>
                        {substituteClicked ? currentPlayerToSubOn?.name : currentPlayerToSubOff?.name}
                    </Typography>
                    <RenderSubstitutionButtons/>
                    <Button onClick={() => handleViewInformationClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        View Information
                    </Button>
                </Box>
            </Modal>
        );
    }

    return (
        <>
            <div className="team-selection-text">
                {currentTeam && <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{currentTeam.style?.name}</Typography>}
            </div>
            <div className="team-selection-container">
                {currentTeam && <Pitch team={currentTeam}/>}
            </div>
            {viewInformationClicked && playerToViewInfo && <PlayerMatchesModal player={playerToViewInfo} onClose={() => {setViewInformationClicked(false); handleCloseModal(); setCurrentPlayerToSubOn(null); setCurrentPlayerToSubOff(null);}} open={viewInformationClicked}/>}
            <RenderModal />
            <ToastContainer />
        </>
    );
};

export default TeamSelectionPage;
