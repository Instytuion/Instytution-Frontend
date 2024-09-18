import RelatedCourses from "../RelatedCourses/RelatedCourses"
import UpComingBatch from "../UpComingBatch/UpComingBatch"
import Skills from "./Skills"
import Syllabus from "./Syllabus"

function CourseDetail({data, courseName}) {
  return (
    <>
    <Skills 
    skill={data.skill}  
    prerequisite={data.prerequisite}
    />
    <Syllabus 
    week_descriptions={data.week_descriptions}
    />
    <UpComingBatch />
    <RelatedCourses courseName={courseName}/>
    
    </>
  )
}

export default CourseDetail