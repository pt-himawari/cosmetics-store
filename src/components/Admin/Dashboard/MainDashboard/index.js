import React, { useEffect } from "react";
import { Grid, Paper, Box } from "@mui/material";
import Chart from "./Chart";
import TotalSales from "./TotalSales";
import TotalOrders from "./TotalOrders";
import Orders from "./Orders";
import { useDispatch } from "react-redux";
// import { orderListSelector } from "../../../../redux-toolkit/selectors";
// import { cosmeticsListSelector } from "../../../../redux-toolkit/selectors";
import { fetchOrderListThunkAction } from "../../../../reducers/orderSlice";
import { fetchCosmeticsThunkAction } from "../../../../reducers/cosmeticSlice";

export default function MainContent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderListThunkAction());
    dispatch(fetchCosmeticsThunkAction());
  }, [dispatch]);
  // const orderList = useSelector(orderListSelector);
  // const products = useSelector(cosmeticsListSelector);
  // console.log(products);
  return (
    <Box maxWidth="lg" sx={{ width: "90%" }}>
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
