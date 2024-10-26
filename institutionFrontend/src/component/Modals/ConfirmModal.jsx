import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useStyles from './ConfirmationModalStyles'; 

const ConfirmationModal = ({ open, onClose, onConfirm, actionType, email, isPermitted }) => {
  
  const theme = useTheme();
  const classes = useStyles(theme);
  const handleConfirm = () => {
    if(actionType == "Permit"){
      isPermitted.current = true
    }
    onConfirm(email);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={classes.modalContainer} 
    >
      <Box sx={classes.modalBox}> 
        <Typography sx={{color: "black"}} {...classes.modalTypographyTitle}>
          {actionType}
        </Typography>
        <Typography {...classes.modalTypographyBody}>
          Are you sure you want to {actionType} - {email} ?
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
