import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes";
import {SnackbarProvider} from "notistack";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/stores/store";
import {PersistGate} from "redux-persist/lib/integration/react";
import Spinner from "./component/Spinner/Spinner";
import AdminRoute from "./routes/admin/AdminRoutes"; 
import ThemeProvider from "./component/ThemeProvider/ThemeProvider";
import CourseAdminRoutes from "./routes/CourseAdmin/CourseAdminRoutes";
import { RoleBasedRoute } from "./routes/protectedRoutes/RoleBasedRoutes";
import Unauthorized from "./component/ErrorPages/Unathorized";
import {QueryClient, QueryClientProvider} from "react-query";
import InstructorRoutes from "./routes/instructor/instructorRoutes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <ThemeProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
          >
            <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/*" element={<UserRoutes />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                  path="admin/*"
                  element={
                    <RoleBasedRoute allowedRole={["admin"]}>
                      <AdminRoute />
                    </RoleBasedRoute>
                  }
                />
                <Route
                  path="course-admin/*"
                  element={
                    <RoleBasedRoute allowedRole={["course_admin"]}>
                      <CourseAdminRoutes />
                    </RoleBasedRoute>
                  }
                />
                <Route
                  path="instructor/*"
                  element={
                    <RoleBasedRoute allowedRole={["instructor"]}>
                      <InstructorRoutes />
                    </RoleBasedRoute>
                  }
                />
              </Routes>
            </Router>
            </QueryClientProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
