import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";
import { Avatar } from "@mui/material";
import { ColumnsHeading } from "../../component/Tables/TableColumns";
const Users = () => {
  // const columns = [
  //   { field: "rowNumber", headerName: "No.", flex: 0.1, minWidth: 50,text:'center' },
  //   { field: "id", headerName: "ID", flex: 0.1 },

  //   {
  //     field: "profile_picture",
  //     headerName: "Profile Picture",
  //     renderCell: (params) => {
  //       const { value, row } = params;
  //       const firstLetter = row.email ? row.email.charAt(0).toUpperCase() : "N/A";
    
  //       return value ? (
  //         <img
  //           src={value}
  //           alt="Profile"
  //           style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
  //         />
  //       ) : (
  //         <Avatar
  //           sx={{
              
  //             marginTop: 1,
  //             backgroundColor: "teal",
  //           }}
  //         >
  //           {firstLetter ? firstLetter : <PersonIcon />}
  //         </Avatar>
  //       );
  //     },
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     minWidth: 250,
  //     maxWidth: 400,
  //     renderCell: (params) => (
  //       <div
  //         style={{
  //           overflow: "hidden",
  //           whiteSpace: "nowrap",
  //           textOverflow: "ellipsis",
  //           maxWidth: "100%",
  //         }}
  //       >
  //         {params.value}
  //       </div>
  //     ),
  //   },
  //   { field: "first_name", headerName: "First Name", renderCell: (params) => params.value ? params.value : "N/A", flex: 0.2, minWidth: 100 },
  //   { field: "last_name", headerName: "Last Name", renderCell: (params) => params.value ? params.value : "N/A", flex: 0.2, minWidth: 100 },
  //   { field: "is_active", headerName: "Active", type: "boolean", flex: 0.2, minWidth: 50 },
  //   { field: "role", headerName: "Role", flex: 0.2 },
  // ];

  const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await LitsUsersByRole("user");

     
  //     const usersWithNumbers = response.results.map((user, index) => ({
  //       ...user,
  //       rowNumber: index + 1, 
  //     }));

  //     setUsers(usersWithNumbers);
  //   } catch (error) {
  //     console.log("error from fetch:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const title = "Users";
  return (
    <>
      <CustomDataTable rows={users} columns={ColumnsHeading(setUsers)} title={title} />
    </>
  );
};

export default Users;
