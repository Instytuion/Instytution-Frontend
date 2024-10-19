import React from "react";
import {Player} from "@lottiefiles/react-lottie-player"; 
import AddToCart from "../../assets/AddToCart.json"; 

const AddToCartLoader = () => {
  return (
    <div
    >
      <Player
        autoplay
        loop
        src={AddToCart}
        style={{height: "120px", width: "120px"}} 
      />
    </div>
  );
};

export default AddToCartLoader;
