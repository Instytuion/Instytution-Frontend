import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import EnrollSection from '../../component/EnrollSection/EnrollSection'
import Footer from '../../component/Footer/Footer'
import { useLocation, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import BackButton from '../../component/Button/BackButton'

function EnrollPage() {
  const {courseName} = useParams();
  const location = useLocation();
  const { price } = location.state || {};
  return (
    <>
    <Box sx={{position:"relative"}}>
      <BackButton sx={{position:"absolute", top:70, right: ["2rem", "2rem", "4rem"]}} />
      <Navbar />
      <EnrollSection courseName={courseName} price={price} />
      <Footer />
    </Box>
    </>
  )
}

export default EnrollPage
