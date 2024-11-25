// src/pages/dashboard/DashboardSummary.js
import React from 'react';
import SummaryCard from '../../Card/DashboardSummary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import { Box } from '@mui/material';

const DashboardSummary = () => {
    console.log("Hello");
    
  // In here write a axios file for fetcheing summary details about couser,shope and admin page with taking props

  const summaryData = [
    { title: 'Total Students', count: 1200, icon: PeopleIcon,  },
    { title: 'Total Courses', count: 50, icon: SchoolIcon,   },
    { title: 'Total Instructors', count: 30, icon: ClassIcon,  },
    { title: 'Dashboard Overview', count: 1, icon: DashboardIcon,  },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent:'space-between',
        marginBottom: '16px',
      }}
    >
      {summaryData.map((data, index) => (
        <SummaryCard
          key={index}
          title={data.title}
          count={data.count}
          icon={data.icon}
        
        />
      ))}
    </Box>
  );
};

export default DashboardSummary;
