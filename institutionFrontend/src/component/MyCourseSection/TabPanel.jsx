import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Tabs, Tab, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CalendarComponent from "./CustomDatePicker";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";

const lessonsData = [
  {
    id: "5",
    name: "Python-L1",
    description:
      "Python courses cover topics related to the Python programming language, which is used for building websites, automating tasks, and analyzing data.",
    week: 1,
    course: 1,
    images: [
      {
        id: "31",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "37",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "38",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "39",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "395",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "394",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "393",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "392",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "391",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
      {
        id: "311",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899517/u5rp9twr7qrvkurxpgjl.jpg",
      },
    ],
    pdfs: [
      {
        id: "4",
        pdf: "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727849217/gun6azypjqhercinrgo7.pdf",
      },
    ],
    videos: [
      {
        id: 12,
        video:
          "https://www.instagram.com/reel/DA23TnloB5N/?utm_source=ig_web_copy_link ",
      },
      {
        id: 121,
        video:
          "https://www.instagram.com/reel/DA23TnloB5N/?utm_source=ig_web_copy_link ",
      },
      {
        id: 122,
        video:
          "https://www.instagram.com/reel/DA23TnloB5N/?utm_source=ig_web_copy_link ",
      },
      {
        id: 123,
        video:
          "https://www.instagram.com/reel/DA23TnloB5N/?utm_source=ig_web_copy_link ",
      },
    ],
  },
  {
    id: "16",
    name: "Python-L2",
    description:
      "Python courses cover more advanced topics, including object-oriented programming and data structures.",
    week: 2,
    course: 1,
    images: [
      {
        id: "41",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727899474/cz9wpb3nqx7d50oytiwe.jpg",
      },
    ],
    pdfs: [
      {
        id: "15",
        pdf: "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727855231/tntyntom403qdrbjqedn.pdf",
      },
    ],
    videos: [],
  },
  {
    id: "21",
    name: "Python-L3",
    description:
      "In this lesson, you will learn how to work with databases, APIs, and deploy your Python projects.",
    week: 3,
    course: 1,
    images: [
      {
        id: "37",
        image:
          "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727898778/zotimkpwp6hu7w7tkv2b.jpg",
      },
    ],
    pdfs: [
      {
        id: "23",
        pdf: "http://res.cloudinary.com/dcbhug1ev/image/upload/v1727898784/hrx86c7bpn2vxaqwkj04.pdf",
      },
    ],
    videos: "https://youtu.be/LXb3EKWsInQ",
  },
];

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

const CourseTabPanel = () => {
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
    return lessonsData.filter((lesson) => lesson.week === week);
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
        <Box sx={{ p: 3, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: "absolute",
              right: 0,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Select Week
            </Typography>

            {/* Week Selector */}
            <FormControl sx={{ minWidth: 150 }}>
              <Select
                id="week-select"
                value={selectedWeek}
                onChange={handleWeekChange}
                displayEmpty
              >
                {[...new Set(lessonsData.map((lesson) => lesson.week))].map(
                  (week) => (
                    <MenuItem key={week} value={week}>
                      Week {week}
                    </MenuItem>
                  )
                )}
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
                  <Box key={lesson.id} sx={{ marginBottom: 2, padding:2 }}>
                    <Typography color="#008080" variant="h6" margin="16px 0">
                      {lesson.name}
                    </Typography>
                    <Typography fontSize={23} variant="body2">
                      {lesson.description}
                    </Typography>
                    <Typography variant="body2" fontSize={20} margin="16px 0" color="#008080">Images:</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        overflowX: "auto",
                        gap: 2,
                      }}
                    >
                      {lesson.images.map((image) => (
                        <Box
                          key={image.id}
                          sx={{ width: "auto", flexShrink: 0,cursor:'pointer' }}
                          onClick={() => window.open(image.image, "_blank")}
                        >
                          {" "}
                          <img
                            src={image.image}
                            alt={`Lesson ${lesson.name}`}
                            style={{ width: "450px", height: "350px" }}
                          />
                        </Box>
                      ))}
                    </Box>

                    {lesson.pdfs.map((pdf) => (
                      <Box key={pdf.id} sx={{ marginBottom: 1 }}>
                        <Typography variant="body2" fontSize={20} margin="16px 0" color="#008080">PDF:</Typography>

                        <Button onClick={() => window.open(pdf.pdf, "_blank")}>
                          View PDF <PreviewIcon />
                        </Button>
                        <Button
                          onClick={() => downloadFile(pdf.pdf, "lesson.pdf")} //
                        >
                          Download PDF1 <DownloadIcon />
                        </Button>
                      </Box>
                    ))}
                    <Typography variant="body2" fontSize={20} margin="16px 0" color="#008080">Videos:</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        overflowX: "auto",
                        gap: 2,
                      }}
                    >
                      
                      {lesson.videos.length > 0 && (
                        <Box sx={{ marginBottom: 2, display: "flex" ,gap:2}}>
                          
                          {lesson.videos.map((video, index) => (
                            <Box
                              key={index}
                              sx={{ width: "auto", flexShrink: 0 ,cursor:'pointer'}}
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
