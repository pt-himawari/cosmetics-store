import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box } from "@mui/material";

const Logo = ({ sx }) => {
  // console.log(props);
  return (
    <Box sx={sx}>
      <Link to="/">
        <Avatar alt="Comsmetics Monkey" src="/images/logo.png" />
      </Link>
    </Box>
  );
};

export default Logo;
