import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";

const Instructore = () => {
  const columns = [
    { field: "rowNumber", headerName: "No.", flex: 0.3 }, // Add Row Number column
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      flex: 2,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
        />
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
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
    { field: "role", Instructor: "Role", Instructor: 100, flex: 1 },
  ];

  const [instructor, setInstructor] = useState([]);

  const fetchCourseInstructor = async () => {
    try {
      const response = await LitsUsersByRole("instructor");
      console.log("response is :", response);

      // Add row numbers starting from 1
      const instructorWithNumbers = response.results.map((instructor, index) => ({
        ...instructor,
        rowNumber: index + 1, // Start row number from 1
      }));

      setInstructor(instructorWithNumbers);
    } catch (error) {
      console.log("error from fetch :", error);
    }
  };

  useEffect(() => {
    fetchCourseInstructor();
  }, []);

  const title = "Instructore";

  return (
    <>
      <CustomDataTable rows={instructor} columns={columns} title={title} />
    </>
  );
};

export default Instructore;
