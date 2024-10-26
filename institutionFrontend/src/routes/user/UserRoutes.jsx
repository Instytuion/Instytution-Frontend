import {Suspense, lazy} from "react";
import {Routes, Route} from "react-router-dom";
import Spinner from "../../component/Spinner/Spinner";
import PageNotFoundPage from "../../component/ErrorPages/PageNotFound";
import SignUpLoginProtectRoutes from "../protectedRoutes/SignUpLoginProtectRoutes";
import IsAuthenticatedRoutes from "../protectedRoutes/IsAuthenticatedRoutes";
import SessionExpired from "../../component/ErrorPages/SessionExpired";
import ProductsList from "../../pages/user/ProductsList";
import ProductDetailPage from "../../pages/user/ecommerce/ProductDetailPage";

// Lazy load components (example)
const Home = lazy(() => import("../../pages/user//Home"));
const Login = lazy(() => import("../../pages/user/LoginPage"));
const Signup = lazy(() => import("../../pages/user/SignupPage"));
const ProgramPage = lazy(() => import("../../pages/user/ProgramPage"));
const ProgramDetailPage = lazy(() =>
  import("../../pages/user/ProgramDetailPage")
);
const CourseDetailPage = lazy(() =>
  import("../../pages/user/CourseDetailPage")
);
const Profile = lazy(() => import("../../pages/user/userProfile"));
const ConfirmResetPassword = lazy(() =>
  import("../../pages/user/ConfirmResetPassword")
);
const EnrollPage = lazy(() => import("../../pages/user/EnrollPage"));
const MyCourses = lazy(() => import("../../pages/user/MyCourses"));
const VideoPage = lazy(() =>
  import("../../component/MyCourseSection/VideoPage")
);
const classRoom = lazy(() => import("../../pages/user/ClassRoom"));
const Store = lazy(() => import("../../pages/user/Store"));
const WihslistPage = lazy(() => import("../../pages/user/ecommerce/WishlistPage"));

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
        <Route
          path={"/courses/mycourses"}
          element={<IsAuthenticatedRoutes element={MyCourses} />}
        />
        <Route path="/video" element={<VideoPage />} />

        <Route
          path={"/courses/myCourses/classRoom/:batchName"}
          element={<IsAuthenticatedRoutes element={classRoom} />}
        />

        <Route
          path={"/Wishlist"}
          element={<IsAuthenticatedRoutes element={WihslistPage} />}
        />

        <Route path={"/store"} element={<Store />} />
        <Route path={"/products/:category"} element={<ProductsList />} />
        <Route path={"/product/:id"} element={<ProductDetailPage />} />

        <Route path="*" element={<PageNotFoundPage />} />
        <Route
          path="/ded5fr6bt7gyh8juiokpl[sd;klosadf"
          element={<SessionExpired />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
