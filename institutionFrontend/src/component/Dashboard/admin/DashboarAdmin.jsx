import React from "react";
import SummaryCard from "../../Card/DashboardSummary";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import {Grid, Box} from "@mui/material";

const DashboardSummary = () => {
  const summaryData = [
    {title: "Total Students", count: 1200, icon: PeopleIcon},
    {title: "Total Courses", count: 50, icon: SchoolIcon},
    {title: "Total Instructors", count: 30, icon: ClassIcon},
    {title: "Dashboard Overview", count: 1, icon: DashboardIcon},
  ];

  return (
    <Box sx={{p: 2, mb: 2}}>
      <Grid container spacing={3}>
        {summaryData.map((data, index) => (
          <Grid
            key={index}
            item
            xs={12} // Occupies full width on small screens
            sm={6}
            lg={3} // Occupies half width on medium screens // Occupies one-third width on large screens
          >
            <SummaryCard
              title={data.title}
              count={data.count}
              icon={data.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardSummary;
