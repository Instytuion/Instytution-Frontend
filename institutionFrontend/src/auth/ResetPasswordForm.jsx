import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import {Visibility, VisibilityOff, Lock} from "@mui/icons-material";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import useToast from "../hooks/useToast";
import resetPassword from "../services/user/ResetPasswordService";


const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const showToast = useToast();
  const {uid} = useParams();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    watch,
  } = useForm();



  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setIsLoading(true)
      await resetPassword.confirmResetPassword(uid, data.password);
        navigate('/login')
        showToast('password Reset Succcusfully. Login with New Password','success')
    } catch (error) {
      setError("password", {
        type: "manual",
        message: error.response?.data?.error || "An error occurred while resetting password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={10}
        sx={{p: 5, width: "100%", maxWidth: 400, borderRadius: 3}}
      >
        <Typography
          component="h4"
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: 600,
          }}
        >
          Reset Password
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{display: "flex", flexDirection: "column", gap: 2}}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({field}) => (
              <TextField
                label="New Password"
                placeholder="Enter new password"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={
                  errors.password?.message ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: errors.password?.message,
                      }}
                    />
                  ) : null
                }
                autoFocus={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{fontSize: 20}} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{fontSize: 20}} />
                        ) : (
                          <VisibilityOff sx={{fontSize: 20}} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            render={({field}) => (
              <TextField
                label="Confirm Password"
                placeholder="Confirm new password"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{fontSize: 20}} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{fontSize: 20}} />
                        ) : (
                          <VisibilityOff sx={{fontSize: 20}} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#009688",
              color: "#fff",
              "&:hover": {backgroundColor: "#00796b"},
            }}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordForm;
