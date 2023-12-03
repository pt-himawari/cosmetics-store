import * as React from "react";

import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../reducers/cartSlice";
import { v4 as uuid } from "uuid";
import { cartSelector } from "../../redux-toolkit/selectors";
export default function PaymentForm({ activeStep, setActiveStep }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { isDirty, isValid, errors } = formState;

  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { customerInfo } = cart;

  const onSubmit = handleSubmit((data) => {
    const formData = {
      cardName: data.cardName,
      cardNumber: data.cardNumber,
      expDate: data.expDate,
      cvv: data.cvv,
    };
    dispatch(cartSlice.actions.saveCustomer(formData));
    setActiveStep(activeStep + 1);
  });

  return (
    <form noValidate>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("cardName", {
              required: "* Please enter your cardName ",
            })}
            error={Boolean(errors.cardName)}
            helperText={errors.cardName?.message}
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("cardNumber", {
              required: "* Please enter your card Number",
            })}
            error={Boolean(errors.cardNumber)}
            helperText={errors.cardNumber?.message}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("expDate", {
              required: "* Please enter your expiry date",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "Invalid expiry date format (MM/YY)",
              },
            })}
            error={Boolean(errors.expDate)}
            helperText={errors.expDate?.message}
            id="expDate"
            label="Expiry date"
            placeholder="MM/YY (11/24)"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("cvv", {
              required: "* Please enter your CVV",
              pattern: {
                value: /^\d{3,4}$/, // Regex chỉ chấp nhận 3 hoặc 4 chữ số
                message: "Invalid CVV (must be 3 or 4 digits)",
              },
            })}
            error={Boolean(errors.cvv)}
            helperText={errors.cvv?.message}
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Button
              type="button"
              // variant="contained"
              onClick={() => setActiveStep(activeStep - 1)}
              sx={{ mt: 3, ml: 1 }}
            >
              Back
            </Button> */}
            <Button
              disabled={!isDirty || !isValid}
              type="button"
              variant="contained"
              // onClick={() => {
              //   setActiveStep(activeStep + 1);
              // }}
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
