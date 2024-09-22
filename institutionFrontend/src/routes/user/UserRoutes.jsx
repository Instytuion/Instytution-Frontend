import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '../../component/Spinner/Spinner';
import PageNotFoundPage from '../../component/PageNotFound/PageNotFound';
import SignUpLoginProtectRoutes from '../protectedRoutes/SignUpLoginProtectRoutes';
import IsAuthenticatedRoutes from '../protectedRoutes/IsAuthenticatedRoutes';
 

// Lazy load components (example)
const Home = lazy(() => import('../../pages/user//Home'));
const Login = lazy(() => import('../../pages/user/LoginPage'));
const Signup = lazy(() => import('../../pages/user/SignupPage'));
const ProgramPage = lazy(() => import('../../pages/user/ProgramPage'));
const ProgramDetailPage = lazy(() => import('../../pages/user/ProgramDetailPage'));
const CourseDetailPage = lazy(() => import('../../pages/user/CourseDetailPage'));
const Profile = lazy(() => import('../../pages/user/userProfile'));
const ConfirmResetPassword = lazy(() => import('../../pages/user/ConfirmResetPassword'));
const EnrollPage = lazy(() => import('../../pages/user/EnrollPage'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<SignUpLoginProtectRoutes element={Login} />}
        />
        <Route
          path="/signup"
          element={<SignUpLoginProtectRoutes element={Signup} />}
        />
        <Route
          path="/reset-password/:uid/"
          element={<SignUpLoginProtectRoutes element={ConfirmResetPassword} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/programs" element={<ProgramPage />} />
        <Route
          path={"/courses/programs/:programName"}
          element={<ProgramDetailPage />}
        />
        <Route
          path={"/courses/courseDetail/:courseName"}
          element={<CourseDetailPage />}
        />
        <Route
          path={"/courses/enrollCourse/:courseName"}
          element={<IsAuthenticatedRoutes element={EnrollPage} />}
        />

        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
