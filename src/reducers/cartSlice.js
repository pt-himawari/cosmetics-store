import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartInfo: {
      subTotal: 0,
      shipping: 20,
      total: 0,
      status: "draft",
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
        cartItem.quantity = Number(cartItem.quantity) + 1;
        cartItem.amount = Number(cartItem.quantity * cartItem.currentPrice);
        // state.cartInfo.total =
      } else {
        state.cartDetails.push({
          ...action.payload,
          quantity: 1,
          amount: action?.payload?.currentPrice,
        });
      }

      let newSubTotal = state.cartDetails.reduce(
        (preValue, curValue) =>
          preValue + curValue.currentPrice * curValue.quantity,
        0
      );
      state.cartInfo.subTotal = newSubTotal;
      state.cartInfo.total = newSubTotal + state.cartInfo.shipping;
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
        status: "draft",
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
          status: "draft",
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
