const styles = {
  container: {
    mt: 3,
    borderRadius: 3,
    pb: 3,
    maxWidth: "90%",
    "@media (min-width:600px)": {
      maxWidth: "600px",
    },
  },
  parentOne: {
    position: "relative",
    height: "27.33vh",
    borderRadius: "10px 10px 0px 0px",
    background: "linear-gradient(135deg, #009688, #004d40)",
  },
  profileImageContainer: {
    width: 121,
    height: 121,
    borderRadius: "50%",
    border: "2px solid white",
    position: "absolute",
    bottom: -60,
    left: {
      xs: "50%",
    },
    transform: {
      xs: "translateX(-50%)",
    },
  },
  addPhotoIcon: {
    position: "absolute",
    bottom: -65,
    left: { xs: "55%" },
    transform: { xs: "translateX(-60%)" },
    bgcolor: "grey",
    opacity: "59%",
    p: 1,
    ":hover": { backgroundColor: "#009688", color: "white" },
  },
  parentTwo: {
    p: 3,
    mt: 7,
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  otpContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    position: "relative",
    paddingTop: 2,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
  },
  profileImgAlt: {
    width: "auto",
    height: 120,
    borderRadius: "50%",
    bgcolor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 36,
  },
  card: {
    width: {
      xs: "100%",
      md: "50%",
    },
  },
};

export default styles;
