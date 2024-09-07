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
  import {
    Visibility,
    VisibilityOff,
    Person,
    Lock,
  } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import axios from "axios";
import GoogleSignIn from "./GoogleSignIn";
  
  const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
      control,
      handleSubmit,
      formState: { errors },
      setError,
      watch,
    } = useForm();
  
    const handleClickShowPassword = () => setShowPassword(!showPassword);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const onSubmit = async (data) => {
      try {
        // Send the signup request to the backend
        await axios.post('/api/signup', data);
  
        // Handle successful signup (e.g., redirect to login page)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Check if the error is related to username already exists
          setError('username', {
            type: 'manual',
            message: error.response.data.error || 'An error occurred',
          });
        } else {
          // Handle other errors
          console.error('An unexpected error occurred:', error);
        }
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
        <Paper elevation={10} sx={{ p: 5, width: "100%", maxWidth: 400,borderRadius:3 }}>
          <Typography
            component="h4"
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 600,
            }}
          >
            Signup
          </Typography>
  
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Email"
                  placeholder="Enter email"
                  autoFocus
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Password"
                  placeholder="Create Password"
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  sx={{ mb: 2 }}
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ fontSize: 20 }} />
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
                            <Visibility sx={{ fontSize: 20 }} />
                          ) : (
                            <VisibilityOff sx={{ fontSize: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  sx={{ mb: 2 }}
                  {...field}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ fontSize: 20 }} />
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
                            <Visibility sx={{ fontSize: 20 }} />
                          ) : (
                            <VisibilityOff sx={{ fontSize: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#009688",
                color: "#fff",
                "&:hover": { backgroundColor: "#00796b" },
              }}
            >
              Sign Up
            </Button>
            <Box sx={{ display: "flex", alignItems: "center" ,mt:1}}>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.400" }} />
              <Typography sx={{ mx: 1 }}>or</Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.400" }} />
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',mt:1}}>
                 <GoogleSignIn />
            </Box>
           
            <Typography sx={{textAlign:'center'}}>
                Already have an account?{" "}
                <Button component={Link} to="/login" variant="text" sx={{textDecoration:'underline'}}   >
                    Login
                </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default SignupForm;
  