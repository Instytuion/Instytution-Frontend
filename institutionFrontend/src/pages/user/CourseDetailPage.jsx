import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import CourseDetail from "../../component/CourseDetail/CourseDetail"
import Footer from "../../component/Footer/Footer"
import HeroCourseDetail from "../../component/Hero/HeroCourseDetail"
import Navbar from "../../component/Navbar/Navbar"
import FetchCourseDetail from "../../services/courses/FetchCourseDetail"
import Spinner from "../../component/Spinner/Spinner";


function CourseDetailPage() {
  const {courseName} = useParams() //this 'courseName' is url encoded.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const FetchData = async ()=>{
      try{
        const response = await FetchCourseDetail(courseName)
        console.log('Fetch courses datails success - ', response.data);
        setData(response.data)
        setLoading(false)
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        });
      }
      catch(error){
        setLoading(false)
        console.log('Error while fetching course details - ', error);
      }
    }

    FetchData();
  }, [courseName]);

  if(loading){
    return <Spinner />
  };
    

  return (
    <>
      <Navbar />
      <HeroCourseDetail 
      name={data.name} 
      description={data.description} 
      price={data.price}
      duration={data.duration}
      level={data.course_level}
      courseName={courseName}
      />
      <CourseDetail data={data} courseName={courseName}/>
      <Footer/>
    </>
  )
}

export default CourseDetailPage
