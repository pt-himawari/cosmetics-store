import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product";
const Products = () => {
  return (
    <Grid item xs={12} md={9} container spacing={2}>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </Grid>
  );
};

export default Products;
