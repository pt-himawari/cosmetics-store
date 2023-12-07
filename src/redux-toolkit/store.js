import { configureStore } from "@reduxjs/toolkit";
import cosmeticSlice from "../reducers/cosmeticSlice";
import filtersSlice from "../reducers/filtersSlice";
import cartSlice from "../reducers/cartSlice";
import orderSlice from "../reducers/orderSlice";

const store = configureStore({
  reducer: {
    cosmeticsList: cosmeticSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
