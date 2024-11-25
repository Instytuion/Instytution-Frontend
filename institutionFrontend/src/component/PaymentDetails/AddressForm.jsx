import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const AddressForm = ({ fields, values, onChange, readOnlyFields }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = `${name.replace("_", " ")} is required`;
    } else if (name === "pincode" && !/^\d{6}$/.test(value)) {
      error = "Pincode must be a 6-digit number";
    } else if (name === "phone_number" && !/^\d{10}$/.test(value)) {
      error = "Phone number must be a 10-digit number";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange(e); 
    validateField(name, value); 
  };

  return (
    <Box sx={{ padding: 2 }}>
      {fields.map((field) => (
        <Box key={field.name} sx={{ mb: 2 }}>
          <TextField
            margin="dense"
            label={field.label}
            name={field.name}
            fullWidth
            variant="outlined"
            value={values[field.name] || ""}
            onChange={handleFieldChange} 
            InputProps={{
              readOnly: readOnlyFields.includes(field.name), 
            }}
            sx={{
              bgcolor: readOnlyFields.includes(field.name) ? "#a59e9b" : "",
            }}
            error={!!errors[field.name]}    
            helperText={errors[field.name]} 
          />
        </Box>
      ))}
    </Box>
  );
};

export default AddressForm;
