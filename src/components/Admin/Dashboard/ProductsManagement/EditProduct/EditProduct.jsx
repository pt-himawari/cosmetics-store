import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditProduct = (props) => {
  const { selectProduct, setEditProductDetails, setEditProduct } = props;

  // const products = useSelector(cosmeticsListSelector);
  const productWithId = { ...selectProduct };

  const [productType, setProductType] = useState(productWithId.type);
  const [category, setCategory] = useState(productWithId.category);
  const categoryOptions = {
    skincare: ["mask", "toner", "serum", "cleaner", "moisturizer"],
    makeup: ["lip", "eye", "face", "accessories"],
    haircare: ["hairmask", "shampoo", "conditioner"],
  };
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setProductType(type);
    setCategory("");
    // Logic to update catalogy options based on type
  };

  const { control, register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { errors } = formState;
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    console.log("log data", data);

    let newProduct = {
      id: productWithId.id,
      ...data,
      star: productWithId.star,
      image: productWithId.image,
      prevPrice:
        Number(data.currentPrice) === 0
          ? Number(productWithId.prevPrice)
          : Number(productWithId.currentPrice),
      currentPrice:
        Number(data.currentPrice) == 0
          ? Number(productWithId.currentPrice)
          : Number(data.currentPrice),
    };

    console.log("newProduct", newProduct);
    dispatch(editCosmeticsThunkAction(newProduct));
    setEditProduct(false);
  });
  return (
    <>
      <Box
        sx={{
          width: "90%",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form noValidate>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                mb: 6,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                mb={6}
                sx={{ color: "#121f43", mb: 2 }}
              >
                Edit Product
              </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              {/* imge */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  mb: 4,
                  paddingLeft: "19px !important",
                  paddingTop: "0px !important",
                }}
              >
                <Stack alignItems="center">
                  <Box
                    mb={2}
                    component="img"
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      // margin: "auto",
                      padding: "0px !important",
                      display: "block",
                    }}
                    src={productWithId.image}
                    alt="Paella dish"
                  ></Box>

                  <Button
                    color="secondary"
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      width: "50%",
                      backgroundColor: "#916DB3",
                    }}
                  >
                    Upload
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Stack>
              </Grid>

              <Grid
                item
                container
                xs={12}
                md={7}
                spacing={3}
                mb={2}
                description=""
              >
                <Grid item xs={12}>
                  <TextField
                    {...register("name", {
                      required: "* Please enter name ",
                    })}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    autoFocus={Boolean(errors.name)}
                    size="small"
                    fullWidth
                    color="secondary"
                    label="Product Name"
                    defaultValue={productWithId.name}
                    // onChange={(e) => setProductName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(errors.type)}>
                    <InputLabel size="small" color="secondary">
                      Type
                    </InputLabel>
                    <Select
                      {...register("type", {
                        required: "* Please enter  type ",
                      })}
                      error={Boolean(errors.type)}
                      helperText={errors.type?.message}
                      size="small"
                      color="secondary"
                      value={productType}
                      label="Type"
                      onChange={handleTypeChange}
                    >
                      <MenuItem value="skincare">Skincare</MenuItem>
                      <MenuItem value="makeup">Makeup</MenuItem>
                      <MenuItem value="haircare">Haircare</MenuItem>
                    </Select>
                    <FormHelperText>{errors.type?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(errors.category)}>
                    <InputLabel size="small" color="secondary">
                      Category
                    </InputLabel>
                    <Select
                      {...register("category", {
                        required: "* Please enter  category ",
                      })}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      size="small"
                      color="secondary"
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {productType &&
                        categoryOptions[productType].map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                            sx={{
                              textTransform: "capitalize",
                            }}
                          >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.category?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("brand", {
                      required: "* Please enter  Brand ",
                    })}
                    error={Boolean(errors.brand)}
                    helperText={errors.brand?.message}
                    size="small"
                    label="Brand"
                    fullWidth
                    color="secondary"
                    defaultValue={productWithId.brand}
                    // onChange={(e) => setBrand(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("quantity", {
                      required: "* Please enter  quantity ",
                    })}
                    error={Boolean(errors.quantity)}
                    helperText={errors.quantity?.message}
                    fullWidth
                    size="small"
                    label="Quantity"
                    type="number"
                    color="secondary"
                    defaultValue={productWithId.quantity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("currentPrice")}
                    error={Boolean(errors.currentPrice)}
                    helperText={errors.currentPrice?.message}
                    fullWidth
                    size="small"
                    label="New Price"
                    type="number"
                    color="secondary"
                    placeholder="0"
                    defaultValue={0}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    label="Current Price"
                    type="number"
                    color="secondary"
                    disabled
                    fullWidth
                    value={productWithId.currentPrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* editor */}
            <Grid item xs={12}>
              <Box
                sx={{
                  height: "auto",
                  // border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <Controller
                  name="description"
                  rules={{ required: "* Please enter description" }}
                  control={control}
                  defaultValue={productWithId.description}
                  render={({ field }) => (
                    <SimpleMDE {...field} placeholder="Description…" />
                  )}
                />

                <Box
                  sx={{
                    color: "#d32f2f",
                    fontWeight: 700,
                  }}
                >
                  {errors.description && <p>{errors.description?.message}</p>}
                </Box>
              </Box>
            </Grid>
            {/* button */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="outlined"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  setEditProductDetails(true);
                  setEditProduct(false);
                }}
              >
                Back
              </Button>
              <Box>
                <Button
                  startIcon={<SaveIcon />}
                  color="secondary"
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, ml: 1, backgroundColor: "#ab4aba" }}
                  onClick={onSubmit}
                >
                  Save
                </Button>
                <Button
                  startIcon={<CloseIcon />}
                  color="secondary"
                  type="button"
                  variant="contained"
                  sx={{
                    mt: 3,
                    ml: 1,
                    backgroundColor: "#8e8c99",
                    "&:hover": {
                      backgroundColor: "#8b8d98",
                      opacity: 0.8,
                      color: "white", // Màu văn bản khi hover
                    },
                  }}
                  onClick={() => {
                    setEditProduct(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};
export default EditProduct;
