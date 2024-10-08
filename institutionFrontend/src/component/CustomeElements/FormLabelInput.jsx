// Common label styles
export const getInputLabelProps = (isEditing) => ({
  sx: {
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      fontSize: "0.8rem", // When the label is focused or shrunk
      transform: !isEditing
        ? "translate(0.6rem, -0.6rem)"
        : "translate(0.9rem, -0.6rem)", // Adjust the position when shrunk
      color: "#00796b", // Color when focused
      fontSize: !isEditing ? "1.1rem" : "0.7rem"
    },// Make the label slightly bigger when not editing
    fontWeight: isEditing ? "normal" : "bold", // Bold the label when not editing
  },
});

// Common input styles
export const getInputProps = (isEditing) => ({
  readOnly: !isEditing,
  sx: {
    pointerEvents: !isEditing ? "none" : "auto",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: !isEditing ? "transparent" : "#00796b",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: !isEditing ? "transparent" : "#00796b",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#009688",
    },
    "& .MuiInputBase-input": {
      padding: "10px 10px",
      fontSize: !isEditing ? "16px" : "14px",
    },
  },
});




