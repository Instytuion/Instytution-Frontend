import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import EnrollSection from '../../component/EnrollSection/EnrollSection'
import Footer from '../../component/Footer/Footer'
import { useLocation, useParams } from 'react-router-dom'

function EnrollPage() {
  const {courseName} = useParams();
  const location = useLocation();
  const { price } = location.state || {};
  return (
    <>
      <Navbar />
      <EnrollSection courseName={courseName} price={price} />
      <Footer />
    </>
  )
}

export default EnrollPage
