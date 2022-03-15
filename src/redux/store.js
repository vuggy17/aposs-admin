import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category";
import productsReducer from "./slices/product";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
  },
});
