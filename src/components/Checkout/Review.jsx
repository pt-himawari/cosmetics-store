import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  ListItem,
  List,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { cartSelector } from "../../redux-toolkit/selectors";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];

export default function Review() {
  const { cartDetails, cartInfo, customerInfo } = useSelector(cartSelector);

  const cardNumber = customerInfo.cardNumber;
  const maskedCardNumber = cardNumber
    .split("-")
    .map((part, index, array) =>
      index < array.length - 1 ? part.replace(/\d/g, "x") : part
    )
    .join("-");
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: customerInfo.cardName },
    { name: "Card number", detail: maskedCardNumber },
    { name: "Expiry date", detail: customerInfo.expDate },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Order summary
      </Typography>
      <List disablePadding>
        {cartDetails.map((cart) => (
          <ListItem key={cart.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={cart.name}
              secondary={cart.category}
              sx={{ textTransform: "capitalize" }}
            />
            <Typography variant="body2">{cart.amount}$</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipp" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cartInfo.shipping}$
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cartInfo.total}$
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{customerInfo.fullName}</Typography>
          <Typography gutterBottom>{customerInfo.address}</Typography>
          <Typography gutterBottom>{customerInfo.phone}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
