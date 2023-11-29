import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchCosmeticsThunkAction } from "../../../reducers/cosmeticSlice";
import { filtersCosmeticsSelector } from "../../../redux-toolkit/selectors";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCosmeticsThunkAction());
  }, [dispatch]);

  const remainCosmetics = useSelector(filtersCosmeticsSelector);
  return (
    <Grid item xs={12} md={9}>
      <Grid container spacing={2}>
        {remainCosmetics.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;
