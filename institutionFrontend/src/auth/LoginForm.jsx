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
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import GoogleSignIn from "./GoogleSignIn";
import LoginServices from "../services/user/LoginServices";
import useToast from "../hooks/useToast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/AuthSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const showToast = useToast();
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setData(data);
    try {
        setIsLoading(true);
        const response = await LoginServices(data)
        console.log('response at login success', response);
        
        const { access, refresh, user } = response;
        
        
        dispatch(
          setUser({
            email: user.email, 
            firstName: user.first_name || '', 
            lastName: user.last_name || '',
            accessToken: access,
            refreshToken: refresh,
            profileImage: user.profile_picture || '',
            role: user.role,
            registerMode: user.register_mode,
          })
        );

        showToast(response.message, "success");
        navigate("/");
        
    } catch (error) {
      console.log('Response error upon Login :',error);
      console.log('error.response.data.error is - ',error.response.data.error);
      
        setError("password", {
            type: "manual",
            message: error.response.data.error || "An error occurred in Login attempt (Default Msg)",
          });
    }
      finally {
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
          Login
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
                fullWidth
                autoFocus
                variant="outlined"
                error={!!errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                {...field} 
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
                placeholder="Enter Password"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
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
              "&:hover": { backgroundColor: "#00796b" },
            }}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.400" }} />
            <Typography sx={{ mx: 1 }}>or</Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.400" }} />
          </Box>

          <GoogleSignIn />
          <Typography sx={{ textAlign: "center" }}>
            {"Don't have an account?"}{" "}
            <Button
              component={Link}
              to="/signup"
              variant="text"
              sx={{ textDecoration: "underline" }}
            >
              Signup
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
