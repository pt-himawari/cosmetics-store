import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../reducers/cartSlice";
import { cartSelector } from "../../redux-toolkit/selectors";
export default function AddressForm({ activeStep, setActiveStep }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });

  const { isDirty, isValid, errors } = formState;

  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { customerInfo } = cart;
  const onSubmit = handleSubmit((data) => {
    const fullAddress = `${data.address}, ${data.state}, ${data.city}, ${data.country}`;
    const customerData = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: fullAddress,
    };

    dispatch(cartSlice.actions.saveCustomer(customerData));
    setActiveStep(activeStep + 1);
  });

  return (
    <form noValidate>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            {...register("fullName", {
              required: "* Please enter your full name ",
            })}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("email", {
              required: {
                value: true,
                message: "* Please enter your email!",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                // /^\S+@\S+$/i
                message: "* Invalid email format!",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("address", {
              required: "* Please enter your address",
            })}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
            id="address"
            name="address"
            label="Address "
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("city", {
              required: "* Please enter your city",
            })}
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("state", {
              required: "* Please enter your state",
            })}
            error={Boolean(errors.state)}
            helperText={errors.state?.message}
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            {...register("country", {
              required: "* Please enter is country",
            })}
            error={Boolean(errors.country)}
            helperText={errors.country?.message}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("phone", {
              required: {
                value: true,
                message: "* Please enter your phone number!",
              },
              pattern: {
                value:
                  // /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  /^\d+$/,
                message: "* Invalid phone number format!",
              },
              min: {
                value: 9, // Số tối thiểu
                message: "Must have at least 9 digits ",
              },
            })}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              disabled={!isDirty || !isValid}
              type="button"
              variant="contained"
              // onClick={}

              onClick={onSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
