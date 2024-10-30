const bounceAnimation = {
    animation: "bounce 3s infinite",
    "@keyframes bounce": {
      "0%, 20%, 50%, 80%, 100%": {
        transform: "translateX(0)",
      },
      "40%": {
        transform: "translateX(-10px)",
      },
      "60%": {
        transform: "translateX(-5px)",
      },
    },
  };
  
  export default bounceAnimation;