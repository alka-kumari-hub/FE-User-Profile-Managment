import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis";
import { useDispatch } from "react-redux";
import { setTokenToStore } from "../slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormData((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    const { email, password } = formData;
    const tempError = { name: "", email: "", password: "" };

    if (!email) {
      tempError.email = "This Field is Required";
    }
    if (!password) {
      tempError.password = "This Field is Required";
    }
    setError(tempError);

    if (!tempError.email && !tempError.password) {
      try {
        const response = await loginApi(formData);
        if (response?.data) {
          dispatch(setTokenToStore(response?.data.token));
          toast(response?.data.message);
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        }
      } catch (error) {
        toast(error?.response?.data?.data?.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ padding: "2vw" }}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              error={error.email}
              helperText={error.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={inputHandler}
              error={error.password}
              helperText={error.password}
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
