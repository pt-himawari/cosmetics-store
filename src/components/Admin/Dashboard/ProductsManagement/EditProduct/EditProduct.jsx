import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

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
  const [isLoading, setLoading] = useState(false);

  const categoryOptions = {
    skincare: ["mask", "toner", "serum", "cleaner", "moisturizer"],
    makeup: ["lip", "eye", "face", "accessories"],
    haircare: ["hairmask", "shampoo", "conditioner"],
  };

  // su ly upload anh
  const [selectedImage, setSelectedImage] = useState(productWithId.image);
  const [temporaryImage, setTemporaryImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file)); // Store the file object
      setTemporaryImage(event.target.files[0]);
    }
  };
  console.log("temporaryImage", temporaryImage);
  // console.log("temporaryImage", temporaryImage);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setProductType(type);
    setCategory("");
    // Logic to update catalogy options based on type
  };

  const { control, register, handleSubmit, formState, watch } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: productWithId.name,
      type: productWithId.type,
      category: productWithId.category,
      brand: productWithId.brand,
      quantity: productWithId.quantity,
      currentPrice: 0,
      description: productWithId.description,
    },
  });
  const { errors, isDirty, isValid } = formState;
  const dispatch = useDispatch();

  // console.log("isValid", isValid);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      let image = productWithId.image;
      console.log("temporaryImage", temporaryImage);

      if (temporaryImage) {
        // su ly anh
        const formData = new FormData();
        formData.append("file", temporaryImage);
        formData.append("upload_preset", "ovbags68");
        let uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dite4bta9/upload",
          formData
        );
        setTemporaryImage(uploadRes?.data?.secure_url);
        setSelectedImage(uploadRes?.data?.secure_url);
        image = uploadRes?.data?.secure_url;
        // update data
      }
      console.log("image", image);

      let newProduct = {
        id: productWithId.id,
        ...data,
        star: productWithId.star,
        image,
        prevPrice:
          Number(data.currentPrice) === 0
            ? Number(productWithId.prevPrice)
            : Number(productWithId.currentPrice),
        currentPrice:
          Number(data.currentPrice) === 0
            ? Number(productWithId.currentPrice)
            : Number(data.currentPrice),
      };

      dispatch(editCosmeticsThunkAction(newProduct));
      setEditProduct(false);

      toast.success("Update Success!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Update failed :", error.message, { autoClose: 4000 });
    }
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
              <Divider>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "#121f43",
                  }}
                >
                  Edit Product
                </Typography>
              </Divider>
            </Grid>
            <Grid item container xs={12} spacing={2} mb={6}>
              {/* imge */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  mb: 3,
                  paddingLeft: "19px !important",
                  paddingTop: "0px !important",
                }}
              >
                <Stack
                  alignItems="center"
                  sx={{
                    height: "350px",
                    width: "100%",
                  }}
                >
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
                    src={selectedImage}
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
                    Change
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Stack>
              </Grid>

              <Grid item container xs={12} md={7} spacing={3} mb={2} mt={3}>
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
            ;{/* editor */}
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
                    // <SimpleMDE {...field} placeholder="Description…" />
                    <CKEditor
                      editor={ClassicEditor}
                      data={productWithId.description}
                      onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                          writer.setStyle(
                            "height",
                            "300px",
                            editor.editing.view.document.getRoot()
                          );
                        });
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        field.onChange(data); // Cập nhật trạng thái form với dữ liệu mới
                      }}
                      onBlur={field.onBlur} // Xử lý sự kiện onBlur
                    />
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
            ;{/* button */}
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
                  disabled={!isDirty && temporaryImage === null}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
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
