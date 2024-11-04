import React from "react";
import { Modal, Box, Typography, Button, Fade, Backdrop,CircularProgress } from "@mui/material";
import { useTheme } from  "@mui/material";

const UserCrudModal = ({
  open,
  handleClose,
  title,
  children,
  handleSubmit,
  submitText = "Submit",
  isLoading
}) => {
  const theme = useTheme()
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{timeout: 500}}
      // sx={{overflow: "scroll"}}
    >
      <Fade in={open}>
        <Box sx={{p:1}}>
          <Box 
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 24,
              width:"360px",
              maxHeight:'84vh',
              overflowY:"auto",
              p: 4,
            }}
          >
            <Typography
              textAlign={"center"}
              variant="h5"
              fontWeight={"bold"}
              component="h2"
              mb={1}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              {title}
            </Typography>
            {children}

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                mt: 2,
                color: "white",
                backgroundColor: "teal",
                width: "100%",
                height: "3.2rem",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                submitText
              )}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserCrudModal;
