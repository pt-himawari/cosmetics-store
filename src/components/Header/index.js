import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Container, Stack, Box, IconButton } from "@mui/material";
import { Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./CartIcon";
import Logo from "./Logo";
import NavBar from "./NavBar";
import User from "./User";
const pages = [
  { label: "Home", value: "/" },
  { label: "About", value: "/" },
  { label: "Shop", value: "/" },
  { label: "Products", value: "/" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        height: "60px",
        zIndex: 3000,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          {/* logo */}
          <Logo sx={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#121f43",
              textDecoration: "none",
            }}
          >
            Hanabi
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              backgroundColor: "#fff",
              zIndex: 200,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={
                anchorElNav !== null ? handleCloseNavMenu : handleOpenNavMenu
              }
              color="error"
            >
              {anchorElNav !== null ? <ClearIcon /> : <MenuIcon />}
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                top: "45px",
                left: "8px",
                display: { xs: "block", md: "none" },
              }}
              slotProps={{
                paper: {
                  style: {
                    width: "40%",
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.value}
                >
                  <Typography
                    textAlign="center"
                    variant="h5"
                    sx={{
                      color: "#121f43",
                      "&:hover": {
                        color: "#E64D4C",
                      },
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Logo sx={{ display: { xs: "flex", md: "none" } }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              ml: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#121f43",
              textDecoration: "none",
            }}
          >
            Hanabi
          </Typography>

          {/* nav */}
          <NavBar />
          <Stack direction="row" spacing={2} sx={{ flexGrow: 0 }}>
            {/* cart icon */}
            <Cart />
            {/* user */}
            <User />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
