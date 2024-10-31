import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShopIcon from "@mui/icons-material/Store";
import DrawerComponent from "../../component/Drawer/DrawerComponent";
import PeopleIcon from "@mui/icons-material/People";
import { Category, CategoryOutlined, LocalActivity, ViewCarousel, ViewListRounded } from "@mui/icons-material";




const ShopAdminSideBar = () => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/shop-admin/",
    },
    {
      label: "Products",
      icon: <ShopIcon />,
      path: "/shop-admin/products",
    },
    {
      label: "Categories",
      icon: <Category />,
      path: "/shop-admin/categories",
    },
    {
      label: "Banner",
      icon: <ViewCarousel />,
      path: "/shop-admin/Banner",
    },
    {
      label: "Coupens",
      icon: <LocalActivity />,
      path: "/shop-admin/coupens",
    },
    {
      label: "Orders",
      icon: <ViewListRounded />,
      path: "/shop-admin/order-management",
    },
  ];


  return <DrawerComponent menuItems={menuItems} drawerWidth="240px" />;
};

export default ShopAdminSideBar;
