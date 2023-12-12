import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductDetails from "./ProductDetails";
import ProductsTable from "./ProductsTable";
import { fetchCosmeticsThunkAction } from "../../../../reducers/cosmeticSlice";

const ProductsManagement = () => {
  const [addNew, setAddNew] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const [editProductDetails, setEditProductDetails] = useState(false);
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
    <>
      <Box mb={4} sx={{ width: "90%", minHeight: "90vh" }}>
        <Box
          sx={{
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
  );
};

export default ProductsManagement;
