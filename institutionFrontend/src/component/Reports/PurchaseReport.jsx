import {BarChart} from "@mui/x-charts";
import {Paper, Typography, Box} from "@mui/material";
import React from "react";
import NoData from "../NoData/NoData";

const PurchaseReport = ({reportData, title}) => {
  // Ensure `reportData` has a valid default value to prevent errors
  const chartData = reportData || [];

  // Check if the data has no items or if all the counts are 0
  const hasData = chartData.some((item) => item.count > 0);

  return (
    <Paper
      elevation={3}
      sx={{
        p: "16px",
        bgcolor: "transparent",
        boxShadow:
          "5px 5px 5px rgba(0, 0, 0, 0.1), -5px 5px 5px rgba(0, 0, 0, 0.1)",
        // width: "100%", // Allow Paper to take full width
        maxWidth: hasData ? "100%" : "calc(100vw - 70px)", 
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          overflowX: "auto", // Enable horizontal scrolling
          maxWidth: "100%", // Ensure it respects the parent's width
        }}
      >
        <Box
          sx={{
            minWidth: "600px", // Ensure the chart retains a minimum width
          }}
        >
          {hasData ? (
            <BarChart
              xAxis={[
                {
                  dataKey: "date",
                  label: "Date",
                  scaleType: "band", // Set the scale type to "band"
                },
              ]}
              yAxis={[
                {
                  dataKey: "count",
                  label: "Purchases",
                },
              ]}
              series={[
                {
                  dataKey: "count",
                  label: "Purchases",
                },
              ]}
              dataset={chartData} // Use dataset here
              width={Math.max(600, window.innerWidth * 0.8)} // Dynamic width
              height={400}
            />
          ) : (
            <NoData text={"No Data Available for the selected month or year"} />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PurchaseReport;
