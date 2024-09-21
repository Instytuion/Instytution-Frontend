import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";

const CustomDataTable = ({ rows, columns, title,buttonText }) => {
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "77vw" , }}>
      <Box sx={{
        display:'flex',
        justifyContent:"space-between",
       
      }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.palette.text.primary,
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
        {buttonText ? (<Button sx={{
           color:"white",
           height:0,
           p:3,
           backgroundColor:theme.palette.text.tealgreen,
        }}>
          {`Add New+`}
        </Button>):null}
        
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box>
        <Box sx={{ overflow: "auto" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sortingOrder={["asc", "desc"]}
            sx={{
              height: "calc(100vh - 27vh)",
                width: isLargeScreen ? "100%" : "100vw",
              "& .MuiDataGrid-virtualScroller":{
                overflow:"hidden"
              },
              
              "& .MuiDataGrid-cell": {
                whiteSpace: "nowrap",
                overflow: "visible",
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