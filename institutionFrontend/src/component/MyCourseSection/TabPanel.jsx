import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Tabs, Tab, Typography, Button, useMediaQuery } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CalendarComponent from "./CustomDatePicker";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";

const downloadFile = (url, filename) => {
  console.log("trigger this functions");

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => console.error("Error downloading the file", error));
};

const CourseTabPanel = ({ lessonsData, selectedBatch }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("From parent to CHild ________________________", selectedBatch);

  console.log(
    "LessonCourrseTabPanel Component is mounted-------------------------------------------------------"
  );

  console.log(" Lesson data from parent :", lessonsData);

  // Initialize selectedWeek with "1" as the default for Week 1
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState("1");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    // Set default week to 1 when switching to the Weeks tab
    if (newValue === 1) {
      setSelectedWeek("1"); // Week 1 is selected by default
    }
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const getWeekTopics = (week) => {
    return lessonsData.filter(
      (lesson) => lesson.week === week && selectedBatch == lesson.bathName
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#008080",
            },
          }}
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab
            value={0}
            label="Sessions"
            sx={{
              color: selectedTab === 0 ? "#008080" : "inherit",
              "&.Mui-selected": {
                color: "#008080",
              },
            }}
          />
          <Tab
            value={1}
            label="Weeks"
            sx={{
              color: selectedTab === 1 ? "#008080" : "inherit",
              "&.Mui-selected": {
                color: "#008080",
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Tab 0: Sessions */}
      {selectedTab === 0 && (
        <Box sx={{ p: 3 }}>
          <CalendarComponent />
        </Box>
      )}

      {/* Tab 1: Weeks */}
      {selectedTab === 1 && (
        <Box sx={{ p: 1, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 2,
              alignItems: "center",
              position: isMobile ? "static" : "absolute",
              right: isMobile ? "auto" : 0,
              flexWrap: isMobile ? "wrap" : "nowrap", // Enable wrap on mobile
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: isMobile ? "1rem" : "1.25rem", // Adjust font size
              }}
            >
              Select Week
            </Typography>

            {/* Week Selector */}
            <FormControl sx={{ minWidth: isMobile ? 130 : 150 }}>
              <Select
                id="week-select"
                value={selectedWeek}
                onChange={handleWeekChange}
                displayEmpty
              >
                {[...new Set(lessonsData.map((lesson) => lesson.week))]
                  .sort((a, b) => a - b)
                  .map((week) => (
                    <MenuItem key={week} value={week}>
                      Week {week}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          {/* Display lessons for the selected week */}
          {selectedWeek && (
            <Box>
              <Typography
                textAlign="center"
                color="#008080"
                variant="h6"
                sx={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Week {selectedWeek} Topics
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: "-5px",
                    height: "2px",
                    backgroundColor: "green",
                  }}
                />
              </Typography>
              {getWeekTopics(Number(selectedWeek))?.length > 0 ? (
                getWeekTopics(Number(selectedWeek)).map((lesson) => (
                  <Box key={lesson.id} sx={{ marginBottom: 2, padding: 2 }}>
                    <Typography color="#008080" variant="h6" margin="16px 0">
                      {lesson.name}
                    </Typography>
                    <Typography
                      fontSize={isMobile ? "1.15rem" : "1.5rem"}
                      variant="body2"
                    >
                      {lesson.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontSize={20}
                      margin="16px 0"
                      color="#008080"
                    >
                      Images:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        overflowX: "auto",
                        gap: 2,
                      }}
                    >
                      {/* Lesson Images  */}

                      {lesson.images.map((image) => (
                        <Box
                          key={image.id}
                          sx={{
                            width: "auto",
                            flexShrink: 0,
                            cursor: "pointer",
                          }}
                          onClick={() => window.open(image.image, "_blank")}
                        >
                          {" "}
                          <img
                            src={image.image}
                            alt={`Lesson ${lesson.name}`}
                            style={{
                              width: isMobile ? "300px" : "450px",
                              height: isMobile ? "200px" : "350px",
                            }}
                          />
                        </Box>
                      ))}
                    </Box>

                    {lesson.pdfs.length > 0 ? (
                      lesson.pdfs.map((pdf, idx) => (
                        <Box key={pdf.id} sx={{ marginBottom: 1 }}>
                          <Typography
                            variant="body2"
                            fontSize={20}
                            margin="16px 0"
                            color="#008080"
                          >
                            PDF{idx + 1}:-
                          </Typography>

                          <Button
                            onClick={() => window.open(pdf.pdf, "_blank")}
                          >
                            View PDF <PreviewIcon />
                          </Button>

                          <Button
                            onClick={() =>
                              downloadFile(pdf.pdf, `lesson-pdf-${idx + 1}.pdf`)
                            }
                          >
                            Download PDF{idx + 1} <DownloadIcon />
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <Typography>No Pdf Is Available</Typography>
                    )}

                    <Typography
                      variant="body2"
                      fontSize={20}
                      margin="16px 0"
                      color="#008080"
                    >
                      Videos:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        overflowX: "auto",
                        gap: 2,
                      }}
                    >
                      {lesson.videos.length > 0 ? (
                        <Box sx={{ marginBottom: 2, display: "flex", gap: 2 }}>
                          {lesson.videos.map((video, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: "auto",
                                flexShrink: 0,
                                cursor: "pointer",
                              }}
                              onClick={() => window.open(video.video, "_blank")}
                            >
                              {" "}
                              <video controls width="450" height="350">
                                <source src={video.video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Box>No Video Available</Box>
                      )}
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No topics available for this week.</Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CourseTabPanel;
