import React from "react";
import {Player} from "@lottiefiles/react-lottie-player"; 
import BookLoaderAnimation from "../../assets/BookLoader.json"; 

const BookLoaderJson = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Player
        autoplay
        loop
        src={BookLoaderAnimation}
        style={{height: "120px", width: "120px"}} 
      />
    </div>
  );
};

export default BookLoaderJson;
