import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from "@mui/material/";
import React, { useMemo } from "react";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { getChipStyles, formatDate, formatterCurrency } from "../components";
import { orderListSelector } from "../../../../redux-toolkit/selectors";

const Orders = React.memo(() => {
  const orderList = useSelector(orderListSelector);

  const fourRecentOrders = useMemo(() => {
    return [...orderList]
      .sort((a, b) => b.orderInfo.orderDate - a.orderInfo.orderDate)
      .slice(0, 4);
  }, [orderList]);
  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        gutterBottom
        sx={{ color: "#121f43", fontWeight: 600 }}
      >
        Recent Orders
      </Typography>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                  color: "#121f43",
                }}
              >
                Order Date
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                  color: "#121f43",
                }}
              >
                Customers
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#121f43",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#121f43",
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#121f43",
                }}
              >
                Payment Method
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  color: "#121f43",
                }}
              >
                Sale Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fourRecentOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell align="left">
                  {formatDate(order.orderInfo.orderDate)}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontWeight: 600,
                    color: "#121f43",
                  }}
                >
                  {order.customerInfo.fullName}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.orderInfo.status}
                    sx={getChipStyles(order.orderInfo.status)}
                  />
                </TableCell>
                <TableCell align="center">{order.customerInfo.email}</TableCell>

                <TableCell align="center">{`••••   ${order.customerInfo.cardNumber
                  .toString()
                  .slice(-4)}`}</TableCell>
                <TableCell align="right">
                  {formatterCurrency(order.orderInfo.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});
export default Orders;
