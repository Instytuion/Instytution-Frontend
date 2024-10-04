import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RoleBasedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.userAuth.role);

  // Check if the user's role is allowed
  const isAllowed = allowedRole.some((role) => {
    if (userRole === "course_admin" && role === "course_admin") return true;
    if (userRole === "admin" && role === "admin") return true;
    return false;
  });

  useEffect(() => {
    if (!isAllowed) {
      navigate('/unauthorized'); // Use the correct path for unauthorized
    }
  }, [isAllowed, navigate]);

  return isAllowed ? children : null; // Render children only if the user is allowed
};
