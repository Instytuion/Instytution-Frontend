const styles = () => ({
  subCategoryButton: (isSelected) => ({
    color: isSelected ? "white" : "#000",
    backgroundColor: isSelected ? "#009688" : "transparent",
    border: "1px solid #009688",
  }),
  sizeButton: (isSelected) => ({
    width: 40,
    height: 40,
    color: isSelected ? "white" : "#000",
    backgroundColor: isSelected ? "#009688" : "transparent",
    border: "1px solid #009688",
    borderRadius: "50%",
    transition: "all 0.3s",
    textAlign: "center",
  }),
  colorButton: (isSelected, color) => ({
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: color,
    border: isSelected ? "3px solid #f2f2f0" : `3px solid ${color}`,
    transition: "all 0.3s",
    boxShadow: isSelected
      ? "0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.1)"
      : "",
    cursor: "pointer",
  }),
  drawer: (drawerWidth) => ({
    width: drawerWidth,
    display: "flex",
    flexDirection: "column",
  }),
  priceSlider: {
    mt: 1,
    color: "#009688",
    "& .MuiSlider-thumb": {
      backgroundColor: "#009688",
    },
    "& .MuiSlider-track": {
      backgroundColor: "#009688",
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#b2dfdb",
    },
  },
  clearButton: {
    color: "#000",
    width: "50%",
  },
  applyButton: {
    bgcolor: "#00796b",
    color: "white",
    width: "50%",
  },
  titleStyles: {
    fontWeight: "700",
  },
});

export default styles;
