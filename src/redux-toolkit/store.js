import cartSlice from "../reducers/cartSlice";
import orderSlice from "../reducers/orderSlice";
import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../reducers/filtersSlice";
import cosmeticSlice from "../reducers/cosmeticSlice";

const store = configureStore({
  reducer: {
    cosmeticsList: cosmeticSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
