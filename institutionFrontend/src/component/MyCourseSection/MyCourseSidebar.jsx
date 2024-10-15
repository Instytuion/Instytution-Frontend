// import React, { useState, useEffect ,useRef } from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import DropdownMenu from "./DropdownMenu";
// import SchoolIcon from "@mui/icons-material/School";

// export const MyCourseSidebar = ({  onCourseSelect, batch }) => {
//   console.log('batch data is: ',batch);
  
//   const [status, setStatus] = useState("OnGoing");
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState(null); 
//   const selectRef = useRef(null);
//   const dummyCoursesData = {
//     OnGoing: [
//       { id: 31, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 41, batch: "2023-D", courseName: "Node.js Basics" },
//       { id: 32, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 42, batch: "2023-D", courseName: "Node.js Basics" },
//       { id: 33, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 43, batch: "2023-D", courseName: "Node.js Basics" },
//       { id: 34, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 44, batch: "2023-D", courseName: "Node.js Basics" },
//       { id: 35, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 45, batch: "2023-D", courseName: "Node.js Basics" },
//       { id: 36, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 46, batch: "2023-D", courseName: "Node.js Basics" },
//     ],
//     Upcoming: [
//       { id: 3, batch: "2023-C", courseName: "Advanced CSS" },
//       { id: 4, batch: "2023-D", courseName: "Node.js Basics" },
//     ],
//     Completed: [
//       { id: 5, batch: "2023-E", courseName: "Python for Data Science" },
//       { id: 6, batch: "2023-F", courseName: "Django Web Development" },
//     ],
//     Cancelled: [{ id: 7, batch: "2023-G", courseName: "Machine Learning" }],
//   };

//   const fetchCoursesByStatus = (selectedStatus) => {
//     const coursesByStatus = dummyCoursesData[selectedStatus] || [];
//     setCourses(coursesByStatus);
//   };

//   const handleStatusChange = (newStatus) => {
//     setStatus(newStatus);
//     fetchCoursesByStatus(newStatus);
//     if (selectRef.current) {
//       selectRef.current.blur();
//     }
//   };

//   const handleCourseClick = (course) => {
//     setSelectedCourseId(course.id); 
//     onCourseSelect(course);
//   };

//   useEffect(() => {
//     fetchCoursesByStatus(status);
//   }, [status]);

//   return (
//     <Paper
//       elevation={7}
//       sx={{
//         width: 350,
        
//         borderRadius: 6,
//       }}
//     >
//       <Box>
//         <Typography
//           variant="h6"
//           sx={{
//             textAlign: "center",
//             padding: 2,
//             borderBottom: "2px solid #008080",
//             backgroundColor: "#f0f8ff",
//             color: "#008080",
//             fontWeight: "bold",
//           }}
//         >
//           My Course <SchoolIcon sx={{ fontSize: 40, color: "#008080" }} />
//         </Typography> <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
//           <Typography variant="body1" >
//             Select Status:
//           </Typography>
//           <DropdownMenu onStatusChange={handleStatusChange} />
//         </Box>

//       </Box>
//       <Box sx={{height: "calc(100vh - 32vh)",
//         overflow: "auto",}}>
       
//         <Box sx={{ padding: 2 }}>
//           {courses.length > 0 ? (
//             courses.map((course) => (
//               <Box
//                 key={course.id}
//                 sx={{
//                   marginBottom: 2,
//                   padding: 1,
//                   border: "2px solid #e0e0e0",
//                   borderRadius: 2,
//                   transition: "0.5s",
//                   cursor: "pointer",
//                   backgroundColor:
//                     selectedCourseId === course.id ? "#008080" : "transparent",
//                   color: selectedCourseId === course.id ? "#fff" : "#008080",
//                   "&:hover": {
//                     boxShadow: "0px 4px 8px rgba(0, 128, 128, 0.5)",
//                   },
//                 }}
//                 onClick={() => handleCourseClick(course)}
//               >
//                 <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                   Batch: {course.batch} ({course.courseName})
//                 </Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography sx={{ textAlign: "center", color: "#888" }}>
//               No courses available for {status}
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Paper>
//   );
// };










import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import DropdownMenu from "./DropdownMenu";

export const MyCourseSidebar = ({ onCourseSelect, batch }) => {
  console.log('log data comign from parent to mycourse sidebar is :',batch);
  
  const [status, setStatus] = useState("OnGoing");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const selectRef = useRef(null);
  console.log('courses are :',courses);
  
  // Function to filter courses based on the selected status
  const filterCoursesByStatus = (selectedStatus) => {
    console.log('Selected Status:', selectedStatus); // Log the selected status
  
    // Filter items based on the selected status
    const filteredItems = batch.filter((item) => {
      console.log('Item:', item); // Log the current item
      const isMatchingStatus = item.status === selectedStatus; // Check if the status matches
      console.log(`Item Status: ${item.status}, Matches: ${isMatchingStatus}`); // Log the comparison result
      return isMatchingStatus; // Return true if the status matches
    });
  
    console.log('Filtered Items:', filteredItems); // Log filtered items before flattening
  
    // Extract lessons (courses) for the matched status
    const courses = filteredItems.flatMap((item) => {
      console.log('====================================');
      console.log('Inside flattening for item:', item); // Log the current item being processed
      const data = item.batch; // Extract the batch data
      console.log('Extracted Batch Data:', data); // Log the extracted batch data
      return data; // Return the batch data to be flattened
    });
  
    console.log('Courses:', courses); // Log the final list of courses
    return courses; // Return the final courses array
  };
  ``

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourseId(course.id);
    onCourseSelect(course);
  };

  useEffect(() => {
    if (batch && Array.isArray(batch)) {
      const da = filterCoursesByStatus(status)
      console.log('====================================');
      console.log('data from return fn :',da);
      console.log('====================================');
      
      
      setCourses(da); // Filter courses based on the initial status
    } else {
      setCourses([]); // Clear courses if batch is invalid
    }
  }, [batch, status]); // Re-filter courses when batch or status changes

  return (
    <Paper elevation={7} sx={{ width: 350, borderRadius: 6 }}>
      <Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            padding: 2,
            borderBottom: "2px solid #008080",
            backgroundColor: "#f0f8ff",
            color: "#008080",
            fontWeight: "bold",
          }}
        >
          My Courses
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <Typography variant="body1">Select Status:</Typography>
          <DropdownMenu onStatusChange={handleStatusChange} />
        </Box>
      </Box>
      <Box sx={{ height: "calc(100vh - 32vh)", overflow: "auto" }}>
        <Box sx={{ padding: 2 }}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <Box
                key={course.id}
                sx={{
                  marginBottom: 2,
                  padding: 1,
                  border: "2px solid #e0e0e0",
                  borderRadius: 2,
                  transition: "0.5s",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCourseId === course.id ? "#008080" : "transparent",
                  color: selectedCourseId === course.id ? "#fff" : "#008080",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 128, 128, 0.5)",
                  },
                }}
                onClick={() => handleCourseClick(course)}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {course.name}({course.course_name})
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "#888" }}>
              No courses available for {status}.
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
