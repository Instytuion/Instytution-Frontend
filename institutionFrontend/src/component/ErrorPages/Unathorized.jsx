import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import image from '../../assets/error_401.jpg'; // You can replace this with an unauthorized image if needed

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={0} sx={{ padding: '2rem', textAlign: 'center' }}>
        <img src={image} alt="Unauthorized Access" style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem' }} />
        <Typography variant="h4" gutterBottom >
          Unauthorized Access
        </Typography>
        <Typography variant="body1" gutterBottom>
          You do not have permission to view this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ marginTop: '1rem' }}
        >
          Go to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default Unauthorized;
