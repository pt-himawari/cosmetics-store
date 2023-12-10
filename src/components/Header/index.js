// import React from "react";
// import { AppBar, Container, Stack } from "@mui/material";
// import Cart from "./CartIcon";
// import Logo from "./Logo";
// import NavBar from "./NavBar";
// import User from "./User";

// const Header = () => {
//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           bgcolor: "#fff",
//           height: "60px",
//         }}
//       >
//         <Container>
//           <Stack
//             alignItems="center"
//             sx={{ height: "60px", paddingLeft: "10px" }}
//             direction="row"
//             justifyContent="space-between"
//           >
//             {/* logo */}
//             <Logo />
//             {/* navbar */}
//             <NavBar />
//             {/* userlogo , cartitem */}
//             <Stack direction="row" spacing={2}>
//               {/* cart */}
//               <Cart />
//               {/*  user avatar */}
//               <User />
//             </Stack>
//           </Stack>
//         </Container>
//       </AppBar>
//     </>
//   );
// };
// export default Header;

import * as React from "react";
import { AppBar, Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Cart from "./CartIcon";
import Logo from "./Logo";
import NavBar from "./NavBar";
import User from "./User";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const pages = [
  { label: "Home", value: "/" },
  { label: "About", value: "/" },
  { label: "Shop", value: "/" },
  { label: "Products", value: "/" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
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
              onClick={handleOpenNavMenu}
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
              // open={true}
              onClose={handleCloseNavMenu}
              sx={{
                top: "45px",
                left: "8px",
                display: { xs: "block", md: "none" },
                // width: "60%", // Set width to 60%
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

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
