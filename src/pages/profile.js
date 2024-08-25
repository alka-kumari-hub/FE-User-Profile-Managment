import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, Grid, Stack, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserApi, updateProfileApi } from "../apis";
import { clearLoaclStorage } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetAuthStore } from "../slice";
const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(true);
  const [formData, setFormData] = React.useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
  });
  const [error, setError] = React.useState({
    name: "",
    email: "",
    mobile: "",
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

  const getUser = async () => {
    try {
      const response = await getUserApi(token);
      const { id, email, name, mobile } = response?.data;
      setFormData(() => {
        return {
          id: id,
          name: name,
          email: email,
          mobile: mobile,
        };
      });
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (isEdit) {
      return setIsEdit(false);
    }
    const { name, email, mobile } = formData;
    const tempError = { name: "", email: "", mobile: "" };
    const mobileRejex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!name) {
      tempError.name = "This Field is Required";
    }
    if (!email) {
      tempError.email = "This Field is Required";
    }
    if (mobile && !mobileRejex.test(mobile)) {
      tempError.mobile = "Please Enter Valid mobile";
    }
    if (!mobile) {
      tempError.mobile = "This Field is Required";
    }
    setError(tempError);

    if (!tempError.name && !tempError.email && !tempError.mobile) {
      try {
        const res = await updateProfileApi(formData, token);
        if (res) {
          setIsEdit(true);
          toast("Data Updated Successfully");
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    getUser();
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "1vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">News</Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "lightgray",
                color: "black",
                fontWeight: "bold",
                px: "1vw",
              }}
              color="inherit"
              endIcon={<LogoutIcon />}
              onClick={() => {
                clearLoaclStorage();
                dispatch(resetAuthStore());

                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 575, marginTop: "2vw" }}>
          <Card sx={{ padding: "2vw" }}>
            {" "}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "2vw",
                marginBottom: "0.5vw",
                textAlign: "center",
              }}
            >
              Your Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  disabled={isEdit}
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
                  label="Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={isEdit}
                  onChange={inputHandler}
                  error={error.email}
                  helperText={error.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  disabled={isEdit}
                  onChange={inputHandler}
                  error={error.mobile}
                  helperText={error.mobile}
                />
              </Grid>
            </Grid>
            <Stack
              spacing={1}
              direction={"row"}
              justifyContent={"end"}
              sx={{ marginTop: "1vw" }}
            >
              {!isEdit && (
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {isEdit ? "Edit" : "Save"}
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
