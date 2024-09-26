import { Container, Grid, Typography, Button } from "@mui/material";
import image from "../../assets/SEO.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item  md={6}>
          <Typography variant="h4" component="h1">
            The more that you read, the more things you will know, the more that
            you learn, the more places you’ll go.
          </Typography>
          <Button variant="contained" sx={{mt:2 ,bgcolor:'#009688'}}>
            <Link to="/about">Learn More</Link>
          </Button>
        </Grid>
        <Grid sx={12} md={6}>
          <img width="100%" src={image} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Hero;