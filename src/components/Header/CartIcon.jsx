import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux-toolkit/selectors";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Cart = () => {
  const [cartMenuAnchor, setCartMenuAnchor] = useState("");
  const { cartDetails } = useSelector(cartSelector);
  const totalQuantity = cartDetails.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  return (
    <Box>
      <Tooltip>
        {/* icon cart */}
        <IconButton
          aria-label="cart"
          component={Link}
          to={"/cartPage"}
          onClick={(event) => {
            setCartMenuAnchor(event.currentTarget);
          }}
        >
          <StyledBadge badgeContent={totalQuantity} color="error">
            <ShoppingCartOutlinedIcon color="error" />
            {/* <ShoppingCartIcon /> */}
          </StyledBadge>
        </IconButton>
        {/*  */}
        <Menu
          sx={{ mt: "45px" }}
          id="menu-cartItem"
          anchorEl={cartMenuAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(cartMenuAnchor)}
          onClose={() => setCartMenuAnchor(null)}
        >
          <MenuItem>
            <Typography textAlign="center">Cart item 1</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">Cart item 2</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">Cart item 3</Typography>
          </MenuItem>
        </Menu>
      </Tooltip>
    </Box>
  );
};
export default Cart;
