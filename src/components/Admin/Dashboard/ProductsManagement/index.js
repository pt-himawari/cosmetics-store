import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Button,
  IconButton,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
// import { useTheme } from "@mui/material/styles";
import ProductsTable from "./ProductsTable";
import { useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import ProductDetails from "./EditProduct/ProductDetails";
import EditProduct from "./EditProduct/EditProduct";
import { useLocation } from "react-router-dom";
import { fetchCosmeticsThunkAction } from "../../../../reducers/cosmeticSlice";

const ProductsManagement = () => {
  const [addNew, setAddNew] = useState(false);
  const [editProductDetails, setEditProductDetails] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  // const [idProduct, setIdProduct] = useState({});
  const [selectProduct, setSelectProduct] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/productsMain") {
      setAddNew(false);
      setEditProductDetails(false);
      setEditProduct(false);
    }
  }, [location]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCosmeticsThunkAction());
  }, [dispatch]);
  return (
    // <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
    <>
      <Box mb={4} sx={{ width: "90%" }}>
        <Box
          sx={{
            // width: "90%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!addNew && !editProductDetails && !editProduct && (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddNew(true)}
              sx={{ mb: 4, backgroundColor: "#ab4aba" }}
            >
              Add New
            </Button>
          )}
        </Box>

        {!addNew && !editProductDetails && !editProduct && (
          <ProductsTable
            setEditProductDetails={setEditProductDetails}
            setSelectProduct={setSelectProduct}
          />
        )}

        {addNew && <AddProduct setAddNew={setAddNew} />}

        {editProductDetails && (
          <ProductDetails
            selectProduct={selectProduct}
            setSelectProduct={setSelectProduct}
            setEditProduct={setEditProduct}
            setEditProductDetails={setEditProductDetails}
          />
        )}

        {editProduct && (
          <EditProduct
            selectProduct={selectProduct}
            setEditProductDetails={setEditProductDetails}
            setEditProduct={setEditProduct}
          />
        )}
      </Box>
    </>

    // </Container>
  );
};

export default ProductsManagement;
