import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartSelector } from "../../redux-toolkit/selectors";
import cartSlice from "../../reducers/cartSlice";

const headCells = [
  { id: "item", label: "Item" },
  { id: "unitPrice", label: "Unit Price" },
  { id: "quantity", label: "Quantity" },
  { id: "finalPrice", label: "Final Price" },
  { id: "remove", label: "Remove" },
];
const CartInfo = () => {
  const dispatch = useDispatch();
  const { cartInfo, cartDetails } = useSelector(cartSelector);

  const rows = [...cartDetails];
  const totalQuantity = cartDetails.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);

  return (
    <Grid item xs={9}>
      <Typography
        variant="h4"
        sx={{
          color: "#CC4343",
        }}
        mb={4}
      >
        Shopping Cart
      </Typography>
      <Box sx={{ width: "100%" }}>
        {/* <Paper sx={{ x, mb: 2 }}> */}

        <TableContainer sx={{}}>
          <Table
            sx={{
              width: "100%",
              // p: "100px",
            }}
            aria-labelledby="tableTitle"
            size="medium"
            // {dense ? "small" : "medium"}
          >
            <TableHead
              sx={{
                borderTop: "1px solid #ccc",
                // fontWeight: 500,
                color: "#f57273c4",
                // color: "#FFC5C5",
                // color: "#CC4343",
                fontSize: "1rem",
                // backgroundColor: "#FFEFE8",
              }}
            >
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    align={headCell.id === "item" ? "" : "center"}
                    key={headCell.id}
                    sx={{
                      // fontWeight: 500,
                      color: "#f57273c4",
                      // color: "#FFC5C5",
                      // color: "#CC4343",
                      fontSize: "1rem",
                      // backgroundColor: "#FFEFE8",
                    }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cartDetails.map((cart, index) => (
                <TableRow hover key={cart.id}>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        //   fontWeight: 600,
                        //   color: "#242424",
                      }}
                    >
                      {/* Hình ảnh sản phẩm */}
                      <img
                        src={cart.image}
                        alt={cart.item}
                        style={{ width: 50, marginRight: 10 }}
                      />
                      {/* Tên sản phẩm */}
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#242424",
                        }}
                      >
                        {cart.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#242424",
                      }}
                    >
                      {cart.currentPrice}$
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <IconButton
                        onClick={() => {
                          dispatch(cartSlice.actions.incrementQuantity(cart));
                        }}
                      >
                        <AddIcon />
                        {/* <AddCircleOutlineIcon /> */}
                      </IconButton>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#242424",
                        }}
                      >
                        {cart.quantity}
                      </Typography>

                      <IconButton
                        onClick={() => {
                          dispatch(cartSlice.actions.decrementQuantity(cart));
                        }}
                      >
                        <RemoveIcon />
                        {/* <AddCircleOutlineIcon /> */}
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#242424",
                      }}
                    >
                      {cart.amount}$
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {/* Replace with your remove icon or button */}
                    <IconButton
                      onClick={() => {
                        dispatch(cartSlice.actions.removeCartItem(cart));
                      }}
                    >
                      <CancelIcon
                        sx={{
                          // color: "#545454"
                          color: "#737373",
                        }}
                      />
                    </IconButton>
                    {/* <AddCircleOutlineIcon /> */}
                  </TableCell>
                </TableRow>
              ))}
              {/* {emptyRows > 0 && ( */}
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={5}
                  sx={{
                    borderBottom: "none",
                    px: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Button
                      component={Link}
                      to="/"
                      sx={{
                        // backgroundColor: "#CC4343", // Màu nền mới
                        color: "#CC4343", // Màu chữ
                        "&:hover": {
                          backgroundColor: "#f5727314", // Màu nền khi hover
                          borderBottom: "#66222",
                        },
                      }}
                    >
                      {/* <Link href="#" underline="hover"> */}
                      <ArrowBackIcon
                        sx={{
                          mr: 1,
                        }}
                      />
                      Continue Shopping
                      {/* </Link> */}
                    </Button>
                    <Box>
                      <Typography
                        component="span"
                        sx={{
                          "& strong": {
                            fontWeight: 800,
                          },
                        }}
                      >
                        Subtotal ( <strong>{totalQuantity} </strong>
                        items ):
                        <strong> {cartInfo.subTotal}$</strong>
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
              {/* )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <div style={{ height: 400, width: "100%" }}></div> */}
      {/* <Box>xs=8sfsdfsd</Box> */}
    </Grid>
  );
};

export default CartInfo;
