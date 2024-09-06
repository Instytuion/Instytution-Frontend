import { Container,Paper,Typography,Box,TextField,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const navigate = useNavigate()
    const handleSubmit=()=>{
        console.log("Form submitted")
        navigate('/')
    }
  return (
   
    <Container maxWidth="xs">
        <Paper elevation={10} sx={{padding:4}}>
            <Typography component="h2" variant="h4" sx={{textAlign:'center',mb:2}}>
                Login
            </Typography>
            <Box component='form' onSubmit={handleSubmit} >
                <TextField placeholder="Enter Username" fullWidth required autoFocus sx={{mb:2}}/>
                <TextField placeholder="Enter Password" fullWidth required type="password" sx={{mb:2}}/>

                <Button type="submit" variant="contained" fullWidth  sx={{mt:1}}>
                    Login
                </Button>
            </Box>
        </Paper>
    </Container>
    
  );
};

export default LoginForm;
