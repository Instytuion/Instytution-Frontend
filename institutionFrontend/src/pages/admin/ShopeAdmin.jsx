import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";
import { Avatar } from "@mui/material";
const ShopeAdmin = () => {
  const columns = [
    { field: "rowNumber", headerName: "No.", flex: 0.1, minWidth: 50,text:'center' },
    { field: "id", headerName: "ID", flex: 0.1 },

    {
      field: "profile_picture",
      headerName: "Profile Picture",
      renderCell: (params) => {
        const { value, row } = params;
        const firstLetter = row.email ? row.email.charAt(0).toUpperCase() : "N/A";
    
        return value ? (
          <img
            src={value}
            alt="Profile"
            style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
          />
        ) : (
          <Avatar
            sx={{
              
              marginTop: 1,
              backgroundColor: "teal",
            }}
          >
            {firstLetter ? firstLetter : <PersonIcon />}
          </Avatar>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      maxWidth: 400,
      renderCell: (params) => (
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: "first_name", headerName: "First Name", renderCell: (params) => params.value ? params.value : "N/A", flex: 0.2, minWidth: 100 },
    { field: "last_name", headerName: "Last Name", renderCell: (params) => params.value ? params.value : "N/A", flex: 0.2, minWidth: 100 },
    { field: "is_active", headerName: "Active", type: "boolean", flex: 0.2, minWidth: 50 },
    { field: "role", headerName: "Role", flex: 0.2 },
  ];


  const [shopeAdmin, setShopeAdmin] = useState([]);

  const fetchShopeAdmins = async () => {
    try {
      const response = await LitsUsersByRole("shop_admin");

      // Add row numbers starting from 1
      const shopeAdminWithNumbers = response.results.map((admin, index) => ({
        ...admin,
        rowNumber: index + 1, // Start row number from 1
      }));

      setShopeAdmin(shopeAdminWithNumbers);
    } catch (error) {
      console.log("error from fetch:", error);
    }
  };

  useEffect(() => {
    fetchShopeAdmins();
  }, []);

  const title = "ShopeAdmin";
  return (
    <>
      <CustomDataTable rows={shopeAdmin} columns={columns} title={title} buttonText={"ShopeAdmin"} />
    </>
  );
};

export default ShopeAdmin;
