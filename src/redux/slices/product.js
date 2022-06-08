import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { ENP_PRODUCT } from "api/EndPoint";
import { useAxios } from "hooks/useAxios";
import { axios } from "lib/axios/Interceptor";

export const productAdapter = createEntityAdapter({
  selectId: (p) => p.name,
});
const initialState = productAdapter.getInitialState();

// First, create the thunk
export const getAllProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(ENP_PRODUCT, {
      params: {
        pageSize: 100,
      },
    });
    return response.data;
  }
);

export const getProductWithName = createAsyncThunk(
  "products/search",
  async (searchTerm, { getState, dispatch }) => {
    const url = ENP_PRODUCT + "/search?keyword=" + searchTerm;
    const response = await axios.get(url, {
      params: {
        pageSize: 100,
      },
    });
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteWithId: (state, action) => {
      const productId = action.payload;
      //   state.products = state.products.filter((i) => i.id !== productsId);
      //   return [];
      console.log("tigger me", productId);
      productAdapter.removeOne(state, productId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      productAdapter.upsertMany(state, action.payload.content);
    });
    builder.addCase(getProductWithName.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload.content);
    });
  },
});
// Action creators are generated for each case reducer function
export const { set, get, deleteWithId } = productSlice.actions;
export const { selectById: selectProductById, selectAll: selectAllProducts } =
  productAdapter.getSelectors((state) => state.products);

export default productSlice.reducer;
