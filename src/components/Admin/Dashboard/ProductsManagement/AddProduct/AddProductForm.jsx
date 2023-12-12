import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
} from "@mui/material/";
import { categoryOptions } from "../../components";

const AddProductForm = ({
  register,
  errors,
  handleTypeChange,
  formDataState,
  setFormDataState,
}) => {
  return (
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
            value={formDataState.productType}
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
            value={formDataState.category}
            label="Category"
            onChange={(e) => {
              // setCategory(e.target.value)
              setFormDataState((prevState) => ({
                ...prevState,
                category: e.target.value,
              }));
            }}
          >
            {formDataState.productType &&
              categoryOptions[formDataState.productType].map((option) => (
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
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
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
  );
};

export default AddProductForm;
