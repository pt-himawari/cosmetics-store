import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import CartInfo from "./CartInfo";
import Summary from "./Summary";
import { cartSelector } from "../../redux-toolkit/selectors";

const Cart = () => {
  const { cartDetails } = useSelector(cartSelector);

  return (
    <Container
      sx={{
        mt: 15,
        mb: 20,
      }}
    >
      {cartDetails.length ? (
        <Grid container spacing={3} height="auto">
          <CartInfo />
          <Summary />
        </Grid>
      ) : (
        <Stack spacing={7} alignItems="center" height="38vh">
          <Box></Box>
          <Typography
            variant="h4"
            sx={{
              color: "#cc43437a",
            }}
          >
            <i>Cart is empty..... !</i>
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              backgroundColor: "#CC4343", // Màu nền mới
              color: "white", // Màu chữ
              "&:hover": {
                backgroundColor: "#662222", // Màu nền khi hover
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
        </Stack>
      )}
    </Container>
  );
};

export default Cart;
