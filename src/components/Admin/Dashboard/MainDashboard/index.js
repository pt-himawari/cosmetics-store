import Chart from "./Chart";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Paper, Box } from "@mui/material";
import Orders from "./Orders";
import TotalSales from "./TotalSales";
import TotalOrders from "./TotalOrders";
import { fetchOrderListThunkAction } from "../../../../reducers/orderSlice";
import { fetchCosmeticsThunkAction } from "../../../../reducers/cosmeticSlice";

export default function MainContent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderListThunkAction());
    dispatch(fetchCosmeticsThunkAction());
  }, [dispatch]);

  return (
    <Box maxWidth="lg" sx={{ width: "90%", minHeight: "90vh" }}>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <Grid item xs={6} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TotalSales />
          </Paper>
        </Grid>
        {/* Total orders */}
        <Grid item xs={6} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TotalOrders />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
