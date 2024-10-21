// import FetchCourseAdminProgramCourses from '../../services/courseAdmin/FetchCourseAdminCourses';
// import ProgramDetail from '../../component/ProgramDetail/ProgramDetail';

// const ProgramCourses = () => {
//   return (
//     <ProgramDetail
//       fetchCourses={FetchCourseAdminProgramCourses}
//       linkPrefix="course-admin"
//       buttonText = "Add New Course"
//     />
//   );
// };

// export default ProgramCourses;
import React from "react";
import { useParams } from "react-router-dom";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";
import ProgramDetail from "../../component/ProgramDetail/ProgramDetail";
import FetchCourseAdminProgramCourses from "../../services/courseAdmin/FetchCourseAdminCourses";

const ProgramCourses = () => {
  const { programName } = useParams();
  const links = [
    { path: "/course-admin/programs", label: "Programs" },
    { path: `/course-admin/programs/${programName}`, label: programName },
  ];

  return (
    <div>
      <CustomeBreadCrumbs links={links} />
      <ProgramDetail
        fetchCourses={FetchCourseAdminProgramCourses}
        linkPrefix="course-admin"
        buttonText="Add New Course"
      />
    </div>
  );
};

export default ProgramCourses;
