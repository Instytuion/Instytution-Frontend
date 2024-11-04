import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMediaQuery } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["OnGoing", "Upcoming", "Completed", "Cancelled"];

function getStyles(name, selectedName, theme) {
  return {
    fontWeight:
      selectedName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function DropdownMenu({ onStatusChange }) {
  const theme = useTheme();const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectedName, setSelectedName] = React.useState("OnGoing");

  const handleChange = (event) => {
    const newStatus = event.target.value;

    setSelectedName(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: isSmallScreen?170:200, mt: 3 }}>
        <Select
          displayEmpty
          value={selectedName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>Placeholder</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {names.map((name) => (
            <MenuItem       
              key={name}
              value={name}
              style={getStyles(name, selectedName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
