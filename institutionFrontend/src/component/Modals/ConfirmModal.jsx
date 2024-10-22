import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useStyles from './ConfirmationModalStyles'; 

const ConfirmationModal = ({ open, onClose, onConfirm, actionType, email }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={classes.modalContainer} 
    >
      <Box sx={classes.modalBox}> 
        <Typography sx={{color:actionType === 'block' ?'red':'green'}} {...classes.modalTypographyTitle}>
          {actionType === 'block' ? 'Block User' : 'Unblock User'}
        </Typography>
        <Typography {...classes.modalTypographyBody}>
          Are you sure you want to {actionType === 'block' ? 'block' : 'unblock'} {email} ?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            onClick={handleConfirm} 
            variant="contained" 
            sx={classes.confirmButton} 
          >
            Yes
          </Button>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            sx={classes.cancelButton} 
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
