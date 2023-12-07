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
} from "@mui/material/";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

import { cosmeticsListSelector } from "../../../../../redux-toolkit/selectors";
// import ReactMarkdown from "react-markdown";
const ProductDetails = (props) => {
  const {
    selectProduct,
    setSelectProduct,
    setEditProduct,
    setEditProductDetails,
  } = props;

  useEffect(() => {
    // setLoading(true);
    async function getProductById() {
      let productListRes = await fetch(
        `https://json-server-psi-three.vercel.app/cosmeticsList/${selectProduct?.id}`
      );
      let data = await productListRes.json();
      setSelectProduct(data);
    }
    getProductById();
  }, [selectProduct?.id]);
  console.log(productWithId);
  // const products = useSelector(cosmeticsListSelector);
  // const productWithId = products.find((product) => product.id === idProduct);
  const productWithId = { ...selectProduct };
  console.log(productWithId);
  const [isEditable, setIsEditable] = useState(false);

  return (
    <Box
      sx={{
        width: "90%",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    ></Box>
  );
};

export default ProductDetails;
