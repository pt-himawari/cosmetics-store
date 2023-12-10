import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material/";
import React, { useEffect, useState } from "react";
// import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCosmeticsThunkAction } from "../../../../reducers/cosmeticSlice";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct/EditProduct";
import ProductDetails from "./EditProduct/ProductDetails";
import ProductsTable from "./ProductsTable";

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
  }, [dispatch, editProduct]);
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
