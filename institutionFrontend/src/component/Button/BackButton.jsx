import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function BackButton({ sx = {} }) {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)} sx={sx}>
      <KeyboardBackspaceIcon sx={{ fontSize: "2rem" }} />
    </IconButton>
  );
}

export default BackButton;
