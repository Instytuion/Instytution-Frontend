import { Box, useTheme } from "@mui/material";
import loader from "../../assets/Spinner.gif";

const Spinner = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.background.paper,
      }}
    >
      <Box
        component="img"
        src={loader}
        alt="Loading..."
        sx={{
          width: { xs: 64, md: 96, lg: 288 }, 
          height: { xs: 64, md: 96, lg: 288 }, 
        }}
      />
    </Box>
  );
};

export default Spinner;
