import React, {forwardRef} from "react";
import {useTheme} from "@emotion/react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {sharedStyles} from "./CustomFormInputStyles";


export const StyledTextField = forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <TextField
      {...props}
      ref={ref}
      sx={{
        ...sharedStyles(theme),
        ...props.sx,
      }}
    />
  );
});


export const StyledSelect = forwardRef(
  ({label, options, error, helperText, ...props}, ref) => {
    const theme = useTheme();

    return (
      <FormControl
        fullWidth
        error={error}
        sx={{
          ...sharedStyles(theme),
          ...props.sx,
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Select {...props} label={label} ref={ref}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);
