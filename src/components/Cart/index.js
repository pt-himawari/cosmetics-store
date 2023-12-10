import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { cartSelector } from "../../redux-toolkit/selectors";
import CartInfo from "./CartInfo";
import Summary from "./Summary";

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
        <Stack
          // direction="row"
          spacing={7}
          alignItems="center"
          // justifyContent="space-between"
          height="38vh"
        >
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
            {/* <Link href="#" underline="hover"> */}
            <ArrowBackIcon
              sx={{
                mr: 1,
              }}
            />
            Continue Shopping
            {/* </Link> */}
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default Cart;
