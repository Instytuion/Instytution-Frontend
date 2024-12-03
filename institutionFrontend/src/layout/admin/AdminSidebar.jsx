import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Assessment";
import UserIcon from "@mui/icons-material/Person";
import CourseIcon from "@mui/icons-material/School";
import ShopIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import DrawerComponent from "../../component/Drawer/DrawerComponent";

const AdminSidebar = () => {
  const menuItems = [
    { 
      label: "Dashboard", 
      icon: <DashboardIcon />, 
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: <PeopleIcon />,
      subItems: [
        { label: "User", icon: <UserIcon />, path: "/admin/users" },
        { label: "Course Admin", icon: <CourseIcon />, path: "/admin/course-admin" },
        { label: "Shop Admin", icon: <ShopIcon />, path: "/admin/shop-admin" },
        { label: "Instructor", icon: <PersonIcon />, path: "/admin/instructor" },
      ],
    },
    {
      label: "Reports",
      icon: <ReportIcon />,
      subItems: [
        { label: "Course Reports", icon: <CourseIcon />, path: "/admin/report/course" },
        { label: "Shop Reports", icon: <ShopIcon />, path: "/admin/report/shop" },
      ],
    },
  ];

  return (
    <DrawerComponent menuItems={menuItems} drawerWidth="240px" />
  );
};

export default AdminSidebar;
