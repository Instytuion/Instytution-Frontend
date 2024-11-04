import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useToast from "../../hooks/useToast";

function IsAuthenticatedRoutes({ element: Component, ...rest }) {
  const showToast = useToast();
  const { isAuthenticated } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      showToast("Login Required.", "error");
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  if (isAuthenticated) {
    return <Component {...rest} />;
  }

  return null;
}

export default IsAuthenticatedRoutes;
