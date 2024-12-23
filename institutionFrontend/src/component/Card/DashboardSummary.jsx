// src/components/SummaryCard/SummaryCard.js
import React from 'react';
import { Card, CardContent, Typography, Box, Icon } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SummaryCard = ({ title, count, icon: IconComponent }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 2,
        mx: 2,
        boxShadow: theme.palette.shadow,
        borderRadius: 2,
        widht: "220px",
        height: 1,
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color={"#009688"}>
          {count}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          borderRadius: "50%",
          bgcolor: "#009688",
          color: "#fff",
          mr: 2,
        }}
      >
        <IconComponent fontSize="large" sx={{color: "#fff"}} />
      </Box>
    </Card>
  );
};

export default SummaryCard;
