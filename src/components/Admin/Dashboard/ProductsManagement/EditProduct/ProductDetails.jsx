import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
  Rating,
} from "@mui/material/";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import { cosmeticsListSelector } from "../../../../../redux-toolkit/selectors";
import {
  removeCosmeticsThunkAction,
  removeMultipleCosmeticsThunkAction,
} from "../../../../../reducers/cosmeticSlice";
import ReactMarkdown from "react-markdown";
const ProductDetails = (props) => {
  const {
    selectProduct,
    setSelectProduct,
    setEditProduct,
    setEditProductDetails,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProductById() {
      let productListRes = await fetch(
        `https://json-server-psi-three.vercel.app/cosmeticsList/${selectProduct?.id}`
      );
      let data = await productListRes.json();
      setSelectProduct(data);
    }
    getProductById();
  }, [selectProduct?.id]);

  const productWithId = { ...selectProduct };

  const handleRemoveProduct = () => {
    const ids = [selectProduct.id];
    // console.log(ids);
    dispatch(removeMultipleCosmeticsThunkAction(ids));

    // dispatch(removeCosmeticsThunkAction(selectProduct));
    setEditProductDetails(false);
  };

  return (
    <Box
      sx={{
        width: "90%",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {/* imge */}
        <Grid
          item
          xs={12}
          md={5}
          mb={8}
          sx={{
            padding: "5px !important",

            border: "1px solid #b2c9dc",
            borderRadius: "10px",
          }}
        >
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              margin: "auto",
              display: "block",
            }}
            src={productWithId.image}
            alt="Paella dish"
          ></Box>
        </Grid>
        {/* thong tin */}
        <Grid item container md={7} spacing={3}>
          <Stack
            // spacing={1}
            sx={{
              padding: "5px",
              paddingLeft: "40px",
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

        {/* des */}
        <Grid
          item
          xs={12}
          mt={2}
          sx={{
            padding: "0px !important",
          }}
        >
          <Accordion
            sx={{
              minHeight: "100px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5"> Description...</Typography>
            </AccordionSummary>
            <AccordionDetails className="accordionDetails">
              <Typography>
                {/* <Typography variant="h5"> {productWithId.name}</Typography> */}
                <ReactMarkdown>{productWithId.description}</ReactMarkdown>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        {/* buuton */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              sx={{ mt: 3, ml: 1 }}
              onClick={() => {
                setEditProductDetails(false);
              }}
            >
              Back
            </Button>
            <Box>
              <Button
                startIcon={<EditIcon />}
                color="secondary"
                type="button"
                variant="contained"
                sx={{ mt: 3, ml: 1, backgroundColor: "#ab4aba" }}
                onClick={() => {
                  // setIdProduct(idProduct);
                  setEditProduct(true);
                  setEditProductDetails(false);
                }}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                type="button"
                variant="contained"
                sx={{ mt: 3, ml: 1, backgroundColor: "#e54666" }}
                onClick={handleRemoveProduct}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
