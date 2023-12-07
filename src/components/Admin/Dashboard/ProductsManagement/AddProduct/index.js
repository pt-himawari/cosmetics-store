import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  InputAdornment,
} from "@mui/material/";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";
import shortid from "shortid";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

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

const AddProduct = (props) => {
  // console.log(props);
  const { setAddNew } = props;

  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const categoryOptions = {
    skincare: ["mask", "toner", "serum", "cleaner", "moisturizer"],
    makeup: ["lip", "eye", "face", "accessories"],
    haircare: ["hairmask", "shampoo", "conditioner"],
  };
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setProductType(type);
    setCategory("");
  };

  const { control, register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { isDirty, isValid, errors } = formState;
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    const valueType = {
      haircare: "HAIR",
      makeup: "MU",
      skincare: "SKIN",
    };

    const intID = valueType[productType] || "OTH";
    console.log(intID);
    let newCosmetics = {
      id: `${intID}-${shortid.generate()}`,
      ...data,
      prevPrice: 0,
      star: 0,
      img: "https://res.cloudinary.com/dite4bta9/image/upload/v1701180875/Skincare/Moisturizer/ogunqcn4hhdof59zkush.png",
    };
    dispatch(addNewCosmeticsThunkAction(newCosmetics));
    setAddNew(false);
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
          <Typography variant="h4" gutterBottom mb={4}>
            Create Product
          </Typography>
          <Grid container spacing={3}>
            <Grid item container md={7} spacing={3}>
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
                  // value={productName}
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
              <Grid item xs={12}>
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
                  // value={brand}
                  // onChange={(e) => setBrand(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("currentPrice", {
                    required: "* Please enter  Brand ",
                  })}
                  error={Boolean(errors.currentPrice)}
                  helperText={errors.currentPrice?.message}
                  fullWidth
                  size="small"
                  label="Price"
                  type="number"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  // value={price}
                  // onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("quantity", {
                    required: "* Please enter  Brand ",
                  })}
                  error={Boolean(errors.quantity)}
                  helperText={errors.quantity?.message}
                  fullWidth
                  size="small"
                  label="Quantity"
                  type="number"
                  color="secondary"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack>
                <Box sx={{ width: "100px", height: "200px" }}>
                  <img
                    // src={imagePreview}
                    alt="Preview"
                  />
                </Box>
                <Button
                  color="secondary"
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    backgroundColor: "#ab4aba",
                  }}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Stack>
            </Grid>
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

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={() => {
                    setAddNew(false);
                    // setEditProductDetails(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  disabled={!isDirty || !isValid}
                  color="secondary"
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, ml: 1, backgroundColor: "#ab4aba" }}
                  onClick={onSubmit}
                >
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddProduct;
