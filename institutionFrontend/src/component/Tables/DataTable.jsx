// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   TextField,
//   Box,
//   Typography,
//   Button,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { CreateUsersByRole } from "../../services/admin/UsersCreation";
// import UserCrudModal from "../Modals/UserCrudModal";
// import useToast from "../../hooks/useToast";

// const StyledTextField = (props) => {
//   const theme = useTheme();
//   return (
//     <TextField
//       {...props}
//       sx={{
//         "& .MuiInputBase-root": {
//           color: theme.palette.text.primary,
//         },
//         "& .MuiOutlinedInput-notchedOutline": {
//           borderColor: theme.palette.text.primary,
//         },
//         "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//           {
//             borderColor: theme.palette.text.primary,
//           },
//         "& .MuiInputLabel-root": {
//           color: theme.palette.text.primary,
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: theme.palette.text.primary,
//         },
//         "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
//           borderColor: theme.palette.text.primary,
//         },
//         ...props.sx,
//       }}
//     />
//   );
// };

// const CustomDataTable = ({ rows, columns, title, buttonText, setNewUsers }) => {
//   console.log('rtitile is :',title)
//   const [search, setSearch] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [newUser, setNewUser] = useState({
//     email: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//     role: title === "Course Admin" ? "course_admin" :title === "Instructors" ? "instructor": "shop_admin",
//   });
//   const showToast = useToast();

//   const [error, setError] = useState("");

//   const theme = useTheme();
//   const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async () => {
//     try {
//       const response = await CreateUsersByRole(newUser);
//       console.log("Response from creating user:", response);
//       setNewUsers((prev) => [...prev, response.user]);
//       setError("");
//       showToast(response.message, "success");
//       handleCloseModal();
//     } catch (error) {
//       console.log("Error creating user:", error);
//       setError({
//         email: error.response.data.email || "",
//         password: error.response.data.password || "",
//       });
//     }
//   };

//   const filteredRows = search
//     ? rows.filter((row) =>
//         Object.values(row).some(
//           (value) =>
//             value !== null &&
//             value.toString().toLowerCase().includes(search.toLowerCase())
//         )
//       )
//     : rows;

//   return (
//     <Box sx={{ width: "77vw" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography
//           sx={{
//             fontSize: 20,
//             fontWeight: "bold",
//             color: theme.palette.text.primary,
//             marginBottom: 2,
//           }}
//         >
//           {title}
//         </Typography>
//         {buttonText ? (
//           <Button
//             onClick={handleOpenModal}
//             sx={{
//               color: "white",
//               p: 3,
//               height:0,
//               backgroundColor: theme.palette.customColors.tealgreen,
//             }}
//           >
//             Add New
//           </Button>
//         ) : null}
//       </Box>
//       <TextField
//         label="Search"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <Box sx={{ overflow: "auto", }}>
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           disableSelectionOnClick
//           sortingOrder={["asc", "desc"]}
//           // sx={{
//           //   height: "100%",
//           //   width: "100vw",
//           //   "& .MuiDataGrid-virtualScroller": {
//           //     overflow: "auto",
//           //   },
//           //   "& .MuiDataGrid-cell": {
//           //     whiteSpace: "nowrap",
//           //     overflow: "visible",
//           //     textOverflow: "ellipsis",
//           //   },
//           // }}
//           sx={{
//             height: "calc(100vh - 24.7vh)",
//             width:"100vw",
//             "& .MuiDataGrid-virtualScroller": {
//               overflowY: "auto",
//               overflowX: "hidden",
//             },
//             "& .MuiDataGrid-cell": {
//               whiteSpace: "nowrap",
//               overflow: "visible",
//               textOverflow: "ellipsis",
//             },
//             "& .MuiDataGrid-row.Mui-selected": {
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? "rgba(255, 255, 255, 0.16)"
//                   : "rgba(25, 118, 210, 0.08)",
//               "&:hover": {
//                 backgroundColor:
//                   theme.palette.mode === "dark"
//                     ? "rgba(255, 255, 255, 0.24)"
//                     : "rgba(25, 118, 210, 0.16)",
//               },
//             },
//             "& .MuiDataGrid-row:hover": {
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? "rgba(255, 255, 255, 0.08)"
//                   : "rgba(25, 118, 210, 0.04)",
//             },
//           }}
//         />
//       </Box>

//       <UserCrudModal
//         open={openModal}
//         handleClose={() => setOpenModal(false)}
//         title={`Add New ${title}`}
//         handleSubmit={handleFormSubmit}
//       >
//         <StyledTextField
//           fullWidth
//           margin="normal"
//           label="Email"
//           name="email"
//           value={newUser.email}
//           onChange={handleInputChange}
//           error={!!error.email} // Highlight the field in red if there's an error
//           helperText={error.email} // Show the error message below the field
//         />
//         <StyledTextField
//           fullWidth
//           margin="normal"
//           label="Password"
//           name="password"
//           type="password"
//           value={newUser.password}
//           onChange={handleInputChange}
//           error={!!error.password} // Only show error if there's a message
//           helperText={error.password}
//         />
//         <StyledTextField
//           fullWidth
//           margin="normal"
//           label="First Name"
//           name="first_name"
//           value={newUser.first_name}
//           onChange={handleInputChange}
//         />
//         <StyledTextField
//           fullWidth
//           margin="normal"
//           label="Last Name"
//           name="last_name"
//           value={newUser.last_name}
//           onChange={handleInputChange}
//         />
//       </UserCrudModal>
//     </Box>
//   );
// };

