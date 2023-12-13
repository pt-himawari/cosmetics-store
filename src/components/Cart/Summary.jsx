import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatterCurrency from "../common/formatterCurrency";
import { cartSelector } from "../../redux-toolkit/selectors";

const Summary = () => {
  const { cartInfo } = useSelector(cartSelector);

  return (
    <Grid item xs={12} md={3}>
      <Box
        py={6}
        px={3}
        sx={{
          height: "auto",
          boxShadow: 3,
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#CC4343",
          }}
          pb={6}
        >
          Summary
        </Typography>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography
            align="left"
            sx={{
              fontSize: "13px",
              color: "#f57273c4",
            }}
          >
            Subtotal<small>*</small>
          </Typography>
          <Typography
            align="left"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#CC4343",
            }}
          >
            {formatterCurrency(cartInfo.subTotal)}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Typography
            align="left"
            sx={{
              fontSize: "13px",
              color: "#f57273c4",
            }}
          >
            Shipping Est.
          </Typography>
          <Typography
            align="left"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#CC4343",
            }}
          >
            {Number(cartInfo.subTotal) > Number(500)
              ? formatterCurrency(0)
              : formatterCurrency(5)}
          </Typography>
        </Stack>
        <Divider />
        <TextField
          mt={3}
          color="error"
          id="standard-basic"
          label="Enter gift code"
          variant="standard"
          fullWidth
          sx={{
            my: 5,
          }}
          InputLabelProps={{
            style: { color: "#f57273c4" }, // Thay đổi màu nhãn ở đây
          }}
        />
        <Divider />
        <Stack direction="row" justifyContent="space-between" my={4}>
          <Typography
            align="left"
            sx={{
              fontSize: "13px",
              color: "#f57273c4",
            }}
          >
            TOTAL PRICE
          </Typography>
          <Typography
            align="left"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#CC4343",
            }}
          >
            {formatterCurrency(cartInfo.total)}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          component={Link}
          to="/checkout"
          //  color="error"
          fullWidth
          sx={{
            backgroundColor: "#CC4343", // Màu nền mới
            color: "white", // Màu chữ
            "&:hover": {
              backgroundColor: "#662222", // Màu nền khi hover
            },
          }}
        >
          CHECKOUT
        </Button>
      </Box>
    </Grid>
  );
};

export default Summary;
