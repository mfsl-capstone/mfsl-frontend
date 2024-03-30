import React, {useCallback, useEffect, useState} from "react";
import Pitch from "../../components/Pitch/Pitch";
import {Team} from "../../components/Team/Team";
import "./TeamSelectionPage.scss";
import {Box, Button, CircularProgress, Modal, Typography} from "@mui/material";
import {Player} from "../../components/Team/Player/Player";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerMatchesModal from "../../components/Team/Player/PlayerMatchesModal/PlayerMatchesModal";
import {getUserTeam, setTeam} from "../../api/team";
import {motion} from "framer-motion";

const TeamSelectionPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
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

    const updateTeamHandlers = useCallback((team: Team) => {
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

    // Fetch team data on mount
    useEffect(() => {
        const getTeam = async () => {
            try {
                setIsLoading(true);
                if (username) {
                    const team = await getUserTeam(token, username);
                    if (team) {
                        setCurrentTeam(updateTeamHandlers(team));
                    }
                }
            } catch (error: any) {
                showError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getTeam().then();
    }, [updateTeamHandlers, username, token]);

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

    const handleSubOnClick = async () => {
        if (currentPlayerToSubOff) {
            await makeSubstitution();
        }
        setIsModalOpen(false);
    }

    const handleSubOffClick = async () => {
        if (currentPlayerToSubOn) {
            await makeSubstitution();
        }
        setIsModalOpen(false);
    }

    const handleSwitchFirstClick = () => {
        setBenchPlayer1(currentPlayerToSubOn);
        setIsModalOpen(false);
    }

    const handleConfirmSwitch = async () => {
        setIsModalOpen(false);
        await makeBenchSwitch();
    }

    const handleViewInformationClick = async () => {
        if (substituteClicked) {
            if (currentPlayerToSubOn) {
                setPlayerToViewInfo(currentPlayerToSubOn);
            }
        } else {
            if (currentPlayerToSubOff) {
                setPlayerToViewInfo(currentPlayerToSubOff);
            }
        }
        setViewInformationClicked(true);
        setIsModalOpen(false);
    };

    const showError = (message: string): void => {
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

    const showSuccess = (message: string): void => {
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

    const makeBenchSwitch = async () => {
        // find the index of the players in the bench array
        if (currentTeam) {
            let benchPlayer1Index = currentTeam.squad.bench.findIndex(player => player.id === benchPlayer1?.id);
            let benchPlayer2Index = currentTeam.squad.bench.findIndex(player => player.id === currentPlayerToSubOn?.id);

            // switch the players in the bench array
            if (benchPlayer1Index !== -1 && benchPlayer2Index !== -1) {
                let tempPlayerId = currentTeam.squad.playerIdsInFormation.bench[benchPlayer1Index];
                currentTeam.squad.playerIdsInFormation.bench[benchPlayer1Index] = currentTeam.squad.playerIdsInFormation.bench[benchPlayer2Index];
                currentTeam.squad.playerIdsInFormation.bench[benchPlayer2Index] = tempPlayerId;
            }
            const canProceed = await evaluateUpdateTeam();
            setBenchPlayer1(null);
            setBenchPlayer2(null);
            setSubstituteClicked(false);
            setCurrentPlayerToSubOn(null);
            setCurrentPlayerToSubOff(null);
            if (canProceed?.success && canProceed.newTeam) {
                setCurrentTeam(updateTeamHandlers(canProceed.newTeam));
            }
            showSuccess(`Switched ${benchPlayer1?.name} with ${currentPlayerToSubOn?.name} successfully`);
        }
    }

    const makeSubstitution = async () => {
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
            let substituteIndex = currentTeam.squad.bench.findIndex(player => player.id === currentPlayerToSubOn?.id);
            let playerToSubOff: Player | null = null;

            // Find the index of the player to be substituted off in the array corresponding to their position
            switch (playerPositionOff) {
                case 'goalkeeper':
                    startingPlayerIndex = currentTeam.squad.goalkeeper.id === currentPlayerToSubOff?.id ? 0 : -1;
                    playerToSubOff = currentTeam.squad.goalkeeper;
                    break;
                case 'defender':
                    startingPlayerIndex = currentTeam.squad.defenders.findIndex(player => player.id === currentPlayerToSubOff?.id);
                    playerToSubOff = currentTeam.squad.defenders[startingPlayerIndex];
                    break;
                case 'midfielder':
                    startingPlayerIndex = currentTeam.squad.midfielders.findIndex(player => player.id === currentPlayerToSubOff?.id);
                    playerToSubOff = currentTeam.squad.midfielders[startingPlayerIndex];
                    break;
                case 'attacker':
                    startingPlayerIndex = currentTeam.squad.attackers.findIndex(player => player.id === currentPlayerToSubOff?.id);
                    playerToSubOff = currentTeam.squad.attackers[startingPlayerIndex];
                    break;
                default:
                    startingPlayerIndex = -1;
            }

            // add the player that is being subbed off to the bench
            if (playerToSubOff) {
                currentTeam.squad.playerIdsInFormation.bench.splice(substituteIndex, 0, playerToSubOff.id.toString());
            }

            // If the player is found, remove them from the array
            if (startingPlayerIndex !== -1 && substituteIndex !== -1) {
                switch (playerPositionOff) {
                    case 'goalkeeper':
                        currentTeam.squad.playerIdsInFormation.goalkeeper = currentTeam.squad.bench[substituteIndex].id.toString();
                        break;
                    case 'defender':
                        currentTeam.squad.playerIdsInFormation.defenders.splice(startingPlayerIndex, 1);
                        break;
                    case 'midfielder':
                        currentTeam.squad.playerIdsInFormation.midfielders.splice(startingPlayerIndex, 1);
                        break;
                    case 'attacker':
                        currentTeam.squad.playerIdsInFormation.attackers.splice(startingPlayerIndex, 1);
                        break;
                }


                // Find the position of the player to be substituted on and add them to the corresponding array
                switch (playerPositionOn) {
                    case 'goalkeeper':
                        currentTeam.squad.playerIdsInFormation.goalkeeper = currentTeam.squad.bench[substituteIndex].id.toString();
                        break;
                    case 'defender':
                        currentTeam.squad.playerIdsInFormation.defenders.push(currentTeam.squad.bench[substituteIndex].id.toString());
                        break;
                    case 'midfielder':
                        currentTeam.squad.playerIdsInFormation.midfielders.push(currentTeam.squad.bench[substituteIndex].id.toString());
                        break;
                    case 'attacker':
                        currentTeam.squad.playerIdsInFormation.attackers.push(currentTeam.squad.bench[substituteIndex].id.toString());
                        break;
                }

                // Remove the player from the bench
                currentTeam.squad.playerIdsInFormation.bench.splice(substituteIndex + 1, 1);
            }
            const canProceed = await evaluateUpdateTeam();
            if (!canProceed?.success) {
                setSubstituteClicked(false);
                setCurrentPlayerToSubOff(null);
                setCurrentPlayerToSubOn(null);
                showError(canProceed?.message);
                return;
            } else {
                setSubstituteClicked(false);
                setCurrentPlayerToSubOff(null);
                setCurrentPlayerToSubOn(null);
                if (canProceed?.success && canProceed?.newTeam) {
                    setCurrentTeam(updateTeamHandlers(canProceed.newTeam));
                }
                showSuccess(`Substituted ${currentPlayerToSubOff?.name} off for ${currentPlayerToSubOn?.name} successfully`);
            }
        }
    }

    const evaluateUpdateTeam = async () => {
        try {
            if (currentTeam) {
                const newTeam = await setTeam(token, currentTeam.squad.playerIdsInFormation);
                return {
                    newTeam: newTeam,
                    success: true
                }
            }
        } catch (error: any) {
            return {
                message: error.message,
                success: false
            }
        }
    }

    const RenderSubstitutionButtons = () => {
        return (
            substituteClicked ? (
                <>
                    <Button onClick={() => handleSubOnClick()}
                            sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        {currentPlayerToSubOff ? `Sub-On for ${currentPlayerToSubOff.name}` : 'Sub-On'}
                    </Button>
                    {
                        !benchPlayer1 ? (
                            <>
                                <Button onClick={() => handleSwitchFirstClick()} sx={{
                                    backgroundColor: '#e01a4f',
                                    color: '#fff',
                                    marginTop: '20px',
                                    alignItems: 'center'
                                }}>
                                    Switch Bench Position
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => handleConfirmSwitch()} sx={{
                                    backgroundColor: '#e01a4f',
                                    color: '#fff',
                                    marginTop: '20px',
                                    alignItems: 'center'
                                }}>
                                    {`Switch with ${benchPlayer1?.name}`}
                                </Button>
                            </>
                        )
                    }
                </>
            ) : (
                <Button onClick={() => handleSubOffClick()}
                        sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                    {currentPlayerToSubOn ? `Sub-Off for ${currentPlayerToSubOn.name}` : 'Sub-Off'}
                </Button>
            )
        );

    };

    const RenderModal = () => {
        return (
            <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
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
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: '#ffff'}}>
                            {substituteClicked ? currentPlayerToSubOn?.name : currentPlayerToSubOff?.name}
                        </Typography>
                        <RenderSubstitutionButtons/>
                        <Button onClick={() => handleViewInformationClick()} sx={{
                            backgroundColor: '#e01a4f',
                            color: '#fff',
                            marginTop: '20px',
                            alignItems: 'center'
                        }}>
                            View Information
                        </Button>
                    </Box>
                </Modal>
            </motion.div>
        );
    }

    return (
        <>
            {isLoading ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress sx={{color: "#ff0000"}}/>
                </div>
            ) : (
                <>
                    <motion.div
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                    >
                        <div className="team-selection-text">
                            {currentTeam && <Typography variant="h2" sx={{
                                textAlign: 'left',
                                marginLeft: '10px',
                                color: '#e01a4f'
                            }}>{currentTeam.style?.name}</Typography>}
                        </div>
                        <div className="team-selection-container">
                            {currentTeam && <Pitch team={currentTeam}/>}
                        </div>
                        {viewInformationClicked && playerToViewInfo &&
                            <PlayerMatchesModal player={playerToViewInfo} onClose={() => {
                                setViewInformationClicked(false);
                                handleCloseModal();
                                setCurrentPlayerToSubOn(null);
                                setCurrentPlayerToSubOff(null);
                            }} open={viewInformationClicked} token={token}/>}
                        <RenderModal/>
                        <ToastContainer/>
                    </motion.div>
                </>
            )}
        </>
    );
};

export default TeamSelectionPage;
