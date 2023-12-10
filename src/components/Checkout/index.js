import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  IconButton,
  DialogTitle,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { checkoutCartThunkAction } from "../../reducers/cartSlice";
import { cartSelector } from "../../redux-toolkit/selectors";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timer = React.useRef();
  const cart = useSelector(cartSelector);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const [activeStep, setActiveStep] = React.useState(0);
  const [id, setID] = React.useState("");
  console.log(cart);
  const handleCheckoutCart = () => {
    const shippingCost =
      Number(cart.cartInfo.subTotal) > 2000 ? 0 : cart.cartInfo.shipping;
    const fullAddress = `${cart.customerInfo.address}, ${cart.customerInfo.state}, ${cart.customerInfo.city}, ${cart.customerInfo.country}`;
    const newCustomerInfo = {
      fullAddress, // shorthand property
      cardName: cart.customerInfo.cardName,
      cardNumber: cart.customerInfo.cardNumber,
      cvv: cart.customerInfo.cvv,
      email: cart.customerInfo.email,
      expDate: cart.customerInfo.expDate,
      fullName: cart.customerInfo.fullName,
      phone: cart.customerInfo.phone,
    };
    const order = {
      orderId: shortid.generate(),
      orderInfo: {
        ...cart.cartInfo,
        shipping: shippingCost,
        orderDate: Math.floor(Date.now() / 1000),
      },
      orderDetails: [...cart.cartDetails],
      customerInfo: {
        ...newCustomerInfo,
      },
    };
    setID(order.orderId);
    if (!isLoading) {
      setIsLoading(true);
      dispatch(checkoutCartThunkAction(order));
      timer.current = window.setTimeout(() => {
        setIsCompleted(true);
        setIsLoading(false);
        window.setTimeout(() => {
          setOpen(false);
          setIsLoading(false);
          setIsCompleted(false);
          setActiveStep(activeStep + 1);
        }, 1000);
      }, 2000);
    }
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

  return (
    <React.Fragment>
      <Container
        // component="main"
        // maxWidth="sm"
        sx={{ mb: 4, mt: 12, width: "60%", minHeight: "90vh" }}
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
                {activeStep === 2 && (
                  <Button
                    onClick={() => {
                      setActiveStep(activeStep - 1);
                    }}
                    sx={{ mt: 3, ml: 1, color: "#ab4aba" }}
                  >
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(true);
                  }}
                  color="secondary"
                  sx={{
                    mt: 3,
                    ml: 1,
                    backgroundColor: "#ab4aba",
                    display: activeStep !== steps.length - 1 ? "none" : "block",
                  }}
                >
                  Place order
                  {/* {activeStep === steps.length - 1 ? "Place order" : "Next"} */}
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => {
                    setOpen(false);
                  }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogContent
                    sx={{
                      p: "10px",
                      pb: 0,
                    }}
                  >
                    {/* <CircularProgress color="success" /> */}
                    <DialogContentText
                      id="alert-dialog-slide-description"
                      sx={{
                        // width: "100%",
                        minWidth: "400px",
                        minHeight: "100px",
                      }}
                    >
                      {!isLoading && !isCompleted && (
                        <Typography
                          px={3}
                          pt={4}
                          variant="h6"
                          sx={{
                            color: "#121f43 !important",
                          }}
                        >
                          Are you sure you want to proceed with payment?
                        </Typography>
                      )}

                      <Box
                        sx={{
                          textAlign: "center",
                          py: isLoading || isCompleted ? 3 : 0,
                        }}
                      >
                        {isLoading && (
                          <CircularProgress color="success" size={60} />
                        )}
                        {isCompleted && (
                          <>
                            <Fab color="success">
                              <CheckIcon />
                            </Fab>
                            <p>Payment Successful!</p>
                          </>
                        )}
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      pt: 1,
                    }}
                  >
                    <Button
                      color="secondary"
                      type="button"
                      variant="contained"
                      sx={{
                        backgroundColor: "#8e8c99",
                        "&:hover": {
                          backgroundColor: "#8b8d98",
                          opacity: 0.8,
                          color: "white", // Màu văn bản khi hover
                        },
                      }}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="error"
                      type="button"
                      variant="contained"
                      sx={{
                        backgroundColor: "#E64D4C",
                        "&:hover": {
                          backgroundColor: "#CC4343",
                          opacity: 0.8,
                          color: "white", // Màu văn bản khi hover
                        },
                      }}
                      onClick={handleCheckoutCart}
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
