import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cosmeticSlice = createSlice({
  name: "cosmeticsList",
  initialState: {
    status: "idle",
    cosmetics: [],
  },
  reducers: {
    // fetchCosmetics: (state, action) => {
    //   state = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCosmeticsThunkAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCosmeticsThunkAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.cosmetics = action.payload;
      });
  },
});

export const fetchCosmeticsThunkAction = createAsyncThunk(
  "thunkActionCosmeticsList/fetchCosmetics",
  async () => {
    let cosmeticsRes = await fetch(
      "https://json-server-psi-three.vercel.app/cosmeticsList"
    );
    let data = await cosmeticsRes.json();
    return data;
  }
);
export default cosmeticSlice;
