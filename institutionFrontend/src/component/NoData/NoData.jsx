import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import NoDataAnimation from "../../assets/NoData.json";
import {Stack, Typography} from "@mui/material";

const NoData = ({text}) => {
  return (
    <Stack  direction="column" alignItems="center" spacing={1} justifyContent={'center'}> 

      <Player
        autoplay
        loop
        src={NoDataAnimation}
        style={{height: "100px", width: "100px"}}
      />
      <Typography>
        {text}
      </Typography>
    </Stack>
  );
};

export default NoData;
