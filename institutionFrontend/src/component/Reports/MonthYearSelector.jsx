import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import {useTheme} from "@emotion/react";

const MonthYearSelector = ({setMonth, setYear, year}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  const theme = useTheme();

  // Generate years from 2020 to current year
  const years = Array.from(
    {length: currentYear - 2020 + 1},
    (_, i) => 2020 + i
  );

  // Generate months, adjusting for future months
  const months = Array.from({length: 12}, (_, i) => i + 1);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setYear(year);

    // Adjust the month to the current month if the selected year is the current year and month is invalid
    if (year === currentYear && parseInt(event.target.value) > currentMonth) {
      setMonth(currentMonth);
    }
  };

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value, 10);
    setMonth(month);
  };

  return (
    <Box
      sx={{
        p: 2,
        width: {xs: "100%", sm: "auto"},
        maxWidth: 500,
        mb: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Select a month and year:
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "16px",
          py: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Year Selector */}
        <FormControl sx={{minWidth: 120}}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            defaultValue={currentYear}
            onChange={handleYearChange}
            label="Year"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Month Selector */}
        <FormControl sx={{minWidth: 120}}>
          <InputLabel id="month-select-label">Month</InputLabel>
          <Select
            labelId="month-select-label"
            defaultValue={currentMonth}
            onChange={handleMonthChange}
            label="Month"
          >
            {months.map((month) => (
              <MenuItem
                key={month}
                value={month}
                disabled={month > currentMonth && year === currentYear}
              >
                {month.toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default MonthYearSelector;
