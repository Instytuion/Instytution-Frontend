// Common label styles
export const getInputLabelProps = (isEditing) => ({
  sx: {
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: !isEditing
        ? "translate(0.6rem, -0.6rem)"
        : "translate(0.9rem, -0.6rem)", 
      color: "#00796b", 
      fontSize: !isEditing ? "1.1rem" : "0.7rem"
    },
    fontWeight: isEditing ? "normal" : "bold", 
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




