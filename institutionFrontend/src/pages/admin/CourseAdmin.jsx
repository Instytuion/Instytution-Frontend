import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { ColumnsHeading } from "../../component/Tables/TableColumns";
const CourseAdmin = () => {
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

  

  const title = "Course Admin";


  const [courseAdmin, setCourseAdmin] = useState([]);

  // const fetchCourseAdmins = async () => {
  //   try {
  //     const response = await LitsUsersByRole("course_admin");
  //     console.log('====================================');
  //     console.log('response is :',response);
  //     console.log('====================================');
  //     const courseAdminsWithRowNumbers = response.results.map((row, index) => ({
  //       ...row,
  //       rowNumber: index + 1,
  //     }));
  //     setCourseAdmin(courseAdminsWithRowNumbers);
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourseAdmins(); 
  // }, []); 
 
  return (
    <>
      <CustomDataTable 
        rows={courseAdmin} 
        // columns={columns} 
        columns={ColumnsHeading(setCourseAdmin)}
        title={title} 
        buttonText={"CourseAdmin"} 
        setNewUsers={setCourseAdmin} 
        
      />
    </>
  );
};

export default CourseAdmin;