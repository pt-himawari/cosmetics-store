import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { orderListSelector } from "../../../../redux-toolkit/selectors";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
export default function TotalSales() {
  const orderList = useSelector(orderListSelector);
  const totalSales = orderList.reduce(
    (total, order) => total + order.orderInfo.total,
    0
  );

  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        gutterBottom
        sx={{
          color: "#5f748d",
        }}
      >
        Total Sales
      </Typography>

      <Typography
        component="p"
        variant="h4"
        sx={{
          color: "#2f4365",
          fontSize: "30px",
          fontWeight: 600,
        }}
      >
        {formatter.format(totalSales)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {`${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`}
      </Typography>
    </>
  );
}
