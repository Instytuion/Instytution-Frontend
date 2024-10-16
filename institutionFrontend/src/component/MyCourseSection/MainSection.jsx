import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import { MyCourseSidebar } from "./MyCourseSidebar";
import CourseTabPanel from "./TabPanel";
import CalendarComponent from "./CustomDatePicker";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { useQuery } from "react-query";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MyCourseService from "../../services/user/MyCourse";
import Spinner from "../Spinner/Spinner";
import { convert24To12Hour } from "../../utils/utilityFunctions";
import { useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";
const MainComponent = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coursesWithStatus, setCoursesWithStatus] = useState([]);
  const handleCourseSelect = (course) => setSelectedCourse(course);

  const email = useSelector((state) => state.userAuth.email);

  const {
    data: batchData,
    error,
    isLoading,
  } = useQuery(["myCourse", email], MyCourseService);
  console.log("BatchData is :", batchData);

  const lessonData = batchData
    ?.map((batch) =>
      batch.lesson.map((value) => ({
        ...value,
        bathName: batch.batch.name,
      }))
    )
    .flat();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  console.log("isSmall Screen Value si :", isSmallScreen);

  const assignStatusToCourses = (batchData) => {
    const currentDate = new Date();

    return batchData.map((course) => {
      const startDate = new Date(course.batch.start_date);
      const endDate = new Date(course.batch.end_date);

      let status = "OnGoing";

      if (course.cancelled) {
        status = "Cancelled";
      } else if (currentDate < startDate) {
        status = "Upcoming";
      } else if (currentDate > endDate) {
        status = "Completed";
      }

      return {
        ...course,
        status,
      };
    });
  };
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  useEffect(() => {
    if (batchData) {
      const processedCourses = assignStatusToCourses(batchData);
      setCoursesWithStatus(processedCourses);
    }
  }, [batchData]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
     {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ ml: 2,position:'sticky',  top: 16, left: 16 }}
          >
            <ListIcon />
          </IconButton>
        )}

    <Box sx={{ display: "flex", padding: 3, gap: 2 }}>
      <Box>
        {!isSmallScreen ? (
          <Box>
            <MyCourseSidebar
              onCourseSelect={handleCourseSelect}
              batch={coursesWithStatus}
            />
          </Box>
        ) : (
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{ width: 250, padding: 2 }}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <MyCourseSidebar
                onCourseSelect={handleCourseSelect}
                batch={coursesWithStatus}
              />
            </Box>
          </Drawer>
        )}
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          flexGrow: 1,
          height: isSmallScreen? "calc(100vh - 15vh)" : "calc(100vh - 7vh)",
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
                  {selectedCourse.course_name}
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
                  Batch: {selectedCourse.name}
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
                  Instructor : {selectedCourse.instructor_name}
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
                  Time: {convert24To12Hour(selectedCourse.start_time)} to{" "}
                  {convert24To12Hour(selectedCourse.end_time)}
                </Typography>
              </Box>

              {/* Status */}
            </Paper>

            <CourseTabPanel
              lessonsData={lessonData}
              selectedBatch={selectedCourse.name}
            />
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
    
    </>
    
  );
};

export default MainComponent;
