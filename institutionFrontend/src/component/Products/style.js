const style = () => ({
  colorBox: (availableColors, color, selectedColor) => ({
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    marginLeft: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor:
      availableColors && availableColors.has(color) ? "pointer" : "not-allowed",
    border:
      selectedColor.toLowerCase() === color.toLowerCase()
        ? "2px solid black"
        : "2px solid transparent",
    boxShadow:
      availableColors && availableColors.has(color)
        ? "5px 5px 5px #dfe3ea, 5px 5px 5px #faffff"
        : "0 0 2px rgba(128, 128, 128, 0.5)",
  }),
  innerDot: (color) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: color.toLowerCase(),
  }),
  wihsAndShareWrapper: {
    display: "flex",
    gap: 2,
    position: "absolute",
    top: 25,
    right: 5,
  },
  sizeBox: (selectedSize, size) => ({
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: selectedSize === size ? "#000" : "#f0f0f0",
    color: selectedSize === size ? "#fff" : "#000",
    marginLeft: 1,
    cursor: "pointer",
    border: `2px solid ${selectedSize === size ? "#000" : "#ddd"}`,
    fontSize: "0.75rem",
    boxShadow: "5px 5px 5px #dfe3ea, 5px 5px 5px #faffff",
    "&:hover": {
      backgroundColor: selectedSize === size ? "#333" : "#e0e0e0",
    },
  }),
});

export default style;
