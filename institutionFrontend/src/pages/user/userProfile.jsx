import React from 'react'
import Profile from '../../component/Profile/profile'
import Navbar from '../../component/Navbar/Navbar';
import { Box } from '@mui/material';
import BackButton from '../../component/Button/BackButton';

const userProfile = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: ["1rem", "2rem", "4rem"], mt:1 }}>
        <BackButton />
      </Box>
      <Profile />
    </>
  );
}
export default userProfile
