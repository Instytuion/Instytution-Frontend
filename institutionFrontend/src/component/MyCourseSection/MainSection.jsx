import React, { useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import { MyCourseSidebar } from "./MyCourseSidebar";
import CourseTabPanel from "./TabPanel";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useNavigate } from "react-router-dom";
const MainComponent = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleCourseSelect = (course) => setSelectedCourse(course);

  return (
    <Box sx={{ display: "flex", padding: 3, gap: 2 }}>
      <MyCourseSidebar onCourseSelect={handleCourseSelect} />

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          flexGrow: 1,

          // borderRadius: 2,
          // boxShadow: 1,
          height: "calc(100vh - 7vh)",
          overflowY: "auto",
        }}
      >
        {selectedCourse ? (
          <>
            {/* <Typography variant="h5" sx={{ mb: 2 }}>
              Selected Course:
            </Typography> */}
            <Paper
              elevation={2}
              sx={{
                padding: 3,
                mb: 4,
                backgroundColor: "#f0f8ff",
                borderRadius: 2,
                border: "1px solid #ddd",
                position: "relative"
              }}
            >
              <Paper
              sx={{
                position:"absolute",
                right:"10px",
                top: "10px",
                flex:"column",
                p:0,
                backgroundColor: "#f0f8ff",
              }}
              >
                <IconButton
                onClick={()=> navigate(`/courses/mycourses/classRoom/${selectedCourse.batch}`)}
                >
                  <LiveTvIcon />Live
                </IconButton>
              </Paper>
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
                <PersonIcon  sx={{ color: "#666", mr: 1 }} />
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
                <AccessTimeIcon sx={{fontSize:"22px", color: "#666", mr: 1 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666",
                  }}
                >
                  Time: 8 PM to 10 PM
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
