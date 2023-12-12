import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  Grid,
  Slide,
} from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeMultipleCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";
import CKEditor from "./CKEditor";
import ImageInfo from "./ImageInfo";
import ProductInfo from "./ProductInfo";

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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timer = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
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
        <ImageInfo productWithId={productWithId} />
        {/* thong tin */}
        <ProductInfo productWithId={productWithId} />

        {/* edit */}
        <CKEditor productWithId={productWithId} />
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
