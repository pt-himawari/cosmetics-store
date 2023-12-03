import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import { checkoutCartThunkAction } from "../../reducers/cartSlice";
import { cartSelector } from "../../redux-toolkit/selectors";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import shortid from "shortid";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector);

  console.log(cart);

  const [activeStep, setActiveStep] = React.useState(0);
  const [id, setID] = React.useState("");

  const handleCheckoutCart = () => {
    const order = {
      orderId: shortid.generate(),
      orderInfo: {
        ...cart.cartInfo,
        orderDate: Math.floor(Date.now() / 1000),
      },
      orderDetails: [...cart.cartDetails],
      customerInfo: {
        ...cart.customerInfo,
      },
    };
    dispatch(checkoutCartThunkAction(order));

    setID(order.orderId);
    setActiveStep(activeStep + 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm activeStep={activeStep} setActiveStep={setActiveStep} />
        );
      case 1:
        return (
          <PaymentForm activeStep={activeStep} setActiveStep={setActiveStep} />
        );
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }
  const handleBack = () => {
    // setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container
        // component="main"
        // maxWidth="sm"
        sx={{ mb: 4, mt: 12, width: "60%" }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is
                <strong>
                  <i> #{id} </i>
                </strong>
                We have emailed your order confirmation, and will send you an
                update when your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/* {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}  */}

                <Button
                  variant="contained"
                  onClick={handleCheckoutCart}
                  sx={{
                    mt: 3,
                    ml: 1,

                    display: activeStep !== steps.length - 1 ? "none" : "block",
                  }}
                >
                  Place order
                  {/* {activeStep === steps.length - 1 ? "Place order" : "Next"} */}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
