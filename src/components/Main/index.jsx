import React from "react";
import { Container, Grid } from "@mui/material";
import Products from "./Products";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        {/* khu vực filters */}
        <Sidebar />
        {/* hiển thị sản phẩm */}
        <Products />
      </Grid>
    </Container>
  );
};

export default Main;
