// src/pages/dashboard/DashboardSummary.js
import React from 'react';
import SummaryCard from '../../Card/DashboardSummary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';

const DashboardSummary = () => {
    console.log("Hello");
    
  const summaryData = [
    { title: 'Total Students', count: 1200, icon: PeopleIcon, color: '#1976d2' },
    { title: 'Total Courses', count: 50, icon: SchoolIcon, color: '#dc004e' },
    { title: 'Total Instructors', count: 30, icon: ClassIcon, color: '#4caf50' },
    { title: 'Dashboard Overview', count: 1, icon: DashboardIcon, color: '#ff9800' },
  ];

  return (
    <div
      style={{
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
          color={data.color}
        />
      ))}
    </div>
  );
};

export default DashboardSummary;
