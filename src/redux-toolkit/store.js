import { configureStore } from "@reduxjs/toolkit";
import cosmeticSlice from "../reducers/cosmeticSlice";
import filtersSlice from "../reducers/filtersSlice";

const store = configureStore({
  reducer: {
    cosmeticsList: cosmeticSlice.reducer,
    filters: filtersSlice.reducer,
  },
});

export default store;
