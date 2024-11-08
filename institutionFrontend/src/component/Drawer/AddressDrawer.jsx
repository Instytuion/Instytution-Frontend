import { Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import AddressForm from "../PaymentDetails/AddressForm";
import { getDetailsByPincode } from "../../services/PinCode/PinCode";
import useToast from "../../hooks/useToast";

const AddressDrawer = ({
  open,
  onClose,
  onSubmit,
  address,
  onInputChange,
  isLoading,
  isEditing,
}) => {
  const [errors, setErrors] = useState({});
  const [readOnlyFields, setReadOnlyFields] = useState(["city", "state"]);
  const showToast = useToast();

  const fields = [
    { label: "Name", name: "name" },
    { label: "House Name", name: "house_name" },
    { label: "Street Name 1", name: "street_name_1" },
    { label: "Street Name 2", name: "street_name_2" },
    { label: "City", name: "city", readOnly: true },
    { label: "State", name: "state", readOnly: true },
    { label: "Pincode", name: "pincode" },
    { label: "Phone Number", name: "phone_number" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!address.name) newErrors.name = "Name is required";
    if (!address.house_name) newErrors.house_name = "House name is required";
    if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Pincode must be a 6-digit number";
    }
    if (!/^\d{10}$/.test(address.phone_number)) {
      newErrors.phone_number = "Phone number must be a 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      onSubmit();
    } else {
      showToast("Please correct the form errors", "error");
    }
  };

  const handlePincodeChange = async (e) => {
    const { name, value } = e.target;

    onInputChange(e);

    if (name === "pincode" && value.length >= 6) {
      const details = await getDetailsByPincode(value, showToast);
      const lctn = details[0].display_name;

      if (details && details[0]) {
        const locationParts = lctn.split(",");
        const city = locationParts[0].trim();
        const state = locationParts[2].trim();

        onInputChange({ target: { name: "city", value: city } });
        onInputChange({ target: { name: "state", value: state } });

        setReadOnlyFields(["city", "state"]);
      }
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "Edit Address" : "Add New Address"}
        </Typography>
        <AddressForm
          fields={fields}
          values={address}
          onChange={(e) => {
            handlePincodeChange(e);
            setErrors((prevErrors) => ({
              ...prevErrors,
              [e.target.name]: "", 
            }));
          }}
          readOnlyFields={readOnlyFields}
          errors={errors} 
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isEditing ? "Update Address" : "Add Address"}
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddressDrawer;
