// import SchoolIcon from "@mui/icons-material/School";
// import React, { useState, useEffect, useRef } from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import DropdownMenu from "./DropdownMenu";

// export const MyCourseSidebar = ({ onCourseSelect, batch }) => {
//   const [status, setStatus] = useState("OnGoing");
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState(null);
//   const selectRef = useRef(null);

//   const filterCoursesByStatus = (selectedStatus) => {
//     const filteredItems = batch.filter((item) => {
//       console.log("items are :", item);

//       const isMatchingStatus = item.status === selectedStatus;
//       return isMatchingStatus;
//     });

//     const courses = filteredItems.flatMap((item) => {
//       const data = item.batch;

//       return data;
//     });

//     return courses;
//   };

//   const handleStatusChange = (newStatus) => {
//     setStatus(newStatus);
//     if (selectRef.current) {
//       selectRef.current.blur();
//     }
//   };

//   const handleCourseClick = (course) => {
//     setSelectedCourseId(course.id);
//     onCourseSelect(course);
//   };

//   useEffect(() => {
//     if (batch && Array.isArray(batch)) {
//       const da = filterCoursesByStatus(status);

//       setCourses(da);
//     } else {
//       setCourses([]);
//     }
//   }, [batch, status]);

//   return (
//     <Paper elevation={7} sx={{ width: 350, borderRadius: 6 }}>
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
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
//           <Typography variant="body1">Select Status:</Typography>
//           <DropdownMenu onStatusChange={handleStatusChange} />
//         </Box>
//       </Box>
//       <Box sx={{ height: "calc(100vh - 32vh)", overflow: "auto" }}>
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
//                   {course.name}({course.course_name})
//                 </Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography sx={{ textAlign: "center", color: "#888" }}>
//               No courses available for {status}.
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

//

import SchoolIcon from "@mui/icons-material/School";
import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import DropdownMenu from "./DropdownMenu";

export const MyCourseSidebar = ({ onCourseSelect, batch }) => {
  const [status, setStatus] = useState("OnGoing");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const selectRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const filterCoursesByStatus = (selectedStatus) => {
    const filteredItems = batch.filter((item) => {
      const isMatchingStatus = item.status === selectedStatus;
      return isMatchingStatus;
    });

    const courses = filteredItems.flatMap((item) => {
      const data = item.batch;
      return data;
    });

    return courses;
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // if (selectRef.current ) {
    //   selectRef.current.blur();
    // }
  };

  const handleCourseClick = (course) => {
    setSelectedCourseId(course.id);
    onCourseSelect(course);
  };

  useEffect(() => {
    if (batch && Array.isArray(batch)) {
      const filteredCourses = filterCoursesByStatus(status);
      setCourses(filteredCourses);
    } else {
      setCourses([]);
    }
  }, [batch, status]);

  return (
    <Paper
      elevation={7}
      sx={{
        width: isSmallScreen ? "100%" : 350, // Full width on small screens
        borderRadius: 6,
        position: isSmallScreen ? "relative" : "sticky",
        top: isSmallScreen ? "auto" : "10px", // Adjust top margin for non-small screens
      }}
    >
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
          My Course <SchoolIcon sx={{ fontSize: 40, color: "#008080" }} />
        </Typography>
        <Box
          sx={{
            display: isSmallScreen ? "block" : "flex",
            alignItems: "center",
            padding: isSmallScreen ? 2 : 1,
          }}
        >
          <Typography variant="body1">Select Status:</Typography>
          <DropdownMenu onStatusChange={handleStatusChange} />
        </Box>
      </Box>
      <Box
        sx={{
          height: isSmallScreen ? "auto" : "calc(100vh - 32vh)", // Dynamic height
          overflow: "auto",
        }}
      >
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
