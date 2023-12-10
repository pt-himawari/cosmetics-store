import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import shortid from "shortid";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addNewCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";

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
  const [isLoading, setLoading] = useState(false);
  const categoryOptions = {
    skincare: ["mask", "toner", "serum", "cleaner", "moisturizer"],
    makeup: ["lip", "eye", "face", "accessories"],
    haircare: ["hairmask", "shampoo", "conditioner"],
  };
  // su ly upload anh
  const [selectedImage, setSelectedImage] = useState(null);
  const [temporaryImage, setTemporaryImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file)); // Store the file object
      setTemporaryImage(event.target.files[0]);
    }
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setLoading(true);
      // Upload image
      const formData = new FormData();
      formData.append("file", temporaryImage);
      formData.append("upload_preset", "ovbags68");
      let uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dite4bta9/upload",
        formData
      );
      setTemporaryImage(uploadRes?.data?.secure_url);

      // Prepare data for API
      const valueType = {
        haircare: "HAIR",
        makeup: "MU",
        skincare: "SKIN",
      };
      const intID = valueType[productType] || "OTH";
      let newCosmetics = {
        id: `${intID}-${shortid.generate()}`,
        ...data,
        prevPrice: 0,
        star: 0,
        image: uploadRes?.data?.secure_url,
      };

      // Dispatch action
      dispatch(addNewCosmeticsThunkAction(newCosmetics));
      setAddNew(false);

      // Display success message
      toast.success("Product added successfully!", { autoClose: 2000 });
    } catch (error) {
      // Handle errors

      toast.error(`Error adding product: ${error.message}`, {
        autoClose: 4000,
      });
    }
  });

  return (
    <>
      <Box
        sx={{
          width: "90%",
          borderRadius: "10px",
          padding: "30px",
          pt: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form noValidate>
          <Divider>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#121f43",
              }}
            >
              Add New Cosmetics
            </Typography>
          </Divider>

          <Grid container spacing={3} mt={2}>
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
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                // minWidth: "300px",
                // minHeight: "350px",
                height: "350px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* <Stack> */}
              {!selectedImage && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px dashed #b2c9dc",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    mb: 2,
                  }}
                >
                  <Button
                    component="label"
                    // variant="contained"
                    variant="text"
                    sx={{
                      flexDirection: "column",
                      textTransform: "capitalize",
                      color: "#8b8d98",
                    }}
                    startIcon={
                      <AddPhotoAlternateIcon
                        sx={{
                          width: "100px",
                          height: "100px",
                          color: "#6e56cf",
                        }}
                      />
                    }
                  >
                    Browse file to upload
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              )}

              {/* anh hien thi */}
              {selectedImage && (
                <>
                  <Button
                    // color="secondary"
                    component="label"
                    sx={{
                      // backgroundColor: "#ab4aba",
                      width: "100%",
                      height: "95%",
                      position: "absolute",
                      top: "0px",
                      // bottom: "85px",
                    }}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageChange}
                      sx={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </Button>

                  <Box
                    src={selectedImage}
                    mb={3}
                    component="img"
                    sx={{
                      // width: "auto",
                      // height: "auto",
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      // margin: "auto",
                      padding: "0px !important",
                      display: "block",
                    }}
                    alt="Paella dish"
                  ></Box>
                </>
              )}

              {/* nuts up len sever */}
              {selectedImage && (
                <Box>
                  <Button
                    color="secondary"
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: "#ab4aba",
                    }}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageChange}
                    />
                    Choose file
                  </Button>
                </Box>
              )}

              {/* </Stack> */}
            </Grid>
            {/* editor */}
            <Grid item xs={12} mt={4}>
              <Box
                sx={{
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
                      data=""
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
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
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
                  startIcon={
                    isLoading && <CircularProgress size={20} color="inherit" />
                  }
                  disabled={!isDirty || !isValid || temporaryImage === null}
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
