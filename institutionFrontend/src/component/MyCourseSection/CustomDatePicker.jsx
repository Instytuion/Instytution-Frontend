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
import { useQuery } from "react-query";
import SessionVideos from "../../services/user/SessionVideos";
import CartLoader from "../Spinner/CartLoader";

const CalendarComponent = ({ batch, endDate, startDate }) => {
  const [videos, setVideos] = [];

  const { data, isLoading, error } = useQuery(
    ["Session_Videos", batch],
    () => SessionVideos(batch),
    {
      enabled: !!batch,
    }
  );

  if (isLoading) <CartLoader />;
  if (error) return <Typography color="error">Error loading videos</Typography>;

  console.log("data from fetching session videos :", data);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const minDate = new Date(startDate);
  const maxDate = new Date(endDate);

  const videosByDate = data?.reduce((acc, video) => {
    const videoDate = dayjs(video.date).format("YYYY-MM-DD");
    if (!acc[videoDate]) {
      acc[videoDate] = [];
    }
    acc[videoDate].push(video);
    acc[videoDate].sort((a, b) => a.video_serial - b.video_serial);
    return acc;
  }, {});
  console.log("video By date is :", videosByDate);

  const navigate = useNavigate();

  const handleVideoClick = (url) => {
    console.log("====================================");
    console.log("VIdeos is :", url);
    console.log("====================================");
    navigate("/video", { state: { url: url } });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        tileContent={({ date }) => {
          const dateKey = dayjs(date).format("YYYY-MM-DD");
          const videos = videosByDate?.[dateKey];

          // const video = data?.find((item) =>
          //   dayjs(date).isSame(item.date, "day")
          // );

          return videos ? (
            <PlayCircleFilledIcon
              sx={{ fontSize: 22, color: "#000", cursor: "pointer" }}
              onClick={() => handleVideoClick(videos)}
            />
          ) : null;
        }}
      />
    </Box>
  );
};

export default CalendarComponent;
