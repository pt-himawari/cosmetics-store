import React from "react";
import { AppBar, Container, Stack } from "@mui/material";
import Cart from "./Cart";
import Logo from "./Logo";
import NavBar from "./NavBar";
import User from "./User";

const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#fff",
          height: "60px",
        }}
      >
        <Container>
          <Stack
            alignItems="center"
            sx={{ height: "60px", paddingLeft: "10px" }}
            direction="row"
            justifyContent="space-between"
          >
            {/* logo */}
            <Logo />
            {/* navbar */}
            <NavBar />
            {/* userlogo , cartitem */}
            <Stack direction="row" spacing={2}>
              {/* cart */}
              <Cart />
              {/*  user avatar */}
              <User />
            </Stack>
          </Stack>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
