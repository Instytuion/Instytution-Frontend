
// import Programs from "../../component/Programs/Programs";
// import FetchCourseAdminCourses from "../../services/courseAdmin/FetchCourseAdminPrograms";


// const CourseAdminPrograms = () => {

//   return (
//     <>
    
      
//       <Programs
//         fetchProgrammes={FetchCourseAdminCourses}
//         linkPrefix="course-admin"
//         buttonText = "Add New Program"
//       />
//     </>
//   );
// };

// export default CourseAdminPrograms;
import React from 'react';
import CustomeBreadCrumbs from '../../component/Breadcrumbs/Breadcrumbs'; 
import Programs from '../../component/Programs/Programs';
import FetchCourseAdminPrograms from '../../services/courseAdmin/FetchCourseAdminPrograms';

const CourseAdminPrograms = () => {
  const links = [
    { path: '/course-admin/programs', label: 'Programs' },
  ];

  return (
    <div>
      <CustomeBreadCrumbs links={links} />
      <Programs fetchProgrammes={FetchCourseAdminPrograms} linkPrefix="course-admin" buttonText="Add New Program" />
    </div>
  );
};

export default CourseAdminPrograms;
