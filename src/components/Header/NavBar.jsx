import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";
const pages = [
  { label: "Home", value: "/" },
  { label: "About", value: "/" },
  { label: "Shop", value: "/" },
  { label: "Products", value: "/" },
];

const NavBar = () => {
  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="center"
      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
    >
      {pages.map((page) => (
        <Button
          key={page.value}
          sx={{
            color: "black",
            display: "block",
            fontWeight: "normal",
            fontSize: "16px",
          }}
          component={Link}
          to={page.value}
        >
          {page.label}
        </Button>
      ))}
    </Stack>
  );
};

export default NavBar;
