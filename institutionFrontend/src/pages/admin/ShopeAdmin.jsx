import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";

const ShopeAdmin = () => {
  const columns = [
    { field: "rowNumber", headerName: "No.", flex: 0.3 }, 
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
        />
      ),
    },
    { field: "email", headerName: "Email" },
    {
      field: "first_name",
      headerName: "First Name",
      renderCell: (params) => (params.value ? params.value : "N/A"),
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      renderCell: (params) => (params.value ? params.value : "N/A"),
      flex: 1,
    },
    { field: "is_active", headerName: "Active", type: "boolean", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
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
