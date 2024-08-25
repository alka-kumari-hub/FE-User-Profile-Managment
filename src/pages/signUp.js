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
import { registerApi } from "../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({
    name: "",
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
    const { name, email, password } = formData;
    const tempError = { name: "", email: "", password: "" };
    const emailRejex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name) {
      tempError.name = "This Field is Required";
    }
    if (!email) {
      tempError.email = "This Field is Required";
    }
    if (email && !emailRejex.test(email)) {
      tempError.email = "Please Enter Valid Email";
    }
    if (!password) {
      tempError.password = "This Field is Required";
    }
    setError(tempError);

    if (!tempError.name && !tempError.email && !tempError.password) {
      try {
        const response = await registerApi(formData);
        if (response.data) {
          toast(response?.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        alert(error);
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
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  value={formData.name}
                  onChange={inputHandler}
                  error={error.name}
                  helperText={error.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={inputHandler}
                  error={error.password}
                  helperText={error.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
