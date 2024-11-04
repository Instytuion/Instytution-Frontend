const styles = (isSmallScreen) => ({
  productBannerBase: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: isSmallScreen ? "calc(100vh - 20vh)" : "calc(100vh - 8vh)",
    width: "100%",
    overflow: "hidden",
    "&:hover .overlay": {
      opacity: 0.5,
    },
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    bgcolor: "rgba(0, 0, 0, 0.5)", // Initial dark overlay
    transition: "opacity 0.3s ease", // Smooth transition
    opacity: 0, // Start with 0 opacity
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    color: "white",
    fontSize: isSmallScreen ? "1.5rem" : "3rem",
    fontWeight: "bold",
    textShadow: "0px 0px 10px rgba(0,0,0,0.8)",
    lineHeight: 1.1,
  },
  description: {
    mt: 2,
    color: "#F2F2F0",
    textShadow: "0px 0px 10px rgba(0,0,0,0.8)",
    textAlign: "center",
  },
  button: {
    mt: 2,
    color: "#F2F2F0",
    textShadow: "0px 0px 10px rgba(0,0,0,0.10)",
    bgcolor: "transparent",
    border: "2px solid #009688",
    borderRadius: 0,
    "&:hover": {
      bgcolor: "#009688",
      borderColor: "#F2F2F0",
      border: "2px solid #009688",
      ".arrowIcon": {
        transform: "translateX(10px)",
        transition: "transform 0.3s ease-in-out",
      },
    },
  },
});

export default styles;
