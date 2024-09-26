
import Programs from "../../component/Programs/Programs";
import FetchCourseAdminCourses from "../../services/courseAdmin/FetchCourseAdminPrograms";


const CourseAdminPrograms = () => {

  return (
    <>
    
      
      <Programs
        fetchProgrammes={FetchCourseAdminCourses}
        linkPrefix="course-admin"
        buttonText = "Add New Program"
      />
    </>
  );
};

export default CourseAdminPrograms;
