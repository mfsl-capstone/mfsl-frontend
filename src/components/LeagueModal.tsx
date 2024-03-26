import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface LeagueModalProps {
    open: boolean;
    onClose: () => void;
    action: 'join' | 'create';
}

const LeagueModal: React.FC<LeagueModalProps> = ({ open, onClose, action }) => {
    const [leagueName, setLeagueName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [draftDate, setDraftDate] = useState<Date | null>(null);
    const [color, setColor] = useState('');

    const handleLeagueNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeagueName(event.target.value);
    };

    const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(event.target.value);
    };

    const handleDraftDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value);
        setDraftDate(selectedDate);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const handleClose = () => {
        setLeagueName('');
        setTeamName('');
        setDraftDate(null);
        setColor('');
        onClose();
    };

    const handleAction = () => {
        if (action === 'join') {
            // Handle join action
        } else {
            // Handle create action
        }
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}  sx={{ color: '#1A213C'}}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: '#1A213C',
                border: '2px solid #e01a4f',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" component="h2" color="white" gutterBottom>
                    {action === 'join' ? 'Join League' : 'Create League'}
                </Typography>
                <TextField
                    margin="dense"
                    id="leagueName"
                    label="League Name"
                    type="text"
                    fullWidth
                    value={leagueName}
                    onChange={handleLeagueNameChange}
                />
                {action !== 'join' && (
                    <TextField
                        margin="dense"
                        id="draftDate"
                        label="Draft Date"
                        type="date"
                        fullWidth
                        value={draftDate ? draftDate.toISOString().split('T')[0] : ''}
                        onChange={handleDraftDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
                <TextField
                    margin="dense"
                    id="teamName"
                    label="Team Name"
                    type="text"
                    fullWidth
                    value={teamName}
                    onChange={handleTeamNameChange}
                />
                <TextField
                    select
                    margin="dense"
                    id="color"
                    label="Color"
                    value={color}
                    onChange={handleColorChange}
                    fullWidth
                >
                    {['red', 'blue', 'white', 'yellow'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleClose} sx={{ mr: 1, color: '#e01a4f' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleAction} sx={{ backgroundColor: '#e01a4f', color: '#fff'}}>
                        {action === 'join' ? 'Join' : 'Create'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default LeagueModal;
