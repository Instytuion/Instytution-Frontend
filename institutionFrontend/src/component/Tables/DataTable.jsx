import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CreateUsersByRole } from "../../services/admin/UsersCreation";
import UserCrudModal from "../Modals/UserCrudModal";
import useToast from "../../hooks/useToast";

const StyledTextField = (props) => {
  const theme = useTheme();
  return (
    <TextField
      {...props}
      sx={{
        "& .MuiInputBase-root": {
          color: theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: theme.palette.text.primary,
          },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.primary,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        ...props.sx,
      }}
    />
  );
};

const CustomDataTable = ({ rows, columns, title, buttonText, setNewUsers }) => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: title === "Course Admin" ? "course_admin" : "shop_admin",
  });
  const showToast = useToast();

  const [error, setError] = useState("");

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await CreateUsersByRole(newUser);
      console.log("Response from creating user:", response);
      setNewUsers((prev) => [...prev, response.user]);
      setError("");
      showToast(response.message, "success");
      handleCloseModal();
    } catch (error) {
      console.log("Error creating user:", error);
      setError({
        email: error.response.data.email || "",
        password: error.response.data.password || "",
      });
    }
  };

  const filteredRows = search
    ? rows.filter((row) =>
        Object.values(row).some(
          (value) =>
            value !== null &&
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
    : rows;

  return (
    <Box sx={{ width: "77vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        {buttonText ? (
          <Button
            onClick={handleOpenModal}
            sx={{
              color: "white",
              p: 3,
              backgroundColor: theme.palette.text.tealgreen,
            }}
          >
            Add New
          </Button>
        ) : null}
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box sx={{ overflow: "auto", height: "calc(100vh - 27vh)" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sortingOrder={["asc", "desc"]}
          // sx={{
          //   height: "100%",
          //   width: "100vw",
          //   "& .MuiDataGrid-virtualScroller": {
          //     overflow: "auto",
          //   },
          //   "& .MuiDataGrid-cell": {
          //     whiteSpace: "nowrap",
          //     overflow: "visible",
          //     textOverflow: "ellipsis",
          //   },
          // }}
          sx={{
            height: "calc(100vh - 27vh)",
            width: isLargeScreen ? "100vw" : "100vw",
            "& .MuiDataGrid-virtualScroller": {
              overflow: "hidden",
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

      <UserCrudModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title={`Add New ${title}`}
        handleSubmit={handleFormSubmit}
      >
        <StyledTextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          error={!!error.email} // Highlight the field in red if there's an error
          helperText={error.email} // Show the error message below the field
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
          error={!!error.password} // Only show error if there's a message
          helperText={error.password}
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
        />
      </UserCrudModal>
    </Box>
  );
};

export default CustomDataTable;
