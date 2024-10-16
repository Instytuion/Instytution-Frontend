// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import dayjs from 'dayjs';
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
// import { Box } from '@mui/material';

// const CalendarComponent = () => {
//   const minDate = new Date(2024, 9, 10);
//   const maxDate = new Date(2024, 9, 20);
//   const availableVideos = [
//     dayjs('2024-10-11'),
//     dayjs('2024-10-13'),
//     dayjs('2024-10-15'),
//     dayjs('2024-10-14'),
//     dayjs('2024-10-17'),
//   ];

//   const [selectedDate, setSelectedDate] = useState(new Date());

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//       <Calendar
//         onChange={setSelectedDate}
//         value={selectedDate}
//         minDate={minDate}
//         maxDate={maxDate}
//         tileContent={({ date }) => {
//           const hasVideo = availableVideos.some((availableDate) =>
//             dayjs(date).isSame(availableDate, 'day')
//           );

//           return hasVideo ? (
//             <PlayCircleFilledIcon sx={{ fontSize: 22, color: '#4caf50' }} />
//           ) : null;
//         }}
//       />
//     </Box>
//   );
// };

// export default CalendarComponent;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Box } from "@mui/material";

const CalendarComponent = () => {
  // Available video dates and URLs
  const availableVideos = [
    { date: dayjs("2024-10-11"), url: "https://youtu.be/_ktvAxDMj5k" },
    { date: dayjs("2024-10-13"), url: "https://youtu.be/example2" },
    { date: dayjs("2024-10-15"), url: "https://youtu.be/example3" },
    { date: dayjs("2024-10-14"), url: "https://youtu.be/example4" },
    { date: dayjs("2024-10-17"), url: "https://youtu.be/example5" },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const minDate = new Date(2024, 9, 10);
  const maxDate = new Date(2024, 9, 20);

  const navigate = useNavigate();

  const handleVideoClick = (url) => {
    navigate(`/video?url=${encodeURIComponent(url)}`);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        tileContent={({ date }) => {
          const video = availableVideos.find((video) =>
            dayjs(date).isSame(video.date, "day")
          );

          return video ? (
            <PlayCircleFilledIcon
              sx={{ fontSize: 22, color: "#000", cursor: "pointer" }}
              onClick={() => handleVideoClick(video.url)}
            />
          ) : null;
        }}
      />
    </Box>
  );
};

export default CalendarComponent;
