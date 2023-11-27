import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

const Logo = () => {
  return (
    <Link to="/">
      <Avatar alt="Comsmetics Monkey" src="/images/logo.png" />
    </Link>
  );
};

export default Logo;
