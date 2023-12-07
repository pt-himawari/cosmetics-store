import React from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from "@mui/material/";
import Chip from "@mui/material/Chip";

import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { orderListSelector } from "../../../../redux-toolkit/selectors";
// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const orderList = useSelector(orderListSelector);

  // Create a copy of the array and then sort it
  const sortedOrderList = [...orderList].sort(
    (a, b) => b.orderInfo.orderDate - a.orderInfo.orderDate
  );
  const fourRecentOrders = sortedOrderList.slice(0, 4);
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Orders
      </Typography>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order Date</TableCell>
              <TableCell align="left">Customers</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fourRecentOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell align="left">
                  {dayjs.unix(order.orderInfo.orderDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="left">
                  {order.customerInfo.fullName}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.orderInfo.status}
                    sx={{
                      backgroundColor:
                        order.orderInfo.status === "REFUNDED"
                          ? "#f0443842"
                          : order.orderInfo.status === "DELIVERED"
                          ? "#10b98133"
                          : "#f7900938",
                      color:
                        order.orderInfo.status === "REFUNDED"
                          ? "#b42318"
                          : order.orderInfo.status === "DELIVERED"
                          ? "#0b815a"
                          : "#b54708f7",
                    }}
                    // variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">{order.customerInfo.email}</TableCell>

                <TableCell align="center">{`••••   ${order.customerInfo.cardNumber
                  .toString()
                  .slice(-4)}`}</TableCell>
                <TableCell align="right">{`$${order.orderInfo.total}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </TableContainer>
    </>
  );
}
