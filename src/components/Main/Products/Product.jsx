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
} from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { Link as LinkRouter } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import cartSlice from "../../../reducers/cartSlice";

const Product = ({ product }) => {
  const { name, image, prevPrice, currentPrice, star, brand, id } = product;
  const dispatch = useDispatch();

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
        <LinkRouter to={`/product/${id}`}>
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
        </LinkRouter>

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
          <Link
            component={LinkRouter}
            to={`/product/${id}`}
            underline="hover"
            sx={{
              color: "#121f43",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                // textTransform: "capitalize !important",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              {name.length > 15 ? `${name.substring(0, 15)}...` : name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "15px",
                textAlign: "center",

                fontWeight: 600,
                // textTransform: "capitalize",
              }}
            >
              {brand}
            </Typography>
          </Link>
          <CardActions
            sx={{
              px: "20px",
            }}
          >
            <Stack
              direction="row"
              spacing={10}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-start"
                sx={{
                  width: "100%",
                }}
              >
                {prevPrice === 0 ? (
                  ""
                ) : (
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${prevPrice}
                  </Typography>
                )}

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
                  toast.success(" Product added to cart successfully!!", {
                    autoClose: 1000,
                  });
                }}
              >
                <AddShoppingCartIcon />
              </Button>
            </Stack>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Product;
