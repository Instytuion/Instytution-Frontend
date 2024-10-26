const styles = () => ({
  favorite: (isWishlisted) => ({
    position: "absolute",
    top: 15,
    right: 5,
    cursor: "pointer",
    color: isWishlisted ? "red" : "inherit",
    zIndex: 10,
  }),
  sizeAndColorWrapper: {
    display: "flex",
    alignItems: "center",
    mb: 2,
    justifyContent: "center",
    flexDirection: "column",
    gap: 1,
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    zIndex: 1,
    "&:hover": {
      transform: "scale(1.05) !important",
    },
  },
  colorStyle: (color) => ({
    width: "15px",
    height: "15px",
    p: 1,
    mt: 1,
    borderRadius: "50%",
    backgroundColor: color.toLowerCase(),
    boxShadow: "5px 5px 5px #dfe3ea, 5px 5px 5px #faffff",
  }),
  sizeStyle: {
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: "#f0f0f0",
    color: "#000",
    marginLeft: 1,
    cursor: "pointer",
    border: "#ddd",
    fontSize: "0.75rem",
    boxShadow: "5px 5px 5px #dfe3ea, 5px 5px 5px #faffff",
  },
});

export default styles;
