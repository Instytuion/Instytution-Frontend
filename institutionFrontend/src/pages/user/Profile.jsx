import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import React, {useState} from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {useForm, Controller} from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import {useSelector} from "react-redux";
import axios from "axios"; // Assuming axios is used for API calls
import instance from "../../utils/axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false); // Track if the email is edited
  const user = useSelector((state) => state.userAuth);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    watch, 
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    },
  });

  // Watch for changes in the form
  const watchedValues = watch(); // To track the changed fields

  const getInitials = (email) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase(); // Return the first letter of the email
  };

  // Handle form submission
  const onSubmit = (data) => {
    const updatedData = {};
    if (data.firstName !== user.firstName)
      updatedData.firstName = data.firstName;
    if (data.lastName !== user.lastName) updatedData.lastName = data.lastName;
    if (data.email !== user.email) {
      updatedData.email = data.email;
      setEmailEdited(true); // Mark email as edited
    }

    if (Object.keys(updatedData).length > 0) {
      axios
        .patch("/api/profile", updatedData) // API endpoint for profile update
        .then((response) => {
          console.log("Profile updated:", response.data);
          setIsEditing(false); // Disable edit mode
        })
        .catch((error) => {
          console.error("Profile update failed:", error);
        });
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle profile image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      instance
        .patch("/accounts/user-profile/", formData, {
          headers: {"Content-Type": "multipart/form-data"},
        })
        .then((response) => {
          console.log("Profile image updated:", response.data);
        })
        .catch((error) => {
          console.error("Profile image update failed:", error);
        });
    }
  };

  const profileImage = user.profileImage ? (
    <Box
      component="img"
      src={user.profileImage}
      alt="Profile"
      sx={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <Box
      sx={{
        width: "auto",
        height: 120,
        borderRadius: "50%",
        bgcolor: "gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 36,
      }}
    >
      {getInitials(user.email)}
    </Box>
  );

  return (
    <>
      <Container
        disableGutters
        sx={{
          boxShadow: 3,
          minHeigh: "80vh",
          mt: 3,
          borderRadius: 3,
          maxWidth: {xs: "90%", sm: "600px"},
        }}
      >
        {/* Profile Picture Section */}
        <Box
          position="relative"
          sx={{
            height: "27.33vh",
            borderRadius: "10px 10px 0px 0px",
            background: "linear-gradient(135deg, #009688, #004d40)",
          }}
        >
          {/* Circular Profile Image */}
          <Box
            sx={{
              width: 121,
              height: 121,
              borderRadius: "50%",
              border: "2px solid white",
              position: "absolute",
              bottom: -60,
              left: {xs: "50%"},
              transform: {xs: "translateX(-50%)"},
            }}
          >
            {profileImage}
          </Box>

          {/* Add Photo Icon */}
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: -65,
              left: {xs: "55%"},
              transform: {xs: "translateX(-60%)"},
              bgcolor: "white",
              p: 1,
              border: "2px solid #009688",
              ":hover": {backgroundColor: "#009688", color: "white"},
            }}
          >
            <AddAPhotoIcon />
            <input type="file" hidden onChange={handleImageChange} />
          </IconButton>
        </Box>

        {/* Input Fields Section */}
        <Box
          sx={{
            p: 3,
            mt: 7,
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              paddingTop: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
              <IconButton
                onClick={handleEditClick}
                variant="contained"
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </Box>

            <Controller
              name="firstName"
              control={control}
              rules={{required: "First name is required"}}
              render={({field}) => (
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 8px", // Adjust padding as needed
                    },
                  }}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  {...field}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{required: "Last name is required"}}
              render={({field}) => (
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 8px", // Adjust padding as needed
                    },
                  }}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  {...field}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({field}) => (
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "10px 8px", // Adjust padding as needed
                    },
                  }}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...field}
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            {isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
