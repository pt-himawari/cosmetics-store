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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cartSlice from "../../reducers/cartSlice";
import formatterCurrency from "../common/formatterCurrency";
import { cartSelector } from "../../redux-toolkit/selectors";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const headCells = [
  { id: "item", label: "Item", align: "" },
  { id: "unitPrice", label: "Unit Price", align: "right" },
  { id: "quantity", label: "Quantity", align: "center" },
  { id: "finalPrice", label: "Final Price", align: "right" },
  { id: "remove", label: "Remove", align: "center" },
];
const CartInfo = () => {
  const dispatch = useDispatch();
  const { cartInfo, cartDetails } = useSelector(cartSelector);

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});

  const totalQuantity = cartDetails.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);

  return (
    <Grid item xs={12} md={9}>
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
        <TableContainer sx={{}}>
          <Table
            sx={{
              width: "100%",
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead
              sx={{
                borderTop: "1px solid #ccc",

                color: "#f57273c4",

                fontSize: "1rem",
              }}
            >
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    align={headCell.align}
                    key={headCell.id}
                    sx={{
                      color: "#f57273c4",

                      fontSize: "1rem",
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

                  <TableCell align="right">
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#242424",
                      }}
                    >
                      {formatterCurrency(cart.currentPrice)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <IconButton
                        onClick={() => {
                          dispatch(cartSlice.actions.decrementQuantity(cart));
                        }}
                      >
                        <RemoveIcon />
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
                          dispatch(cartSlice.actions.incrementQuantity(cart));
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#242424",
                      }}
                    >
                      {formatterCurrency(cart.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {/* Replace with your remove icon or button */}
                    <IconButton
                      onClick={() => {
                        setCart(cart);
                        setOpen(true);
                      }}
                    >
                      <CancelIcon
                        sx={{
                          // color: "#545454"
                          color: "#737373",
                        }}
                      />
                    </IconButton>
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
                        color: "#CC4343", // Màu chữ
                        "&:hover": {
                          backgroundColor: "#f5727314", // Màu nền khi hover
                          borderBottom: "#66222",
                        },
                      }}
                    >
                      <ArrowBackIcon
                        sx={{
                          mr: 1,
                        }}
                      />
                      Continue Shopping
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
                        <strong> {formatterCurrency(cartInfo.subTotal)}</strong>
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Confirm removal</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {"Are you sure you want to remove product"}
              <strong> {cart.name}</strong>
              {"from your cart?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(cartSlice.actions.removeCartItem(cart));
                setOpen(false);
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Grid>
  );
};

export default CartInfo;
