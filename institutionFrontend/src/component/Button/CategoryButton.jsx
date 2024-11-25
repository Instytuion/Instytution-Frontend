// CategoryButton.js
import React from "react";
import {Button} from "@mui/material";
import {useTheme} from "@emotion/react";

const CategoryButton = ({label, selectedCategory, onSelect}) => {
  const theme = useTheme();
  const isSelected = selectedCategory === label;
  const selectedStyle = {
    background: isSelected
      ? "linear-gradient(135deg, #008080, #005959)"
      : "transparent",
    color: isSelected ? "#fff" : theme.palette.text.primary,
    border: `1px solid #009688`,
    fontSize: 12,
  };

  return (
    <Button
      onClick={() => onSelect(label)}
      sx={{
        ...selectedStyle,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {label}
    </Button>
  );
};

export default CategoryButton;
