import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Drawer,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { Phone, Home, Edit, Delete as DeleteIcon } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Address from "../../services/user/Address";
import useToast from "../../hooks/useToast";
import AddressDrawer from "../Drawer/AddressDrawer";
import CartLoader from "../../component/Spinner/CartLoader";

const OrderAddress = ({ onCheckout, selectedAddressId, setSelectedAddressId }) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  const { data, error, isLoading } = useQuery(["getAddress"], Address.getAddress);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalAddress, setOriginalAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    house_name: "",
    street_name_1: "",
    street_name_2: "",
    city: "",
    state: "",
    pincode: "",
    phone_number: "",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedAddressId(data[0].id);
    }
  }, [data]);

  const addAddressMutation = useMutation((newAddress) => Address.createAddress(newAddress), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAddress"]);
      setIsDrawerOpen(false);
      resetNewAddress();
      showToast("Address added successfully!", "success");
    },
    onError: () => showToast("Failed to add address", "error"),
  });

  const updateAddressMutation = useMutation(
    ({ id, updatedFields }) => Address.updateAddress(id, updatedFields),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAddress"]);
        showToast("Address updated successfully!", "success");
        setIsDrawerOpen(false);
        resetNewAddress();
      },
    }
  );

  const handleAddAddress = () => addAddressMutation.mutate(newAddress);
  const resetNewAddress = () => {
    setNewAddress({
      name: "",
      house_name: "",
      street_name_1: "",
      street_name_2: "",
      city: "",
      state: "",
      pincode: "",
      phone_number: "",
    });
    setIsEditing(false);
    setOriginalAddress(null);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await Address.deleteAddress(addressId);
      queryClient.invalidateQueries(["getAddress"]);
      showToast("Address deleted successfully", "success");
    }
  };

  const handleUpdateAddress = async () => {
    const updatedFields = { ...newAddress };
    await updateAddressMutation.mutateAsync({ id: originalAddress.id, updatedFields });
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setOriginalAddress(address);
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  if (isLoading) return <CartLoader />;
  if (error) return <Snackbar open={true} message="Error loading address data" />;

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        // "&:hover": {
        //   boxShadow: "0px 6px 30px rgba(0,0,0,0.3)",
        // },
      }}
    >
      <CardContent>
        {/* <Typography variant="h5" gutterBottom sx={{ color: "#008080", fontWeight: "bold", mb: 2 }}>
          Select Address
        </Typography> */}
        <Typography variant="h5" gutterBottom sx={{ color: "#008080", fontWeight: "bold", mb: 2 }}>
          {data && data.length > 0 ? "Select Address" : "No Address Found. Create New Address"}
        </Typography>

        <RadioGroup
          value={selectedAddressId}
          onChange={(e) => setSelectedAddressId(Number(e.target.value))}
        >
          {data.map((address) => (
            <Box
              key={address.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                padding: 2,
                borderRadius: 3,
                background: "#fafafa",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                mb: 2,
                "&:hover": { background: "#f1f3f4" },
              }}
            >
              <FormControlLabel
                value={address.id}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="h6" color="primary" fontWeight="600">
                      <Home sx={{ verticalAlign: "middle", mr: 1, color: "#008080" }} />
                      {address.name}
                    </Typography>
                    <Typography>{`${address.house_name}, ${address.street_name_1}`}</Typography>
                    {address.street_name_2 && <Typography>{address.street_name_2}</Typography>}
                    <Typography>{`${address.city}, ${address.state} - ${address.pincode}`}</Typography>
                    <Typography>
                      <Phone sx={{ verticalAlign: "middle", mr: 1, color: "#008080" }} />
                      {address.phone_number}
                    </Typography>
                  </Box>
                }
              />
              <Box>
                <Tooltip title="Edit Address">
                  <IconButton onClick={() => handleEditAddress(address)} color="primary">
                    <Edit sx={{ color: "#008080" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Address">
                  <IconButton onClick={() => handleDeleteAddress(address.id)} color="error">
                    <DeleteIcon sx={{ color: "#FF6F61" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </RadioGroup>

        {data.length < 3 && (
          <Button
            variant="contained"
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              mt: 2,
              borderRadius: 3,
              fontWeight: "bold",
              padding: "12px 24px",
              background:'linear-gradient(135deg, #008080, #005959)',
              transition: "background-color 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #005959, #008080)",
                
                
              },
            }}
          >
            Add New Address
          </Button>
        )}
      </CardContent>

      <AddressDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={isEditing ? handleUpdateAddress : handleAddAddress}
        address={newAddress}
        onInputChange={(e) => {
          const { name, value } = e.target;
          setNewAddress((prevState) => ({ ...prevState, [name]: value }));
        }}
        isLoading={isEditing ? updateAddressMutation.isLoading : addAddressMutation.isLoading}
        isEditing={isEditing}
      />
    </Card>
  );
};

export default OrderAddress;
