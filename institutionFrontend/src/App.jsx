import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import {persistor, store} from "./redux/stores/store"
import { PersistGate } from "redux-persist/lib/integration/react";
import Spinner from "./component/Spinner/Spinner";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner/>} persistor={persistor}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Router>
            <Routes>
              <Route path="/*" element={<UserRoutes />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
