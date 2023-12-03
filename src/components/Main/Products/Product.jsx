import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import cartSlice from "../../../reducers/cartSlice";

const Product = ({ product }) => {
  const { name, image, originalPrice, currentPrice, star, brand } = product;
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  return (
    <Grid item xs={6} md={4}>
      {/* San pham */}

      <Card
        elevation={3}
        sx={{
          height: "auto",
          borderRadius: "15px",
        }}
      >
        <CardHeader
          sx={{
            height: "10px",
            padding: "8px 20px 0px 0px",
          }}
          action={
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="error" />
            </IconButton>
          }
        />

        <CardMedia
          component="img"
          sx={{
            height: "155px",
            width: "auto",
            objectFit: "contain",
            margin: "auto",
          }}
          image={image}
          alt="Paella dish"
        />

        <CardContent
          sx={{
            padding: "15px 0px 0px",
            paddingBottom: "2px !important",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Rating
              size="small"
              sx={{
                color: "red",
              }}
              name="text-feedback"
              value={star}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              // textTransform: "capitalize !important",
              textAlign: "center",
              fontSize: "15px",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "15px",
              fontWeight: 600,
              // textTransform: "capitalize",
            }}
          >
            {brand}
          </Typography>
          <CardActions>
            <Stack
              direction="row"
              spacing={10}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1}>
                <Typography
                  variant="h6"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${originalPrice}
                </Typography>
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                >
                  ${currentPrice}
                </Typography>
              </Stack>

              <Button
                color="error"
                sx={{
                  color: "#FFFF",
                  fontWeight: "bold",
                  backgroundColor: "#F25050",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#CC4343",
                  },
                }}
                onClick={() => {
                  dispatch(cartSlice.actions.addCart(product));
                  setOpenSnackbar(true);
                }}
              >
                <AddShoppingCartIcon />
              </Button>
            </Stack>
          </CardActions>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "100px" }} // Add this line
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          // severity="success"
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: "#009432",
          }}
        >
          Product added to cart successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Product;
