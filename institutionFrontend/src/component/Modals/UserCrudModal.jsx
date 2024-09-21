import React from "react";
import { Modal, Box, Typography, Button, Fade, Backdrop } from "@mui/material";

const UserCrudModal = ({
  open,
  handleClose,
  title,
  children,
  handleSubmit,
  submitText = "Submit",
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            {title}
          </Typography>
          {children} {/* You can pass form elements or any content here */}
          <Button
            onClick={handleSubmit}
            sx={{ mt: 2, color: "white", backgroundColor: "teal" }}
          >
            {submitText}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserCrudModal;
