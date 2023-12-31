import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    searchText: "",
    category: "All",
    type: "All",
    price: "0,0",
    brand: "All",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchCategory: (state, action) => {
      state.category = action.payload;
      // state.type = "All";
    },
    setSearchType: (state, action) => {
      state.type = action.payload;
      state.category = "All";
    },
    setSearchPrice: (state, action) => {
      state.price = action.payload;
    },
    setSearchBrand: (state, action) => {
      state.brand = action.payload;
    },
  },
});

export default filtersSlice;
