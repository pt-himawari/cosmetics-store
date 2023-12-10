// import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    status: "idle",
    orderList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderListThunkAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrderListThunkAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderList = action.payload;
      });
  },
});
export const fetchOrderListThunkAction = createAsyncThunk(
  "fetchOrderListThunkAction",
  async () => {
    let orderListResponse = await fetch(
      "https://json-server-psi-three.vercel.app/orderList"
    );
    let data = orderListResponse.json();
    return data;
  }
);
export default orderSlice;
