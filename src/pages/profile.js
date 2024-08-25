import MenuIcon from "@mui/icons-material/Menu";
import { Card, Grid, Stack, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
const Profile = () => {
  const [isEdit, setIsEdit] = useState(true);
  return (
    <div>
      {" "}
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
              }}
            >
              Your Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  id="mobile"
                  disabled={isEdit}
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
                  setIsEdit(false);
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
