
import FetchCourseAdminProgramCourses from '../../services/courseAdmin/FetchCourseAdminCourses';
import ProgramDetail from '../../component/ProgramDetail/ProgramDetail';

const ProgramCourses = () => {
  return (
    <ProgramDetail 
      fetchCourses={FetchCourseAdminProgramCourses} 
      linkPrefix="course-admin" 
      buttonText = "Add New Course"
    />
  );
};

export default ProgramCourses;
