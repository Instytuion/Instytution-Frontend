import ProgramDetail from '../../component/ProgramDetail/ProgramDetail'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'

import FetchProgramCourses from '../../services/courses/FetchProgramCourses';
function ProgramDetailPage() {
  return (
    <>
      <Navbar /> 
      <ProgramDetail fetchCourses={FetchProgramCourses} 
      linkPrefix="courses"  />
      <Footer />
    </>
  )
}

export default ProgramDetailPage
