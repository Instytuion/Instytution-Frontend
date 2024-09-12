import CourseDetail from "../../component/CourseDetail/CourseDetail"
import Footer from "../../component/Footer/Footer"
import HeroCourseDetail from "../../component/Hero/HeroCourseDetail"
import Navbar from "../../component/Navbar/Navbar"


function CourseDetailPage() {

  return (
    <>
      <Navbar />
      <HeroCourseDetail />
      <CourseDetail />
      <Footer/>
    </>
  )
}

export default CourseDetailPage
