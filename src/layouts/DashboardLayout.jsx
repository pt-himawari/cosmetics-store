import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "../components/Admin/Dashboard/Sidebar";
import Header from "../components/Admin/Dashboard/Header";

const defaultTheme = createTheme();

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Container> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Container
          sx={{
            mt: 14,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
        </Container>
      </Box>
      {/* </Container> */}
    </ThemeProvider>
  );
}
