import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Divider, Grid, Typography } from "@mui/material/";
import ImageUpload from "./ImageUpload";
import CustomCKEditor from "./CustomCKEditor";
import EditProductForm from "./EditProductForm";
import { constructNewProductData } from "./utils";
import { handleImageUpload, showToast } from "../../components";
import { editCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";

const EditProduct = (props) => {
  const { selectProduct, setEditProductDetails, setEditProduct } = props;
  const productWithId = { ...selectProduct };
  const [isLoading, setLoading] = useState(false);
  const [formDataState, setFormDataState] = useState({
    productType: productWithId.type,
    category: productWithId.category,
    selectedImage: productWithId.image,
    temporaryImage: null,
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormDataState((prevState) => ({
        ...prevState,
        selectedImage: URL.createObjectURL(file),
      }));
      setFormDataState((prevState) => ({
        ...prevState,
        temporaryImage: event.target.files[0],
      }));
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setFormDataState((prevState) => ({
      ...prevState,
      productType: type,
    }));
    setFormDataState((prevState) => ({
      ...prevState,
      category: "",
    }));
  };

  const { control, register, handleSubmit, formState } = useForm({
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
  const { errors, isDirty } = formState;
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      let imageUrl = productWithId.image;
      if (formDataState.temporaryImage) {
        imageUrl = await handleImageUpload(formDataState.temporaryImage);
        setFormDataState((prevState) => ({
          ...prevState,
          temporaryImage: imageUrl,
        }));
        setFormDataState((prevState) => ({
          ...prevState,
          selectedImage: imageUrl,
        }));
      }
      let newProduct = constructNewProductData(data, productWithId, imageUrl);
      dispatch(editCosmeticsThunkAction(newProduct));
      setEditProduct(false);
      showToast("success", "Update Success!");
    } catch (error) {
      showToast("error", `Update failed : ${error.message}`);
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
              <ImageUpload
                formDataState={formDataState}
                handleImageChange={handleImageChange}
              />
              {/* form */}
              <EditProductForm
                register={register}
                errors={errors}
                handleTypeChange={handleTypeChange}
                productWithId={productWithId}
                formDataState={formDataState}
                setFormDataState={setFormDataState}
              />
            </Grid>
            {/* editor */}
            <CustomCKEditor
              Controller={Controller}
              control={control}
              name="description"
              errors={errors}
              productWithId={productWithId}
            />
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
                  disabled={!isDirty && formDataState.temporaryImage === null}
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
