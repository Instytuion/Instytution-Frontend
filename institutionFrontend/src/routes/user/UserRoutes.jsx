import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '../../component/Spinner/Spinner';
import PageNotFoundPage from '../../component/PageNotFound/PageNotFound';
import SignUpLoginProtectRoutes from '../protectedRoutes/SignUpLoginProtectRoutes';
 

// Lazy load components (example)
const Home = lazy(() => import('../../pages/user//Home'));
const Login = lazy(() => import('../../pages/user/LoginPage'));
const Signup = lazy(() => import('../../pages/user/SignupPage'));
const ProgramPage = lazy(() => import('../../pages/user/ProgramPage'));
const ProgramDetailPage = lazy(() => import('../../pages/user/ProgramDetailPage'));
const CourseDetailPage = lazy(() => import('../../pages/user/CourseDetailPage'));
const Profile = lazy(() => import('../../pages/user/Profile'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignUpLoginProtectRoutes element={Login} />} />
        <Route path="/signup" element={<SignUpLoginProtectRoutes element={Signup} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/programs" element={<ProgramPage />} />
        <Route path={"/programs/:programName"}  element={<ProgramDetailPage />} />
        <Route path={"/courses/courseDetail/:coursemName"}  element={<CourseDetailPage />} />
        
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
