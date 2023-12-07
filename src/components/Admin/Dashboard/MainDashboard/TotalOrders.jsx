import React from "react";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { orderListSelector } from "../../../../redux-toolkit/selectors";

function preventDefault(event) {
  event.preventDefault();
}

export default function TotalOrders() {
  const orderList = useSelector(orderListSelector);
  // console.log(orderList.orderInfo);

  // const total = orderList.orderInfo.total.reduce(
  //   (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
  //   0
  // );

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Total Order
      </Typography>

      <Typography component="p" variant="h4">
        {orderList.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {`${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
}
