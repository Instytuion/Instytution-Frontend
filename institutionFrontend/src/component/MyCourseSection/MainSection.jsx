// import React, { useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { MyCourseSidebar } from "./MyCourseSidebar";
// import CourseTabPanel from "./TabPanel";
// import CalendarComponent from "./CustomDatePicker";
// import BookIcon from "@mui/icons-material/Book";
// import GroupIcon from "@mui/icons-material/Group";
// import PersonIcon from "@mui/icons-material/Person";
// import { useQuery } from 'react-query';
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import MyCourseService from '../../services/user/MyCourse'
// import Spinner from "../Spinner/Spinner";
// const MainComponent = () => {

//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const handleCourseSelect = (course) => setSelectedCourse(course);

//   //  Write query plans also --------
//   const email = "anz4web@gmail.com"
//   const { data, error, isLoading } = useQuery(
//       ['myCourse',email],
//     MyCourseService
//   )
//   if(isLoading){
//     console.log('loading annnn-----------');
    
//   }else{
//     console.log('nice ada set aan');
    
//   }
//   console.log('Data fetching from myCourse ----------',data);

//   return (
//     <Box sx={{ display: "flex", padding: 3, gap: 2 }}>
//       {/* <MyCourseSidebar onCourseSelect={handleCourseSelect}  batch={data}/> */}
//       <MyCourseSidebar onCourseSelect={handleCourseSelect} batch={data} />;


//       <Paper
//         elevation={3}
//         sx={{
//           padding: 4,
//           flexGrow: 1,
//           height: "calc(100vh - 7vh)",
//           overflowY: "auto",
//         }}
//       >
//         {selectedCourse ? (
//           <>
//             <Paper
//               elevation={2}
//               sx={{
//                 padding: 3,
//                 mb: 4,
//                 backgroundColor: "#f0f8ff",
//                 borderRadius: 2,
//                 border: "1px solid #ddd",
//               }}
//             >
//               {/* Course Name */}
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <BookIcon sx={{ color: "#008080", mr: 1 }} />
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#008080",
//                   }}
//                 >
//                   {selectedCourse.courseName}
//                 </Typography>
//               </Box>

//               {/* Batch */}
//               <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                 <GroupIcon sx={{ color: "#333", mr: 1 }} />
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     fontWeight: 600,
//                     color: "#333",
//                   }}
//                 >
//                   Batch: {selectedCourse.batch}
//                 </Typography>
//               </Box>

//               {/* Instructor */}
//               <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                 <PersonIcon sx={{ color: "#666", mr: 1 }} />
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: "#666",
//                   }}
//                 >
//                   Instructor : Rahees Sir
//                 </Typography>
//               </Box>

//               {/* Time */}
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <AccessTimeIcon
//                   sx={{ fontSize: "22px", color: "#666", mr: 1 }}
//                 />
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: "#666",
//                   }}
//                 >
//                   Time: 8 PM to 10 PM
//                 </Typography>
//               </Box>
//             </Paper>

//             <CourseTabPanel />
//           </>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <Typography variant="body1" color="text.secondary">
//               No Item Is Selected
//             </Typography>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default MainComponent;



import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MyCourseSidebar } from "./MyCourseSidebar";
import CourseTabPanel from "./TabPanel";
import CalendarComponent from "./CustomDatePicker";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { useQuery } from 'react-query';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MyCourseService from '../../services/user/MyCourse';
import Spinner from "../Spinner/Spinner";

const MainComponent = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesWithStatus, setCoursesWithStatus] = useState([]);
  console.log('Hello iam course with status:',coursesWithStatus);
  
  const handleCourseSelect = (course) => setSelectedCourse(course);

  const email = "anz4web@gmail.com";

  // Fetch courses using useQuery
  const { data: batchData, error, isLoading } = useQuery(['myCourse', email], MyCourseService);

  // Function to assign status based on date comparison
  const assignStatusToCourses = (batchData) => {
    const currentDate = new Date();
  
    return batchData.map((course) => {
      const startDate = new Date(course.start_date);
      const endDate = new Date(course.end_date);
  
      let status = "OnGoing"; // Default to 'OnGoing'
  
      // Logic to determine the course status
      if (course.cancelled) {
        status = "Cancelled";
      } else if (currentDate < startDate) {
        status = "Upcoming"; // Change to 'Upcoming' if the course hasn't started yet
      } else if (currentDate > endDate) {
        status = "Completed";
      }
  
      return {
        ...course,
        status, // Assign the calculated status
      };
    });
  };
  
  
  // When data is fetched, assign status and update state
  useEffect(() => {
    if (batchData) {
      const processedCourses = assignStatusToCourses(batchData);
      setCoursesWithStatus(processedCourses); // Update state with courses having status
    }
  }, [batchData]);

  if (isLoading) {
    return <Spinner />; // Show spinner while loading
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box sx={{ display: "flex", padding: 3, gap: 2 }}>
      <MyCourseSidebar onCourseSelect={handleCourseSelect} batch={coursesWithStatus} />
      
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          flexGrow: 1,
          height: "calc(100vh - 7vh)",
          overflowY: "auto",
        }}
      >
        {selectedCourse ? (
          <>
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                mb: 4,
                backgroundColor: "#f0f8ff",
                borderRadius: 2,
                border: "1px solid #ddd",
              }}
            >
              {/* Course Name */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BookIcon sx={{ color: "#008080", mr: 1 }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#008080",
                  }}
                >
                  {selectedCourse.courseName}
                </Typography>
              </Box>

              {/* Batch */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <GroupIcon sx={{ color: "#333", mr: 1 }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Batch: {selectedCourse.batch}
                </Typography>
              </Box>

              {/* Instructor */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PersonIcon sx={{ color: "#666", mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666",
                  }}
                >
                  Instructor : Rahees Sir
                </Typography>
              </Box>

              {/* Time */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon
                  sx={{ fontSize: "22px", color: "#666", mr: 1 }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666",
                  }}
                >
                  Time: 8 PM to 10 PM
                </Typography>
              </Box>

              {/* Status */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body1" sx={{ color: "#008080", fontWeight: 'bold' }}>
                  Status: {selectedCourse.status} {/* Display the course status */}
                </Typography>
              </Box>
            </Paper>

            <CourseTabPanel />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No Item Is Selected
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MainComponent;
