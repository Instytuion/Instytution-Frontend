import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, useTheme, useMediaQuery } from "@mui/material";

const CustomDataTable = ({ rows, columns }) => {
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Box sx={{ height: 'calc(100vh - 180px)' }}>
        <Box sx={{ overflow: "auto" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sortingOrder={["asc", "desc"]}
            checkboxSelection
            sx={{
              width: isLargeScreen ? 'calc(81.3vw)' : 'calc(100vw - 50px)',
              "& .MuiDataGrid-cell": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.16)"
                    : "rgba(25, 118, 210, 0.08)",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.24)"
                      : "rgba(25, 118, 210, 0.16)",
                },
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(25, 118, 210, 0.04)",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomDataTable;
