import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { ENP_PRODUCT } from "api/EndPoint";
import { useAxios } from "hooks/useAxios";
import { axios } from "lib/axios/Interceptor";

export const productAdapter = createEntityAdapter();
const initialState = productAdapter.getInitialState();

// First, create the thunk
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(ENP_PRODUCT);
    return response.data;
  }
);
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    set: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   state.product += 1;
    },
    deleteWithId: (state, action) => {
      const productId = action.payload;
      //   state.products = state.products.filter((i) => i.id !== productsId);
      //   return [];
      console.log("tigger me", productId);
      productAdapter.removeOne(state, productId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      //   console.log(action.payload);
      productAdapter.upsertMany(state, action.payload.content);
    });
  },
});
// Action creators are generated for each case reducer function
export const { set, get, deleteWithId } = productSlice.actions;
export const { selectById: selectProductById, selectAll: selectAllProducts } =
  productAdapter.getSelectors((state) => state.products);

export default productSlice.reducer;
