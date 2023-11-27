import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";
const pages = [
  { label: "Home", value: "/home" },
  { label: "About", value: "/about" },
  { label: "Shop", value: "/shop" },
  { label: "Products", value: "/products" },
];

const NavBar = () => {
  return (
    <Stack direction="row" spacing={3}>
      {pages.map((page) => (
        <Button
          key={page.value}
          sx={{
            color: "black",
            display: "block",
            fontWeight: "normal",
            fontSize: "16px",

            // "&:hover": {
            //   borderColor: "black",
            //   color: "red",
            //   fontWeight: "bold",
            // },
            // backgroundColor:
            // activePage === page.value ? "red" : "transparent",
          }}
          component={Link}
          to={page.value}
          // onClick={() => handleClick(page.value)}
        >
          {page.label}
        </Button>
      ))}
    </Stack>
  );
};

export default NavBar;
