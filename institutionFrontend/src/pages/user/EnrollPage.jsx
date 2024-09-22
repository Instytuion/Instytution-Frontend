import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import EnrollSection from '../../component/EnrollSection/EnrollSection'
import Footer from '../../component/Footer/Footer'
import { useParams } from 'react-router-dom'

function EnrollPage() {
  const {courseName} = useParams()
  return (
    <>
      <Navbar />
      <EnrollSection courseName={courseName} />
      <Footer />
    </>
  )
}

export default EnrollPage
