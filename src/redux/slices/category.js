import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { ENP_KIND, ENP_PRODUCT } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";

export const categoryAdapter = createEntityAdapter({
  selectId: (category) => category.name,
});
const initialState = categoryAdapter.getInitialState();

// First, create the thunk
export const getAllCategories = createAsyncThunk("category/all", async () => {
  const response = await axios.get(ENP_KIND);
  return response.data;
});
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    deleteWithId: (state, action) => {
      const categoryId = action.payload;
      //   state.products = state.products.filter((i) => i.id !== productsId);
      //   return [];
      console.log("tigger me", categoryId);
      categoryAdapter.removeOne(state, categoryId);
    },
    // deleteProductOfCategory: (state, action) => {
    //   const { categoryId, productId } = action.payload;
    //   // const category = state.entities.filter((c) => c.id === categoryId);
    //   // const category = categoryAdapter
    //   //   .getSelectors()
    //   //   .selectById(state, categoryId);
    //   // console.log("mc", category);
    //   // category.products = category.products.filter((p) => p.id !== productId);

    //   // categoryAdapter.upsertOne(state, category);

    //   console.log(JSON.parse(state.entities));
    // },
    categoryUpdated: categoryAdapter.updateOne,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      categoryAdapter.upsertMany(state, action.payload);
    });
  },
});
// Action creators are generated for each case reducer function
export const { set, get, deleteWithId, categoryUpdated } =
  categorySlice.actions;
export const {
  selectById: selectCategoryById,
  selectAll: selectAllCategories,
} = categoryAdapter.getSelectors((state) => state.categories);

export default categorySlice.reducer;
