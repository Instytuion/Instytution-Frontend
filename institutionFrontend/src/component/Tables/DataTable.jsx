import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { CreateUsersByRole } from "../../services/admin/UsersCreation";
import UserCrudModal from "../Modals/UserCrudModal";

const CustomDataTable = ({ rows, columns, title, buttonText, setNewUsers }) => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
  });

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
      console.log('====================================');
      console.log('response from create new user from admin side :',response);
      console.log('====================================');
      setNewUsers(pre=> [...pre, response.user]);
      handleCloseModal()
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  const filteredRows = search
    ? rows.filter((row) =>
        Object.values(row).some((value) =>
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
            
            width:"100vw",
           
            "& .MuiDataGrid-cell": {
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "ellipsis",
            },
          }}
        />
      </Box>

      <UserCrudModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Add New Sub-admin"
        handleSubmit={handleFormSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
        />
      </UserCrudModal>
    </Box>
  );
};

export default CustomDataTable;