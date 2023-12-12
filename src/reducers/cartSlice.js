import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartInfo: {
      subTotal: 0,
      shipping: 5,
      total: 0,
      status: "PENDING",
    },
    cartDetails: [],
    customerInfo: {},
  },
  reducers: {
    addCart: (state, action) => {
      let cartItem = state.cartDetails?.find(
        (item) => item.id === action?.payload?.id
      );

      if (cartItem?.id) {
        const quantityToAdd =
          action?.payload?.quantityCart > 1 ? action.payload.quantityCart : 1;

        cartItem.quantity += quantityToAdd;
        cartItem.amount = cartItem.quantity * cartItem.currentPrice;
      } else {
        const quantityToAdd =
          action?.payload?.quantityCart > 1 ? action.payload.quantityCart : 1;
        state.cartDetails.push({
          ...action.payload,
          quantity: quantityToAdd,
          amount: action.payload.currentPrice * quantityToAdd,
        });
      }

      state.cartInfo.subTotal = state.cartDetails.reduce(
        (total, item) => total + item.currentPrice * item.quantity,
        0
      );
      state.cartInfo.total = state.cartInfo.subTotal + state.cartInfo.shipping;
    },

    incrementQuantity: (state, action) => {
      let cartItem = state.cartDetails?.find(
        (item) => item.id === action?.payload?.id
      );
      cartItem.quantity = Number(cartItem.quantity) + 1;
      cartItem.amount = Number(cartItem.quantity * cartItem.currentPrice);
      let newSubTotal = state.cartDetails.reduce(
        (preValue, curValue) =>
          preValue + curValue.currentPrice * curValue.quantity,
        0
      );
      state.cartInfo.subTotal = newSubTotal;
      state.cartInfo.total = newSubTotal + state.cartInfo.shipping;
    },
    decrementQuantity: (state, action) => {
      let cartItem = state.cartDetails?.find(
        (item) => item.id === action?.payload?.id
      );
      if (cartItem.quantity > 1) {
        cartItem.quantity = Number(cartItem.quantity) - 1;
        cartItem.amount = Number(cartItem.quantity * cartItem.currentPrice);
        let newSubTotal = state.cartDetails.reduce(
          (preValue, curValue) =>
            preValue + curValue.currentPrice * curValue.quantity,
          0
        );
        state.cartInfo.subTotal = newSubTotal;
        state.cartInfo.total = newSubTotal + state.cartInfo.shipping;
      }
    },
    removeCartItem: (state, action) => {
      state.cartDetails = state.cartDetails.filter(
        (item) => item.id !== action.payload.id
      );
      let newSubTotal = state.cartDetails.reduce(
        (preValue, curValue) =>
          preValue + curValue.currentPrice * curValue.quantity,
        0
      );
      state.cartInfo.subTotal = newSubTotal;
      state.cartInfo.total = newSubTotal + state.cartInfo.shipping;
    },

    saveCustomer: (state, action) => {
      state.customerInfo = {
        ...state.customerInfo,
        ...action.payload,
      };
    },
    checkoutCart: (state, action) => {
      state.cartDetails = [];
      state.cartInfo = {
        subTotal: 0,
        shipping: 0,
        total: 0,
        status: "PENDING",
      };
      state.customerInfo = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkoutCartThunkAction.pending, (state, action) => {})
      .addCase(checkoutCartThunkAction.fulfilled, (state, action) => {
        state.cartInfo = {
          subTotal: 0,
          shipping: 0,
          total: 0,
          status: "PENDING",
        };
        state.cartDetails = [];
        state.customerInfo = {};
      });
  },
});

export const checkoutCartThunkAction = createAsyncThunk(
  "cart/checkoutThunkAction",
  async (data) => {
    let orderRes = await fetch(
      "https://json-server-psi-three.vercel.app/orderList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let result = await orderRes.json();
    return result;
  }
);
export default cartSlice;
