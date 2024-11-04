import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import CartLoaderJson from "../../assets/CartLoader.json";

const CartLoader = ({height="100vh"}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <Player
        autoplay
        loop
        src={CartLoaderJson}
        style={{height: "100px", width: "100px"}}
      />
    </div>
  );
};

export default CartLoader;
