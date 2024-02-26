import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import useApi from "../hooks/useApi";
import login from "../lib/auth/login";
import signup from "../lib/auth/signup";
import { useContext } from "react";
import { UserContext } from "../context/userContext/userContext";
import setUserToken from "../lib/utils/setUserToken";
import { Link, Navigate, useNavigate } from "react-router-dom";
import getUserToken from "../lib/utils/getUserToken";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .min(6, "Username should be of minimum 6 characters length")
    .required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const AuthForm = ({ type }) => {
  const api = useApi();
  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: "arka91",
      password: "test1234",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      api.startLoading();
      api.setResponseMessage("");

      try {
        let response;
        if (type === "signin") {
          response = await login(values);
        } else {
          response = await signup(values);
        }

        setCurrentUser(response.data.user);
        setUserToken(response.token, response.chatToken, response.data.user);
        setToken(response.chatToken);
        navigate("/");
        api.setSuccess();
      } catch (error) {
        const { response } = error;

        api.setError();
        api.setResponseMessage();

        toast(response.data.message);
      } finally {
        api.stopLoading();
      }
    },
  });

  const token = getUserToken();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={api.isLoading}
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                variant="body2"
              >
                {type === "signin"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AuthForm;
