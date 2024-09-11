import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '../../component/Spinner/Spinner';
import PageNotFoundPage from '../../component/PageNotFound/PageNotFound';
 

// Lazy load components (example)
const Home = lazy(() => import('../../pages/user//Home'));
const Login = lazy(() => import('../../pages/user/LoginPage'));
const Signup = lazy(() => import('../../pages/user/SignupPage'));
const Profile = lazy(() => import('../../pages/user/Profile'));


function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
