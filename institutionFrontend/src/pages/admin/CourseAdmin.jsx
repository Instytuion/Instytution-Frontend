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

    { field: "email", headerName: "Email",flex:2  },
    { field: "first_name", headerName: "First Name", renderCell: (params) => params.value ? params.value : "N/A",flex:2},
    { field: "last_name", headerName: "Last Name", renderCell: (params) => params.value ? params.value : "N/A",flex:2 },

    { field: "is_active", headerName: "Active",  type: "boolean",flex:1 },
    { field: "role", CourseAdmin: "Role", CourseAdmin: 100 ,flex:2},
   
  ];
  const title = "Course Admin";
  const [courseAdmin, setCourseAdmin] = useState([]);
  console.log('course admin is :',courseAdmin);
  
  const initialRows=courseAdmin



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
      <CustomDataTable rows={initialRows} columns={columns} title={title} buttonText={"CourseAdmin"} />
    </>
  );
};

export default CourseAdmin;