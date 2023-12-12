import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cosmeticSlice = createSlice({
  name: "cosmeticsList",
  initialState: {
    status: "idle",
    cosmetics: [],
    cosmeticsPagination: {
      data: [],
      totalPages: 0,
      currentPage: 1,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        removeMultipleCosmeticsThunkAction.fulfilled,
        (state, action) => {
          state.status = "idle";
          // Xoá các sản phẩm có ID nằm trong danh sách action.payload khỏi trạng thái Redux
          state.cosmetics = state.cosmetics.filter(
            (p) => !action.payload.includes(p.id)
          );
        }
      )
      .addCase(editCosmeticsThunkAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.cosmetics = state.cosmetics.map((p) => {
          if (p.id === action.payload?.id) {
            return action.payload;
          }
          return p;
        });
      })
      .addCase(addNewCosmeticsThunkAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.cosmetics.unshift(action.payload);
      })
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

export const addNewCosmeticsThunkAction = createAsyncThunk(
  "cosmetics/addNewCosmeticsThunkAction",
  async (data) => {
    let addNewRes = await fetch(
      "https://json-server-psi-three.vercel.app/cosmeticsList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let result = await addNewRes.json();
    return result;
  }
);
export const editCosmeticsThunkAction = createAsyncThunk(
  "cosmetics/editCosmeticsThunkAction",
  async (data) => {
    let addProductRes = await fetch(
      `https://json-server-psi-three.vercel.app/cosmeticsList/${data?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let result = await addProductRes.json();
    return result;
  }
);

export const removeMultipleCosmeticsThunkAction = createAsyncThunk(
  "cosmetics/removeMultipleCosmeticsThunkAction",
  async (ids) => {
    // ids là một mảng chứa danh sách các ID sản phẩm cần xoá
    for (const id of ids) {
      await fetch(
        `https://json-server-psi-three.vercel.app/cosmeticsList/${id}`,
        {
          method: "DELETE",
        }
      );
    }
    return ids; // Trả về danh sách các ID đã xoá thành công
  }
);

export default cosmeticSlice;

// export const fetchProductPaginationThunkAction = createAsyncThunk(
//   "cosmetics/fetchProductPagination",
//   async ({ page, limit }) => {
//     const response = await fetch(
//       `https://json-server-psi-three.vercel.app/cosmeticsList?_page=${page}&_limit=${limit}`
//     );
//     const data = await response.json();
//     const totalRecords = response.headers.get("X-Total-Count");
//     const totalPages = Math.ceil(totalRecords / limit);

//     return { data, totalPages, page };
//   }
// );
