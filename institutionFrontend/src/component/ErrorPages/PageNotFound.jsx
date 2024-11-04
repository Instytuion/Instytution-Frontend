import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import image from '../../assets/404.gif';

const PageNotFoundPage = () => {
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
      <Paper elevation={0}  sx={{ padding: '2rem', textAlign: 'center', bgcolor:'white' }}>
        <img src={image} alt="404 Not Found" style={{ width: '100%', maxWidth: '400px', marginBottom: '1rem' }} />
        <Typography variant="h4" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you're looking for doesn't exist or has been moved.
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

export default PageNotFoundPage;