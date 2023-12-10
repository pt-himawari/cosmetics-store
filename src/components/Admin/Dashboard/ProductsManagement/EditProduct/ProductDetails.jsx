import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Accordion,
  Fab,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  AlertTitle,
  Slide,
} from "@mui/material/";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import { removeMultipleCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetails = (props) => {
  const {
    selectProduct,
    setSelectProduct,
    setEditProduct,

    setEditProductDetails,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timer = React.useRef();
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    async function getProductById() {
      try {
        let productListRes = await axios.get(
          `https://json-server-psi-three.vercel.app/cosmeticsList/${selectProduct?.id}`
        );
        let data = productListRes.data; // With axios, the response data is found in .data
        setSelectProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error appropriately
      }
    }
    getProductById();
  }, [selectProduct?.id, setSelectProduct]);

  const productWithId = { ...selectProduct };

  const handleRemoveProduct = () => {
    if (!isLoading) {
      setIsLoading(true);
      const ids = [selectProduct.id];
      dispatch(removeMultipleCosmeticsThunkAction(ids));
      timer.current = window.setTimeout(() => {
        setIsCompleted(true);
        setIsLoading(false);

        window.setTimeout(() => {
          setEditProductDetails(false);
        }, 1000);
      }, 2000);
    }
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
          pt: 3,
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
                {/* <ReactMarkdown> */}

                {parse(String(productWithId.description))}
                {/* </ReactMarkdown> */}
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
                onClick={() => {
                  setOpen(true);
                }}
              >
                Delete
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                  setOpen(false);
                }}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent
                  sx={{
                    p: "10px",
                    pb: 0,

                    width: "450px",
                  }}
                >
                  {/* <CircularProgress color="success" /> */}
                  <DialogContentText
                    id="alert-dialog-slide-description"
                    sx={{
                      width: "100%",
                      minHeight: "100px",
                    }}
                  >
                    {!isLoading && !isCompleted && (
                      <Alert severity="warning">
                        <AlertTitle>Confirm Deletion</AlertTitle>
                        Are you sure you want to delete?
                        <strong> This action cannot be undone! </strong>
                      </Alert>
                    )}

                    <Box
                      sx={{
                        textAlign: "center",
                        py: isLoading || isCompleted ? 3 : 0,
                      }}
                    >
                      {isLoading && (
                        <CircularProgress color="success" size={60} />
                      )}
                      {isCompleted && (
                        <>
                          <Fab color="success">
                            <CheckIcon />
                          </Fab>
                          <p>Deletion successful!</p>
                        </>
                      )}
                    </Box>

                    {/* {isLoading ? (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 3,
                        }}
                      >
                        <CircularProgress color="success" size={60} />
                      </Box>
                    ) : isCompleted ? (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 3,
                        }}
                      >
                        <Fab color="success">
                          <CheckIcon />
                        </Fab>
                      </Box>
                    ) : (
                      ""
                    )} */}
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  sx={{
                    pt: 1,
                  }}
                >
                  <Button
                    color="secondary"
                    type="button"
                    variant="contained"
                    sx={{
                      backgroundColor: "#8e8c99",
                      "&:hover": {
                        backgroundColor: "#8b8d98",
                        opacity: 0.8,
                        color: "white", // Màu văn bản khi hover
                      },
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="error"
                    type="button"
                    variant="contained"
                    sx={{
                      backgroundColor: "#E64D4C",
                      "&:hover": {
                        backgroundColor: "#CC4343",
                        opacity: 0.8,
                        color: "white", // Màu văn bản khi hover
                      },
                    }}
                    onClick={handleRemoveProduct}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