// export default CustomDataTable;

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, Typography, Button } from "@mui/material";
import { CreateUsersByRole } from "../../services/admin/UsersCreation";
import UserCrudModal from "../Modals/UserCrudModal";
import useToast from "../../hooks/useToast";
import { ColumnsHeading } from "./TableColumns";
import LitsUsersByRole from "../../services/admin/UsersLIst";
import CustomPagination from "./CustomePagination";
import { useTheme } from "@emotion/react";
import { StyledTextField } from "../CustomeElements/CustomFormInputs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BatchColumnsHeading } from "./BatchColumnsHeading";
import BookLoaderJson from "../Spinner/BookLoaderJson";
import ConfirmationModal from "../Modals/ConfirmModal";
import { updateUserStatus } from "../../services/unblockAndBlock/UserController";

const CustomDataTable = ({
  title,
  buttonText,
  setNewUsers,
  row = null,
  courseName = null,
  programeName = null,
}) => {
  console.log("====================================");
  console.log("prgtms :", programeName);
  console.log("====================================");

  const role =
    title === "Course Admin"
      ? "course_admin"
      : title === "Instructors"
      ? "instructor"
      : title === "ShopeAdmin"
      ? "shop_admin"
      : "user";
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role,
  });
  const showToast = useToast();
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const userRole = useSelector((state) => state.userAuth.role);
  const navigate = useNavigate();
  const handleConfirmOpenModal = () => setOpenModal(true);
  const handleConfirmCloseModal = () => setOpenModal(false);

  const handleOpenConfirmModal = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => setOpenConfirmModal(false);

  const handleConfirm = async (name) => {
    try {
      const response = await updateUserStatus(
        selectedUser.id,
        actionType === "block" ? false : true,
        userRole
      );
      showToast(
        `${selectedUser.email} has been ${
          actionType === "block" ? "Blocked" : "Unblocked"
        } successfully`,
        "success"
      );
      setRows((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? { ...user, is_active: actionType === "block" ? false : true }
            : user
        )
      );
    } catch (error) {
      showToast(error.response.data, "error");
    } finally {
      handleCloseConfirmModal();
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await LitsUsersByRole(
        role,
        page,
        pageSize,
        search,
        userRole
      );
      const usersWithRowNumber = response.results.map((user, index) => ({
        ...user,
        rowNumber: (page - 1) * 20 + index + 1,
      }));
      setRows(usersWithRowNumber);
      setRowCount(response.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!row) {
      fetchUsers();
    }
  }, [page, pageSize, search, role]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const response = await CreateUsersByRole(newUser, userRole);
      setNewUser({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role,
      });
      setError("");
      showToast(response.message, "success");
      handleCloseModal();
      fetchUsers();
    } catch (error) {
      setError({
        email: error.response?.data?.email || "",
        password: error.response?.data?.password || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = search
    ? (row || rows).filter((r) =>
        Object.values(r).some(
          (value) =>
            value !== null &&
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
    : row || rows;

  return (
    <>
     <Box sx={{ width: "77vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 2,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        {buttonText && (
          <Button
            onClick={
              row
                ? () =>
                    navigate("/course-admin/batch-form", {
                      state: {
                        courseName: courseName,
                        programeName: programeName,
                      },
                    })
                : handleOpenModal
            }
            sx={{
              color: "white",
              p: 2.8,
              height: 0,
              backgroundColor: theme.palette.customColors,
            }}
          >
            Add New
          </Button>
        )}
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box sx={{ overflow: "auto", maxHeight: "68.58vh" }}>
        <DataGrid
          rows={filteredRows}
          columns={
            row
              ? BatchColumnsHeading()
              : ColumnsHeading(setRows, handleOpenConfirmModal)
          }
          sx={{
            width: "100vw",
            "& .MuiDataGrid-virtualScroller": {
              overflowY: "auto",
              overflowX: "auto",
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none",
            },
          }}
        />
      </Box>
      {!row && (
        <CustomPagination
          page={page}
          pageSize={pageSize}
          rowCount={rowCount}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
      <UserCrudModal
        open={openModal}
        handleClose={handleCloseModal}
        title={`Add New ${title}`}
        handleSubmit={handleFormSubmit}
        isLoading={loading}
      >
        <StyledTextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          error={!!error.email}
          helperText={error.email}
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
          error={!!error.password}
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
    <ConfirmationModal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirm}
        actionType={actionType}
        email= {selectedUser?.email}
      />
    </>
   
  );
};

export default CustomDataTable;
