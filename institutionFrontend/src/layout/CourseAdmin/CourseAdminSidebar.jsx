import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ReportIcon from "@mui/icons-material/Assessment";
import UserIcon from "@mui/icons-material/Person";
import CourseIcon from "@mui/icons-material/School";
import ShopIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import DrawerComponent from "../../component/Drawer/DrawerComponent";
import PeopleIcon from "@mui/icons-material/People";
const CourseAdminSidebar = () => {
  const menuItems = [
    { 
      label: "Dashboard", 
      icon: <DashboardIcon />, 
      path: "/course-admin/dashboard",
    },
    {
      label: "Programess",
      icon: <CastForEducationIcon />,
      path:"/course-admin/programs"
    },
    { 
        label: "Instructors", 
        icon: <PeopleIcon />, 
        path: "/course-admin/instructor",
      },
  ];

  return (
    <DrawerComponent menuItems={menuItems} drawerWidth="240px" />
  );
};

export default CourseAdminSidebar;
