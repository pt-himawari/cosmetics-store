import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../reducers/cartSlice";
import { cartSelector } from "../../redux-toolkit/selectors";
const CreditCardMaskCustom = React.forwardRef(function CreditCardMaskCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000-0000-0000-0000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
CreditCardMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function PaymentForm({ activeStep, setActiveStep }) {
  const { customerInfo } = useSelector(cartSelector);
  console.log(customerInfo);

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { isDirty, isValid, errors } = formState;

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
            defaultValue={customerInfo.cardName}
            id="cardName"
            label="Name on card"
            fullWidth
            color="secondary"
            autoComplete="cc-name"
            variant="standard"
            inputProps={{
              style: { textTransform: "uppercase" }, // Đảm bảo văn bản hiển thị là in hoa
            }}
            onChange={(event) => {
              event.target.value = event.target.value.toUpperCase();
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("cardNumber", {
              required: "* Please enter your card Number",
            })}
            error={Boolean(errors.cardNumber)}
            helperText={errors.cardNumber?.message}
            defaultValue={customerInfo.cardNumber}
            id="cardNumber"
            label="Card number"
            placeholder="0000-0000-0000-0000"
            fullWidth
            color="secondary"
            autoComplete="cc-number"
            variant="standard"
            InputProps={{
              inputComponent: CreditCardMaskCustom,
            }}
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
            defaultValue={customerInfo.expDate}
            placeholder="MM/YY (11/24)"
            fullWidth
            type="text"
            color="secondary"
            autoComplete="cc-exp"
            variant="standard"
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
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
            type="number"
            error={Boolean(errors.cvv)}
            helperText={errors.cvv?.message}
            id="cvv"
            label="CVV"
            defaultValue={customerInfo.cvv}
            fullWidth
            color="secondary"
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
            <Button
              type="button"
              // variant="contained"
              onClick={() => setActiveStep(activeStep - 1)}
              sx={{ mt: 3, ml: 1, color: "#ab4aba" }}
            >
              Back
            </Button>
            <Button
              disabled={!isDirty || !isValid}
              type="button"
              variant="contained"
              color="secondary"
              onClick={onSubmit}
              sx={{ mt: 3, ml: 1, backgroundColor: "#ab4aba" }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
