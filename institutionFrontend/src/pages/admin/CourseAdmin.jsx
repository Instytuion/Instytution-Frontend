import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";

const CourseAdmin = () => {
  
  const columns = [
    { field: "rowNumber", headerName: "No.", flex: 0.3, minWidth: 50 },
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
        />
      ),
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
    { field: "first_name", headerName: "First Name", renderCell: (params) => params.value ? params.value : "N/A", flex: 2, minWidth: 200 },
    { field: "last_name", headerName: "Last Name", renderCell: (params) => params.value ? params.value : "N/A", flex: 2, minWidth: 100 },
    { field: "is_active", headerName: "Active", type: "boolean", flex: 1, minWidth: 50 },
    { field: "role", headerName: "Role", flex: 2 },
  ];
  

  const title = "Course Admin";


  const [courseAdmin, setCourseAdmin] = useState([]);

  const fetchCourseAdmins = async () => {
    try {
      const response = await LitsUsersByRole("course_admin");
      const courseAdminsWithRowNumbers = response.results.map((row, index) => ({
        ...row,
        rowNumber: index + 1,
      }));
      setCourseAdmin(courseAdminsWithRowNumbers);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCourseAdmins(); 
  }, []); 
 
  return (
    <>
      <CustomDataTable 
        rows={courseAdmin} 
        columns={columns} 
        title={title} 
        buttonText={"CourseAdmin"} 
        setNewUsers={setCourseAdmin} // Pass the fetch function to the table
      />
    </>
  );
};

export default CourseAdmin;