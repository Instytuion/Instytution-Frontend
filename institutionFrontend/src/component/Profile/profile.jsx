import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
  Stack,
  Button,
  Card,
} from "@mui/material";
import React, {useState} from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {useForm, Controller} from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../redux/slices/AuthSlice";
import useToast from "../../hooks/useToast";
import OTP from "../../component/Otp/OtpInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SignupServices from "../../services/user/SignupServices";
import OTPSkeleton from "../../component/Skeletons/OtpSkeleton";
import {
  getInputProps,
  getInputLabelProps,
} from "../CustomeElements/FormLabelInput";
import updateProfileService from "../../services/user/UserProfileServices";
import styles from "./styles";
import {getInitials} from "../../utils/utilityFunctions";
import BackButton from "../Button/BackButton";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [showOtpComponent, setShowotpComponent] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const showToast = useToast();
  const user = useSelector((state) => state.userAuth);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setError: setFormError,
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    },
  });

  const handleVerifyOtp = async () => {
    try {
      const updatedData = {...editedData, otp: otp};

      const response = await updateProfileService.updateProfileWithEmail(
        updatedData
      );
      console.log("user profile verify -update res:", response);
      setEmailEdited(false);
      setShowotpComponent(false);
      setOtp("");
      dispatch(
        updateProfile({
          ...user,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          email: response.user.email,
        })
      );
      showToast("Profile updated successfully", "success");
    } catch (error) {
      showToast(error.response.data.otp[0] || "An error occurred", "error");
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
        setShowotpComponent(true);
      } catch (error) {
        console.log("signup/otp sent  error", error);
        setFormError("email", {
          type: "manual",
          message: error.response?.data?.email || "An error occurred",
        });
        setError(error.response?.data?.message || "Failed to update email.");
      } finally {
        setIsLoading(false);
        setEditedData(updatedData);
      }
      return;
    }

    if (Object.keys(updatedData).length === 0) {
      showToast("No changes made", "info");
      return;
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        // Create FormData object and append updatedData fields
        const formData = new FormData();
        Object.keys(updatedData).forEach((key) => {
          formData.append(key, updatedData[key]);
        });

        const response = await updateProfileService.updateProfileWithoutEmail(
          formData
        );

        // Dispatch action and show success message
        dispatch(
          updateProfile({
            ...user,
            firstName: response.first_name,
            lastName: response.last_name,
            email: response.email,
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
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
    setIsEditing(!isEditing);
  };

  // Handle profile image change
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        const response = await updateProfileService.updateProfileWithoutEmail(
          formData
        );
        if (response && response.profile_picture) {
          dispatch(
            updateProfile({
              ...user,
              profileImage: response.profile_picture,
            })
          );
          showToast("Profile picture updated successfully.", "success");
        } else {
          throw new Error("No profile picture URL returned from server.");
        }
      } catch (error) {
        console.error("Profile image update failed:", error);
        setError("Failed to update profile image.");
      }
    }
  };

  const profileImage = user.profileImage ? (
    <Box
      component="img"
      src={user.profileImage}
      alt="Profile"
      sx={styles.profileImg}
    />
  ) : (
    <Box sx={styles.profileImgAlt}>{getInitials(user.email)}</Box>
  );

  return (
    <Container disableGutters sx={styles.container}>
      <BackButton />
      {!showOtpComponent ? (
        <Stack
          direction={{xs: "column", md: "row"}} // Responsive direction
          spacing={2} // Space between the cards
        >
          {/* User Information Card */}
          <Card sx={styles.card}>
            <Box sx={styles.parentOne}>
              <Box sx={styles.profileImageContainer}>{profileImage}</Box>

              {/* Add Photo Icon */}
              <IconButton component="label" sx={styles.addPhotoIcon}>
                <AddAPhotoIcon fontSize="small" sx={{color: "white"}} />
                <input
                  type="file"
                  hidden
                  accept="image/jpeg, image/png, image/gif"
                  onChange={handleImageChange}
                />
                {/* <input type="file" hidden onChange={handleImageChange} /> */}
              </IconButton>
            </Box>

            {/* Input Fields Section */}
            <Box sx={styles.parentTwo}>
              <Stack spacing={2} sx={{paddingTop: 5}}>
                <Box sx={styles.titleContainer}>
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
                      label={!isEditing ? "First Name:" : "FirstName"}
                      variant="outlined"
                      {...field}
                      InputLabelProps={getInputLabelProps(isEditing)}
                      InputProps={getInputProps(isEditing)}
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
                      label={!isEditing ? "Last Name:" : "LastName"}
                      variant="outlined"
                      {...field}
                      InputLabelProps={getInputLabelProps(isEditing)}
                      InputProps={getInputProps(isEditing)}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />

                {/* Email */}
                <Stack direction={"row"}>
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
                        label={!emailEdited ? "Email:" : "Email"}
                        variant="outlined"
                        // Here we apply truncation to the value only if not editing
                        value={
                          !emailEdited
                            ? field.value.length > 24
                              ? `${field.value.slice(0, 24)}...`
                              : field.value
                            : field.value
                        }
                        onChange={(e) => {
                          // Update field value as user types
                          field.onChange(e); // This will update the form state
                        }}
                        InputLabelProps={getInputLabelProps(emailEdited)}
                        InputProps={getInputProps(emailEdited)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />

                  <IconButton
                    onClick={() => {
                      setEmailEdited((prev) => !prev);
                      reset({email: user.email || ""});
                    }}
                    color="primary"
                  >
                    {!emailEdited ? <EditIcon /> : <CloseIcon />}
                  </IconButton>
                </Stack>

                {(isEditing || emailEdited) && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#00796b",
                      "&:hover": {
                        bgcolor: "#009688",
                      },
                    }}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Save"}
                  </Button>
                )}
              </Stack>
            </Box>
          </Card>

          {/* User Address Card */}
          <Card sx={styles.card}>
            <Box sx={styles.parentTwo}>
              <Stack spacing={2} sx={{paddingTop: 5}}>
                <Box sx={styles.titleContainer}></Box>

                {/* Placeholder for Address Information */}
                <Typography variant="body1" sx={{color: "gray"}}>
                  Address information will be displayed here.
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Stack>
      ) : (
        <Box sx={styles.otpContainer}>
          <IconButton
            sx={{position: "absolute", left: 10, top: 10}}
            onClick={() => {
              setShowotpComponent(false);
              setOtp(false);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{textAlign: "center"}} fontSize={20}>
            Enter Your OTP
          </Typography>
          <Typography sx={{textAlign: "center", color: "text.secondary"}}>
            OTP has been sent to your {editedData.email}
          </Typography>
          <OTP
            data={editedData}
            separator={<span></span>}
            value={otp}
            onChange={setOtp}
            length={6}
            onverify={handleVerifyOtp}
          />
        </Box>
      )}
    </Container>
  );
};

export default Profile;
