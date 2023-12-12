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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const settings = [
  {
    label: "Profile",
    value: <AccountCircleOutlinedIcon color="secondary" />,
    to: "/dashboard",
  },
  {
    label: "Settings",
    value: <SettingsSuggestOutlinedIcon color="secondary" />,
    to: "/dashboard",
  },
  {
    label: "Logout",
    value: <LogoutOutlinedIcon color="secondary" />,
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
          <Avatar alt="Remy Sharp" src="/images/Image-60.png" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
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
            <ListItemText>{setting.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default User;
