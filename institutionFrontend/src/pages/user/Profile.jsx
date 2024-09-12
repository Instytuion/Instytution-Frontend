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
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import instance from "../../utils/axios";
import {updateProfile} from "../../redux/slices/AuthSlice";
import useToast from "../../hooks/useToast";
import OTP from "../../component/Otp/OtpInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SignupServices from "../../services/user/SignupServices";
import OTPSkeleton from "../../component/Skeletons/OtpSkeleton";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [data, setData] = useState([]);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Store backend errors
  const dispatch = useDispatch();
  const showToast = useToast();

  const user = useSelector((state) => state.userAuth);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    setError: setFormError, // To handle form validation errors
    watch,
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    },
  });

  const getInitials = (email) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase();
  };

  const handleVerifyOtp = async () => {
    try {
      const updatedData = {...data, otp: otp};

      const response = await instance.patch(
        "accounts/user-profile/verify-update/",
        updatedData
      );
      console.log("user profile verify -update res:", response);
      setIsEditing(false);
      setEmailEdited(false);
      dispatch(
        updateProfile({
          ...user,
          firstName: response.data.user.first_name,
          lastName: response.data.user.last_name,
          email: response.data.user.email,
        })
      );
      showToast("Profile updated successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    const updatedData = {};

    if (formData.firstName !== user.firstName)
      updatedData.first_name = formData.firstName;
    if (formData.lastName !== user.lastName)
      updatedData.last_name = formData.lastName;
    if (formData.email !== user.email) {
      updatedData.email = formData.email;
      setIsLoading(true);
      try {
        await SignupServices.signup({email: formData.email});
        setEmailEdited(true);
      } catch (error) {
        console.log("signup/otp sent  error", error);
        setFormError("email", {
          type: "manual",
          message: error.response?.data?.email || "An error occurred",
        });
        setError(error.response?.data?.message || "Failed to update email.");
      } finally {
        setIsLoading(false);
        setData(updatedData);
      }
      return;
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        const response = await instance.patch(
          "/accounts/user-profile/",
          updatedData
        );
        dispatch(
          updateProfile({
            ...user,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
          })
        );
        showToast("Profile updated successfully", "success");
        setIsEditing(false);
      } catch (error) {
        console.error("Profile update failed:", error);
        setError(error.response?.data?.message || "Failed to update profile.");
      }
    }
  };
  console.log(isLoading);
  // Toggle edit mode
  const handleEditClick = () => {
    if (isEditing) {
      reset(data);
    }
    setIsEditing(!isEditing);
  };

  // Handle profile image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      instance
        .patch("/accounts/user-profile/", formData, {
          headers: {"Content-Type": "multipart/form-data"},
        })
        .then((response) => {
          dispatch(
            updateProfile({
              ...user,
              profileImage: response.data.profile_picture,
            })
          );
          showToast("Profile picture updated successfully.", "success");
        })
        .catch((error) => {
          console.error("Profile image update failed:", error);
          setError("Failed to update profile image.");
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
          minHeight: "80vh",
          mt: 3,
          borderRadius: 3,
          maxWidth: {xs: "90%", sm: "600px"},
        }}
      >
        {!emailEdited ? (
          !isLoading ? (
            <>
              {/* Profile Picture Section */}
              <Box
                position="relative"
                sx={{
                  height: "27.33vh",
                  borderRadius: "10px 10px 0px 0px",
                  background: "linear-gradient(135deg, #009688, #004d40)",
                }}
              >
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
                    bgcolor: "grey",
                    opacity: "59%",
                    p: 1,
                    ":hover": {backgroundColor: "#009688", color: "white"},
                  }}
                >
                  <AddAPhotoIcon fontSize="small" sx={{color: "white"}} />
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
                <Stack spacing={2} sx={{paddingTop: 5}}>
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
                    <IconButton onClick={handleEditClick} color="primary">
                      {!isEditing ? <EditIcon /> : <CloseIcon />}
                    </IconButton>
                  </Box>

                  {/* First Name */}

                  <Controller
                    name="firstName"
                    control={control}
                    rules={{required: "First name is required"}}
                    render={({field}) => (
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        {...field}
                        InputLabelProps={{
                          sx: {
                            "&.Mui-focused, &.MuiInputLabel-shrink": {
                              fontSize: "0.8rem", // When the label is focused or shrunk
                              transform: "translate(0.9rem, -0.6rem)", // Adjust the position when shrunk
                            },
                            transform: "translate(0.9rem, 0.6rem)", // Vertically center the label
                            fontSize: "0.9rem",
                          },
                        }}
                        InputProps={{
                          readOnly: !isEditing,
                          sx: {
                            pointerEvents: !isEditing ? "none" : "auto",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: !isEditing
                                ? "transparent"
                                : "initial",
                            },
                            "& .MuiInputBase-input": {
                              padding: "10px 10px",
                              fontSize: 13,
                            },
                          },
                        }}
                        autoFocus={isEditing}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )}
                  />

                  {/* Last Name */}

                  <Controller
                    name="lastName"
                    control={control}
                    rules={{required: "Last name is required"}}
                    render={({field}) => (
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        {...field}
                        InputLabelProps={{
                          sx: {
                            "&.Mui-focused, &.MuiInputLabel-shrink": {
                              fontSize: "0.8rem", // When the label is focused or shrunk
                              transform: "translate(0.9rem, -0.6rem)", // Adjust the position when shrunk
                            },
                            transform: "translate(0.9rem, 0.6rem)", // Vertically center the label
                            fontSize: "0.9rem",
                          },
                        }}
                        InputProps={{
                          readOnly: !isEditing,
                          sx: {
                            pointerEvents: !isEditing ? "none" : "auto",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: !isEditing
                                ? "transparent"
                                : "initial",
                            },
                            "& .MuiInputBase-input": {
                              padding: "10px 10px",
                              fontSize: 13,
                            },
                          },
                        }}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    )}
                  />

                  {/*  Email */}

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
                        fullWidth
                        label="Email"
                        variant="outlined"
                        {...field}
                        InputLabelProps={{
                          sx: {
                            "&.Mui-focused, &.MuiInputLabel-shrink": {
                              fontSize: "0.8rem", // When the label is focused or shrunk
                              transform: "translate(0.9rem, -0.6rem)", // Adjust the position when shrunk
                            },
                            transform: "translate(0.9rem, 0.6rem)", // Vertically center the label
                            fontSize: "0.9rem",
                          },
                        }}
                        InputProps={{
                          readOnly: !isEditing,
                          sx: {
                            pointerEvents: !isEditing ? "none" : "auto",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: !isEditing
                                ? "transparent"
                                : "initial",
                            },
                            "& .MuiInputBase-input": {
                              padding: "10px 10px",
                              fontSize: 13,
                            },
                          },
                        }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />

                  {isEditing && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Save
                    </Button>
                  )}
                </Stack>
              </Box>
            </>
          ) : (
            <Box sx={{paddingTop: 3}}>
              <Typography sx={{textAlign: "center", mb: 2, mt: 2}}>
                Loading...
              </Typography>
              <OTPSkeleton />
            </Box>
          )
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: "relative",
                paddingTop: 2,
              }}
            >
              <IconButton
                sx={{position: "absolute", left: 10, top: 10}}
                onClick={() => setEmailEdited(false)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography sx={{textAlign: "center"}} fontSize={20}>
                Enter Your OTP
              </Typography>
              <Typography sx={{textAlign: "center", color: "text.secondary"}}>
                OTP has been sent to your {data.email}
              </Typography>
              <OTP
                data={data.email}
                separator={<span></span>}
                value={otp}
                onChange={setOtp}
                length={6}
                onverify={handleVerifyOtp}
              />
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;
