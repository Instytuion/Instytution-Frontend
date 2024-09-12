import { styled } from "@mui/system";
import { Typography } from '@mui/material';


export const ResentText = styled(Typography)({
  color: "red",
  fontSize: 15,
  textDecoration: "underline",
  textAlign:'right',
  paddingTop:6,
  width: '100%', 
  cursor:'pointer',
  '&:hover':{
    color: "darkred",
  }


});
