import StarIcon from "@mui/icons-material/Star";
import { Box, Chip, Grid, Rating, Stack, Typography } from "@mui/material/";
import React from "react";

const ProductInfo = ({ productWithId }) => {
  return (
    <Grid item container md={7} spacing={3}>
      <Stack
        sx={{
          padding: "5px",
          paddingTop: "20px",
          paddingLeft: "50px",
          pb: "0px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            mb: "3px",
            letterSpacing: "4px",
            color: "#5f748d",
            textTransform: "uppercase",
          }}
        >
          {productWithId.brand}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            padding: "0px",
            margin: "0px",
            letterSpacing: "2px",
            color: "#121f43",
          }}
        >
          {productWithId.name}
        </Typography>
        <Box
          mb={5}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Chip
            label={productWithId.type}
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#f0004715",
              color: "#cb1d63",
              borderRadius: "5px",
            }}
          />
          <Chip
            label={productWithId.category}
            sx={{
              mx: 3,
              textTransform: "capitalize",
              backgroundColor: "#3a00e70f",
              color: "#6550b9",
              borderRadius: "5px",
            }}
          />
          <Box>
            <Rating
              size="small"
              sx={{
                color: "#FFB000",
              }}
              name="text-feedback"
              value={Number(productWithId.star)}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon
                  // style={{ opacity: 0.55 }}
                  fontSize="inherit"
                />
              }
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Typography
            mt={2}
            // variant="h5"
            sx={{
              padding: "0px",
              margin: "0px",
              color: "#121f43",
              fontWeight: "bold",
            }}
          >
            Previous Price :
          </Typography>
          <Typography
            mt={2}
            variant="h5"
            sx={{
              padding: "0px",
              margin: "0px",
              color: "#5b5bd6c2",
              textDecoration:
                productWithId.currentPrice === 0 ? "" : "line-through",
            }}
          >
            {`$${productWithId.prevPrice}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Typography
            mt={2}
            sx={{
              padding: "0px",
              margin: "0px",
              color: "#121f43",
              fontWeight: "bold",
            }}
          >
            Current Price &nbsp;&nbsp;:
          </Typography>
          <Typography
            mt={2}
            variant="h5"
            sx={{
              padding: "0px",
              margin: "0px",
              color: "#5b5bd6",
            }}
          >
            {`$${productWithId.currentPrice}`}
          </Typography>
        </Box>
        <Box
          mt={1}
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Typography
            mt={2}
            sx={{
              padding: "0px",
              margin: "0px",
              color: "#121f43",
              fontWeight: "bold",
            }}
          >
            Quantity
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </Typography>
          <Box
            sx={{
              borderRadius: "4px",
              padding: "5px",
              fontWeight: "bold",
              border: "2px solid #b2c9dc",
            }}
          >
            {productWithId.quantity}
          </Box>
        </Box>
        <Box mt={4}>
          {productWithId.quantity !== 0 ? (
            <Chip
              label="In Stock"
              sx={{
                backgroundColor: "#27ce88",
                color: "#fff",
                borderRadius: "5px",
              }}
            />
          ) : (
            <Chip
              label="Out Of Stock"
              sx={{
                backgroundColor: "#f04438c4",
                color: "#fff",
                borderRadius: "5px",
              }}
            />
          )}
        </Box>
      </Stack>
    </Grid>
  );
};

export default ProductInfo;
