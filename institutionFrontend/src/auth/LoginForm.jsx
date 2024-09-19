import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import GoogleSignIn from "./GoogleSignIn";
import LoginServices from "../services/user/LoginServices";
import useToast from "../hooks/useToast";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/slices/AuthSlice";
import resetPassword from "../services/user/ResetPasswordService";
import Spinner from "../component/Spinner/Spinner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();
  const showToast = useToast();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setFocus,
    getValues,
    trigger,
  } = useForm();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgetPassword = async () => {
    const isEmailValid = await trigger("email");
    if (!isEmailValid) {
      return;
    }
    const email = getValues("email");
    console.log("Email for password reset:", email);
    try {
      setIsLoading(true);
      const response = await resetPassword.requestResetPassword(email);
      showToast(response.message, "success");
      setModalMessage(response.message);
      setModalType("success");
      setModalOpen(true);
    } catch (error) {
      console.log(error.response)
      const errorMessage =
        error.response?.data?.error || "Something went wrong.";
      showToast(errorMessage, "error");
      setModalMessage(errorMessage);
      setModalType("error");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setData(data);
    try {
      setIsLoading(true);
      const response = await LoginServices(data);
      console.log("response at login success", response);

      const {access, refresh, user} = response;

      dispatch(
        setUser({
          isActive: user.is_active,
          email: user.email,
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          accessToken: access,
          refreshToken: refresh,
          profileImage: user.profile_picture || "",
          role: user.role,
          registerMode: user.register_mode,
        })
      );

      showToast(response.message, "success");
      navigate("/");
    } catch (error) {
      console.log("Response error upon Login :", error);
      console.log("error.response.data.error is - ", error.response.data.error);

      setError("password", {
        type: "manual",
        message:
          error.response.data.error ||
          "An error occurred in Login attempt (Default Msg)",
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
          sx={{display: "flex", flexDirection: "column", gap: 2}}
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
            render={({field}) => (
              <TextField
                label="Email"
                placeholder="Enter email"
                fullWidth
                autoFocus
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
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
            render={({field}) => (
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
          <Stack direction="row" justifyContent="flex-end">
            <Button
              sx={{
                fontSize: 12,
                textTransform: "none",
                textDecoration: "underline",
              }}
              onClick={handleForgetPassword}
            >
              {!isLoading?
              'Forget Password?': <Spinner/>}
            </Button>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#009688",
              color: "#fff",
              "&:hover": {backgroundColor: "#00796b"},
            }}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          <Box sx={{display: "flex", alignItems: "center", my: 1}}>
            <Box sx={{flex: 1, height: "1px", bgcolor: "grey.400"}} />
            <Typography sx={{mx: 1}}>or</Typography>
            <Box sx={{flex: 1, height: "1px", bgcolor: "grey.400"}} />
          </Box>

          <GoogleSignIn />
          <Typography sx={{textAlign: "center"}}>
            {"Don't have an account?"}{" "}
            <Button
              component={Link}
              to="/signup"
              variant="text"
              sx={{textDecoration: "underline"}}
            >
              Signup
            </Button>
          </Typography>
        </Box>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          fullWidth={true}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {modalType === "success" ? (
              <>
                <CheckCircle color="success" sx={{mr: 1}} />
                Success
              </>
            ) : (
              <>
                <Cancel color="error" sx={{mr: 1}} />
                Error
              </>
            )}
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography>{modalMessage}</Typography>
            {modalType === "success" && (
              <Typography sx={{mt: 2}}>
                Please check your email for the password reset link.
              </Typography>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default LoginForm;
