import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../component/Spinner/Spinner";
import PageNotFoundPage from "../../component/ErrorPages/PageNotFound";
import Layout from "../../layout/AdminLayout/AdminLayout";
import CourseAdminSidebar from "../../layout/CourseAdmin/CourseAdminSidebar";
import Instructors from "../../pages/CourseAdmin/Instructors";
import ProgramCourses from "../../pages/CourseAdmin/Courses";
import CourseAdminPrograms from "../../pages/CourseAdmin/Programmes";
import CourseForm from "../../pages/CourseAdmin/CourseForm"
import IsAuthenticatedRoutes from "../protectedRoutes/IsAuthenticatedRoutes";
import ProgramForm from "../../pages/CourseAdmin/ProgramForm";

const Dashboard = lazy(() => import("../../pages/CourseAdmin/Dashboard"));
const AddLessonsPage = lazy(() => import("../../pages/CourseAdmin/AddLessonsPage"));
const LessonsPage = lazy(() => import("../../pages/CourseAdmin/LessonsPage"));

function CourseAdminRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          path="/"
          element={<Layout SidebarComponent={CourseAdminSidebar} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="programs" element={<CourseAdminPrograms />} />
          <Route path="programs/:programName" element={<ProgramCourses />} />
          <Route path="instructor" element={<Instructors />} />
          <Route path="addLessons/:courseName" element={  <IsAuthenticatedRoutes element={AddLessonsPage} />} />
          <Route path="course-form" element={<CourseForm />} />
          <Route path="lessons/:courseName" element={  <IsAuthenticatedRoutes element={LessonsPage} />} />
          <Route path="program-form" element={<ProgramForm />} />
        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default CourseAdminRoutes;
