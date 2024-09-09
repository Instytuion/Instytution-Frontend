import { Box, Typography } from "@mui/material";

const WhyInstyTution = () => {
  return (
    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Typography variant="h5" sx={{ fontFamily: 'Roboto' }}>Why Choose InstyTution</Typography>
      <Typography>
        We provide high-quality courses designed by industry experts to help you
        achieve your career goals.
      </Typography>
    </Box>
  );
};

export default WhyInstyTution;
