


import { keyframes } from "@mui/system";

//  These are the animation for button 

// ------------- This for moving effect on the x- axis ( used on :- cart button)
export const bounceAnimation = {
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

// ------------- This for Jumping  effect with scale and rotate ( used on :- checkout page  )

export const bounceAndScale = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  40% {
    transform: translateY(-10px) scale(1.1) rotate(-5deg);
  }
  60% {
    transform: translateY(-5px) scale(1.05) rotate(5deg);
  }
`;
  
