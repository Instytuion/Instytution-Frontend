import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function SignUpLoginProtectRoutes({ element: Component, ...rest }) {
  const { isAuthenticated, role } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = location.state?.from || "/";
      if (role === "course_admin") {
        navigate("/course-admin/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "shop_admin") {
        navigate("/shop-admin/");
      } else {
        navigate(redirectPath);
      }
    }
  });

  if (!isAuthenticated) {
    return <Component {...rest} />;
  }

  return null;
}

export default SignUpLoginProtectRoutes;
