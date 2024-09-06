
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes"; // Correct import statement

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
