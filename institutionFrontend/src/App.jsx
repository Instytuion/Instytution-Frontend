import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/stores/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Spinner from "./component/Spinner/Spinner";
import AdminRoute from "./routes/admin/AdminRoutes";
import ThemeProvider from "./component/ThemeProvider/ThemeProvider";
import CourseAdminRoutes from "./routes/CourseAdmin/CourseAdminRoutes";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <ThemeProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Router>
              <Routes>
                <Route path="/*" element={<UserRoutes />} />
                <Route path="admin/*" element={<AdminRoute />} />
                <Route path="course-admin/*" element={<CourseAdminRoutes />} />
              </Routes>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
