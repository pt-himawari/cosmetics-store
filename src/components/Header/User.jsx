import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
const color = {
  color: "#e54666",
};
const settings = [
  {
    label: "Profile",
    value: <AccountCircleOutlinedIcon sx={color} />,
    to: "/",
  },
  {
    label: "Settings",
    value: <SettingsSuggestOutlinedIcon sx={color} />,
    to: "/",
  },
  {
    label: "Dashboard",
    value: <DashboardOutlinedIcon sx={color} />,
    to: "/dashboard",
  },
  {
    label: "Logout",
    value: <LogoutOutlinedIcon sx={color} />,
    to: "/",
  },
];

const User = () => {
  const [anchorElUser, setAnchorElUser] = useState("");

  return (
    <Box sx={{}}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={(event) => setAnchorElUser(event.currentTarget)}
          sx={{ p: 0 }}
        >
          <Avatar alt="Remy Sharp" src="/images/user-1.png" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "47px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.label} component={Link} to={setting.to}>
            <ListItemIcon>{setting.value}</ListItemIcon>
            <ListItemText
              sx={{
                color: "#121f43",
              }}
            >
              {setting.label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default User;
