import React, { Component } from 'react';
import { ReactComponent as SortIcon} from "./sort.svg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button, InputLabel, FormControlLabel, Checkbox, Box
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import {Player} from './Player';
import PlayerMatchesModal from "./PlayerMatchesModal/PlayerMatchesModal";
import TablePagination from "@mui/material/TablePagination";

interface PlayersTableProps {
    players: Player[];
    leagueName: string;
}

interface PlayersTableState {
    players: Player[];
    leagueName: string;
    selectedPlayer: Player | null;
    isModalOpen: boolean;
    filter?: {
        position?: string[];
        team?: string[];
    };
    noTaken?: boolean;
    page: number;
    rowsPerPage: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

class AllPlayersTable extends Component<PlayersTableProps, PlayersTableState> {
    constructor(props: PlayersTableProps) {
        super(props);
        this.state = {
            players: this.props.players,
            leagueName: this.props.leagueName,
            selectedPlayer: null,
            isModalOpen: false,
            filter: {
                position: [],
                team: []
            },
            noTaken: false,
            page: 0,
            rowsPerPage: 10,
            sortBy: 'totalPoints',
            order: 'desc'
        };
    }

    handleOpenModal = (player: Player) => {
        this.setState({ selectedPlayer: player, isModalOpen: true });
    }

    handleCloseModal = () => {
        this.setState({ selectedPlayer: null, isModalOpen: false });
    }

    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
    };

    handleSortChange = (sort: string) => {
        this.setState(prevState => ({
                ...prevState,
                sortBy: sort,
                order: this.state.order === 'asc' ? 'desc' : 'asc'
        }));
        console.log(this.state);
    }

    getAllTeams = (): string[] => {
        const teamSet = new Set(this.state.players.map(player => player.teamName));
        return Array.from(teamSet);
    }

    render() {
        const { players, page, rowsPerPage} = this.state;
        return (
            <div>
                <Card sx={{ maxWidth: '70%', maxHeight: '800px', margin: '10px', bgcolor: '#1a213c' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" color='#fff'>
                            {this.state.leagueName}
                        </Typography>
                        <Box display="flex" alignItems="center">
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            sx={{ margin: '10px', width: '50%', bgcolor: '#fff' }}
                        />
                        <FormControl variant="outlined" sx={{ margin: '10px', width: '20%', bgcolor: '#fff' }}>
                            <InputLabel id="position-label">Select Position</InputLabel>
                            <Select
                                labelId="position-label"
                                id="position-select"
                                label="Select Position"
                                defaultValue={[]}
                                value={this.state.filter?.position || []}
                                onChange={(event) => this.setState({ filter: { ...this.state.filter, position: event.target.value as unknown as string[] } })}
                                renderValue={(selected) => {
                                    if (Array.isArray(selected)) {
                                        return selected.join(', ');
                                    } else {
                                        return selected || "No selection";
                                    }
                                }}
                                multiple
                            >
                                {['Goalkeepers', 'Defenders', 'Midfielders', 'Attackers'].map((position) => (
                                    <MenuItem key={position} value={position}>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.filter?.position?.includes(position)} />}
                                            label={position}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ margin: '10px', width: '20%', bgcolor: '#fff' }}>
                            <InputLabel id="team-label">Select Team</InputLabel>
                            <Select
                                labelId="team-label"
                                id="team-select"
                                label="Select Team"
                                defaultValue={[]}
                                value={this.state.filter?.team || []}
                                onChange={(event) => this.setState({ filter: { ...this.state.filter, team: event.target.value as unknown as string[] } })}
                                renderValue={(selected) => {
                                    if (Array.isArray(selected)) {
                                        return selected.join(', ');
                                    } else {
                                        return selected || "No selection";
                                    }
                                }}
                                multiple
                            >
                                {this.getAllTeams().map((team) => (
                                    <MenuItem key={team} value={team}>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.filter?.team?.includes(team)} />}
                                            label={team}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button sx={{ margin: '10px', backgroundColor: '#e01a4f', color: '#fff' }}>Enter</Button>
                        </Box>
                        <Box display="flex" alignItems="right" justifyContent="flex-end" color="#ffff">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.noTaken || false}
                                        onChange={(event) => this.setState({...this.state, noTaken: event.target.checked })}
                                        sx={{ color: '#fff' }}
                                    />
                                }
                                label="Show Available"
                            />
                        </Box>
                        <TableContainer component={Paper} sx={{ maxHeight: '600px', overflow: 'auto' }}>
                            <Table sx={{ bgcolor: '#1a213c' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#ffff'}}></TableCell>
                                        <TableCell sx={{ color: '#ffff'}}>
                                            Player
                                            <Button onClick={() => this.handleSortChange('name')}>
                                                <SortIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ color: '#ffff'}}>
                                            Position
                                            <Button onClick={() => this.handleSortChange('position')}>
                                                <SortIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ color: '#ffff'}}>
                                            Club
                                            <Button onClick={() => this.handleSortChange('teamName')}>
                                                <SortIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ color: '#ffff'}}>
                                            Points
                                            <Button onClick={() => this.handleSortChange('totalPoints')}>
                                                <SortIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ color: '#ffff'}}>Sign</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {players.map((player: Player) => (
                                        <TableRow key={player.id}>
                                            <TableCell>
                                            <IconButton onClick={() => this.handleOpenModal(player)}>
                                                <InfoIcon sx={{color:"#ffff"}} />
                                            </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ color: '#ffff'}}>{player.name}</TableCell>
                                            <TableCell sx={{ color: '#ffff'}}>{player.position}</TableCell>
                                            <TableCell sx={{ color: '#ffff'}}>{player.teamName}</TableCell>
                                            <TableCell sx={{ color: '#ffff'}}>{player.totalPoints}</TableCell>
                                            <TableCell>
                                                <Button sx={{ backgroundColor: '#e01a4f', color: '#fff' }}>Sign</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={players.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                                sx={{ bgcolor: '#1a213c', color: '#ffff' }}
                            />
                        </TableContainer>
                    </CardContent>
                </Card>
                {this.state.selectedPlayer && (
                    <PlayerMatchesModal
                        open={this.state.isModalOpen}
                        onClose={this.handleCloseModal}
                        player={this.state.selectedPlayer}
                    />
                )}
            </div>
        );
    }
}

export default AllPlayersTable;