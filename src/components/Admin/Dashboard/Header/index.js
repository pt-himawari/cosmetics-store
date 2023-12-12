import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Toolbar, Typography, IconButton, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import User from "./User";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, toggleDrawer }) {
  return (
    <AppBar
      elevation={1}
      position="absolute"
      open={open}
      sx={{
        backgroundColor: "white",
      }}
    >
      <Toolbar
        sx={{
          pr: "-24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "40px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component="h1"
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, color: "#5f748d", fontWeight: "bold" }}
        >
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon sx={{ color: "#242424" }} />
          </Badge>
        </IconButton>
        <User />
      </Toolbar>
    </AppBar>
  );
}
