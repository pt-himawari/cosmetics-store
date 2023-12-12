import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Divider, Grid, Typography } from "@mui/material/";
import { generateProductId } from "./utils";
import ImageUpload from "./ImageUpload";
import AddProductForm from "./AddProductForm";
import CustomCKEditor from "./CustomCKEditor";
import { handleImageUpload, showToast } from "../../components";
import { addNewCosmeticsThunkAction } from "../../../../../reducers/cosmeticSlice";

const AddProduct = (props) => {
  const { setAddNew } = props;
  const [isLoading, setLoading] = useState(false);
  const { control, register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { isDirty, isValid, errors } = formState;
  const [formDataState, setFormDataState] = useState({
    productType: "",
    category: "",
    selectedImage: null,
    temporaryImage: null,
  });
  const dispatch = useDispatch();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormDataState((prevState) => ({
        ...prevState,
        selectedImage: URL.createObjectURL(file),
        temporaryImage: event.target.files[0],
      }));
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setFormDataState((prevState) => ({
      ...prevState,
      productType: type,
      category: "",
    }));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      // Sử dụng hàm upload ảnh từ utils
      const imageUrl = await handleImageUpload(formDataState.temporaryImage);
      setFormDataState((prevState) => ({
        ...prevState,
        temporaryImage: imageUrl,
      }));

      // Sử dụng hàm tạo ID sản phẩm
      const newId = generateProductId(formDataState.productType);
      let newCosmetics = {
        id: newId,
        ...data,
        prevPrice: 0,
        star: 0,
        image: imageUrl,
      };
      // Dispatch action
      dispatch(addNewCosmeticsThunkAction(newCosmetics));
      setAddNew(false);
      showToast("success", "Product added successfully!");
    } catch (error) {
      showToast("error", `Error adding product: ${error.message}`);
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
            {/* form */}

            <AddProductForm
              register={register}
              errors={errors}
              handleTypeChange={handleTypeChange}
              formDataState={formDataState}
              setFormDataState={setFormDataState}
            />
            {/* imgae upload */}
            <ImageUpload
              formDataState={formDataState}
              handleImageChange={handleImageChange}
            />
            {/* editor */}
            <CustomCKEditor
              Controller={Controller}
              control={control}
              errors={errors}
              name="description"
            />
            {/* nut button */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={() => {
                    setAddNew(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  startIcon={
                    isLoading && <CircularProgress size={20} color="inherit" />
                  }
                  disabled={
                    !isDirty ||
                    !isValid ||
                    formDataState.temporaryImage === null
                  }
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
