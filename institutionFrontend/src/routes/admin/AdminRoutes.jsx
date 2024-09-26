import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../component/Spinner/Spinner";
import PageNotFoundPage from "../../component/ErrorPages/PageNotFound";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import CourseAdmin from "../../pages/admin/CourseAdmin";
import ShopeAdmin from "../../pages/admin/ShopeAdmin";
import Instructore from "../../pages/admin/Instructor";

// Lazy load components (example)
const Dashboard = lazy(() => import("../../pages/admin/Dashboard"));
const Users = lazy(() => import("../../pages/admin/Users"));
const CreateCourse = lazy(() => import("../../pages/admin/CourseForm"));

function AdminRoute() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<AdminLayout />}>



          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="course-admin" element={<CourseAdmin />} />
          <Route path="shop-admin" element={<ShopeAdmin />} />
          <Route path="instructor" element={<Instructore />} />
          <Route path="create-course" element={<CreateCourse />} />




        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AdminRoute;
