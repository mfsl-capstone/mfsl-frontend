import React from 'react';
import {Box, Modal, Typography} from '@mui/material';
import TeamTableView from '../Team/TeamTableView';
import {Player} from './Player/Player';

interface TradePlayerModalProps {
    open: boolean;
    onClose: () => void;
    playerIn?: Player;
    team?: any;
}


const TradePlayerModal: React.FC<TradePlayerModalProps> = ({open, onClose, playerIn, team}) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                    height: '85%',
                    bgcolor: '#0E131F',
                    border: '2px solid #e01a4f',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex', // Use Flexbox for layout
                    flexDirection: 'column', // Stack children vertically
                    alignItems: 'center', // Center children horizontally
                    justifyContent: 'center', // Center children vertically
                    overflow: 'auto',
                }}>
                <Typography id="modal-modal-title" variant="h6" component="h2"
                            sx={{color: '#ffff', fontWeight: "bold"}}>
                    Sign {playerIn?.name}
                </Typography>
                <TeamTableView inTradeMode={true} team={team} playerIn={playerIn} />
            </Box>
        </Modal>
    );
};

export default TradePlayerModal;