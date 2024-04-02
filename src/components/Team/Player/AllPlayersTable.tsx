import React, {useEffect, useState} from 'react';
import {getAllTeams, getFantasyLeaguePlayers} from "../../../api/league";
import {ReactComponent as SortIcon} from "./sort.svg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    IconButton,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import {Player} from './Player';
import PlayerMatchesModal from "./PlayerMatchesModal/PlayerMatchesModal";
import TablePagination from "@mui/material/TablePagination";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TradePlayerModal from "../TradePlayerModal";
import {motion} from 'framer-motion';
import {getEligibleFreeAgentSwaps} from "../../../api/transaction";

interface PlayersTableProps {
    currentTeam?: any;
    topPlayers?: boolean;
}

interface PlayersTableState {
    players: Player[];
    leagueName: string;
    selectedPlayer: Player | null;
    isModalOpen: boolean;
    filter?: {
        name?: string;
        position?: string[];
        teamName?: string[];
    };
    noTaken?: boolean;
    page: number;
    rowsPerPage: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    fetchTrigger?: boolean;
    token: string | null;
    loading: boolean;
    teamNames?: string[];
    isTradeModalOpen?: boolean;
    playerIn?: Player;
    eligiblePlayers?: any;
}

const AllPlayersTable: React.FC<PlayersTableProps> = ({currentTeam, topPlayers}) => {
    const [state, setState] = useState<PlayersTableState>({
        players: [],
        leagueName: '',
        selectedPlayer: null,
        isModalOpen: false,
        filter: {
            name: '',
            position: [],
            teamName: []
        },
        noTaken: !!topPlayers,
        page: 0,
        rowsPerPage: topPlayers ? 10 : 100,
        sortBy: "points",
        order: "desc",
        fetchTrigger: false,
        token: localStorage.getItem('token'),
        loading: true
    });

    const handleOpenModal = (player: Player) => {
        setState(prevState => ({...prevState, selectedPlayer: player, isModalOpen: true}));
    }

    const handleCloseModal = () => {
        setState(prevState => ({...prevState, selectedPlayer: null, isModalOpen: false}));
    }

    const handleChangePage = (_: unknown, newPage: number) => {
        setState(prevState => ({...prevState, page: newPage}));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({...prevState, rowsPerPage: parseInt(event.target.value, 10), page: 0}));
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({...prevState, filter: {...prevState.filter, name: event.target.value}}));
    }

    const handleSortChange = (sort: string) => {
        setState(prevState => ({
            ...prevState,
            sortBy: sort,
            order: prevState.order === 'asc' ? 'desc' : 'asc'
        }));
    }

    const handleEnterClick = () => {
        setState(prevState => ({...prevState, fetchTrigger: !prevState.fetchTrigger}));
    }

    const getCurrentFilters = Object.entries(state.filter || {}).map(([field, value]) => ({
        field,
        value: Array.isArray(value) ? value.join(',') : value
    }));

    const currentTeamPlayerIds = () => {
        return (currentTeam.goalkeepers || []).map((player: any) => player.id)
            .concat((currentTeam.defenders || []).map((player: any) => player.id))
            .concat((currentTeam.midfielders || []).map((player: any) => player.id))
            .concat((currentTeam.attackers || []).map((player: any) => player.id))
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setState(prevState => ({...prevState, loading: true}));
                const usedFilters = getCurrentFilters.filter(({value}) => value !== '');
                const playersData = await getFantasyLeaguePlayers(
                    Number(localStorage.getItem('chosenLeagueId')),
                    state.noTaken,
                    state.order,
                    state.sortBy,
                    state.rowsPerPage,
                    state.page,
                    usedFilters,
                    state.token
                );
                setState(prevState => ({
                    ...prevState,
                    players: playersData,
                    loading: false,
                }));
            } catch (error: any) {
                showError(error.message);
                setState(prevState => ({...prevState, loading: false}));
            }
        };

        fetchPlayers().then();
    }, [Number(localStorage.getItem('chosenLeagueId')), state.fetchTrigger, state.sortBy, state.order, state.noTaken, state.page, state.rowsPerPage]);

    useEffect(() => {
        // fetch all the teams
        const fetchTeams = async () => {
            const teams = await getAllTeams(state.token);
            // sort teams alphabetically, except No Club
            teams.sort();
            setState(prevState => ({...prevState, teamNames: teams}));
        };
        fetchTeams().then();
    }, [state.token]);

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

    const buttonText = (player: Player) => {
        return currentTeamPlayerIds()?.includes(player.id) ? "Yours" : player.taken ? "Trade" : "Sign";
    }

    const handleSignClick = async (player: Player) => {
        if (!player.taken) {
            const eligiblePlayers = await getEligibleFreeAgentSwaps(currentTeam.id, player.id);
            setState(prevState => ({
                ...prevState,
                isTradeModalOpen: true,
                playerIn: player,
                eligiblePlayers: eligiblePlayers
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                isTradeModalOpen: true,
                playerIn: player
            }));
        }

    }

    const component = (
        <>
            <Card sx={{maxWidth: '90%', maxHeight: '90vh', margin: '10px', bgcolor: '#1a213c'}}>
                <CardContent>
                    {topPlayers &&
                        <Typography variant="h4" sx={{textAlign: 'start', color: '#fff'}}>
                            Top 10 Available Players
                        </Typography>
                    }
                    {!topPlayers &&
                        <Box display="flex" alignItems="center">
                            <TextField
                                id="outlined-basic"
                                label="Search Name"
                                variant="filled"
                                sx={{margin: '10px', width: '50%', bgcolor: '#fff'}}
                                value={state.filter?.name || ''}
                                onChange={handleNameChange}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleEnterClick();
                                        event.preventDefault();
                                    }
                                }}
                            />
                            <FormControl variant="filled" sx={{margin: '10px', width: '20%', bgcolor: '#fff'}}>
                                <InputLabel id="position-label">Select Position</InputLabel>
                                <Select
                                    labelId="position-label"
                                    id="position-select"
                                    label="Select Position"
                                    defaultValue={[]}
                                    value={state.filter?.position || []}
                                    onChange={(event) => {
                                        const selectedValues = event.target.value as unknown as string[];
                                        // join the selected values in a comma separated string
                                        setState(prevState => ({
                                            ...prevState,
                                            filter: {...prevState.filter, position: selectedValues}
                                        }));
                                        event.preventDefault();
                                    }}
                                    onClose={handleEnterClick}
                                    renderValue={(selected) => {
                                        if (Array.isArray(selected)) {
                                            return selected.join(', ');
                                        } else {
                                            return selected || "No selection";
                                        }
                                    }}
                                    multiple
                                >
                                    {['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'].map((position) => (
                                        <MenuItem key={position} value={position}>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={state.filter?.position?.includes(position)}/>}
                                                label={position}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{margin: '10px', width: '20%', bgcolor: '#fff'}}>
                                <InputLabel id="team-label">Select Club</InputLabel>
                                <Select
                                    labelId="team-label"
                                    id="team-select"
                                    label="Select Club"
                                    defaultValue={[]}
                                    value={state.filter?.teamName || []}
                                    onChange={(event) => {
                                        const selectedValues = event.target.value as unknown as string[];
                                        setState(prevState => ({
                                            ...prevState,
                                            filter: {...prevState.filter, teamName: selectedValues}
                                        }));
                                        event.preventDefault();
                                    }}
                                    onClose={handleEnterClick}
                                    renderValue={(selected) => {
                                        if (Array.isArray(selected)) {
                                            return selected.join(', ');
                                        } else {
                                            return selected || "No selection";
                                        }
                                    }}
                                    multiple
                                >
                                    {state.teamNames?.map((team: any) => (
                                        <MenuItem key={team} value={team}>
                                            <FormControlLabel
                                                control={<Checkbox checked={state.filter?.teamName?.includes(team)}/>}
                                                label={team}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    {!topPlayers &&
                        <Box display="flex" alignItems="right" justifyContent="flex-end" color="#ffff">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.noTaken || false}
                                        onChange={(event) => setState(prevState => ({
                                            ...prevState,
                                            noTaken: event.target.checked
                                        }))}
                                        sx={{color: '#fff'}}
                                    />
                                }
                                label="Show Available"
                            />
                        </Box>
                    }
                    <TableContainer component={Paper}
                                    sx={{maxHeight: '60vh', overflow: 'auto', bgcolor: '#1a213c'}}>
                        {state.loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <CircularProgress sx={{color: '#ff0000', bgcolor: '#1a213c'}}/>
                            </Box>
                        ) : (
                            <Table sx={{bgcolor: '#1a213c'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color: '#ffff'}}></TableCell>
                                        <TableCell sx={{color: '#ffff'}}>
                                            Player
                                            {!topPlayers &&
                                                <Button onClick={() => handleSortChange('name')}>
                                                    <SortIcon/>
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell sx={{color: '#ffff'}}>
                                            Position
                                            {!topPlayers &&
                                                <Button onClick={() => handleSortChange('position')}>
                                                    <SortIcon/>
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell sx={{color: '#ffff'}}>
                                            Club
                                            {!topPlayers &&
                                                <Button onClick={() => handleSortChange('teamName')}>
                                                    <SortIcon/>
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell sx={{color: '#ffff'}}>
                                            Total Points
                                            {!topPlayers &&
                                                <Button onClick={() => handleSortChange('points')}>
                                                    <SortIcon/>
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell sx={{color: '#ffff'}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.players
                                        .map((player) => (
                                            <TableRow key={player.id}>
                                                <TableCell>
                                                    <IconButton onClick={() => handleOpenModal(player)}>
                                                        <InfoIcon sx={{color: "#ffff"}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{player.name}</TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{player.position}</TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{player.teamName}</TableCell>
                                                <TableCell sx={{color: '#ffff'}}>{player.totalPoints}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        sx={{backgroundColor: '#e01a4f', color: '#fff'}}
                                                        onClick={async () => {
                                                            await handleSignClick(player)
                                                        }}
                                                        disabled={currentTeamPlayerIds()?.includes(player.id)}
                                                    >
                                                        {buttonText(player)}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                    {!topPlayers &&
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={-1}
                            rowsPerPage={state.rowsPerPage}
                            page={state.page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{color: '#ffff', backgroundColor: '#1a213c'}}
                        />
                    }
                </CardContent>
            </Card>
            {state.selectedPlayer && (
                <PlayerMatchesModal
                    player={state.selectedPlayer}
                    open={state.isModalOpen}
                    onClose={handleCloseModal}
                    token={state.token}
                />
            )}
            <ToastContainer/>
            {state.playerIn && (
                <TradePlayerModal
                    open={state.isTradeModalOpen || false}
                    onClose={() => setState(prevState => ({...prevState, isTradeModalOpen: false}))}
                    playerIn={state.playerIn}
                    team={currentTeam}
                    eligiblePlayers={state.eligiblePlayers}
                />
            )}
        </>
    )

    return (
        <div>
            <motion.div
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                {component}
            </motion.div>
        </div>
    );
};

export default AllPlayersTable;