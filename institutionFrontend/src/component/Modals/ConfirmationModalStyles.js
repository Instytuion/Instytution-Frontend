import { createStyles } from '@mui/styles';

const styles = (theme) => createStyles({
  confirmButton: {
    color: "white", 
    backgroundColor: theme.palette.customColors, 
    '&:hover': {
      opacity: 0.8,     },
    boxShadow: theme.shadows[2], 
  },
  cancelButton: {
    color: "white", 
    bgcolor: theme.palette.customColors, 
    '&:hover': {
      opacity: 0.8, 
    },
  },
  modalBox: {
    bgcolor: theme.palette.background.paper,
       borderRadius:3,
    p: 7,
    textAlign: 'center',
    width: '300px',
  },
  modalTypographyTitle: {
    variant: 'h6',
    fontWeight: 'bold', 
  },
  modalTypographyBody: {
    my: 2,
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    inset: 0,

  },
});

export default styles;
