import store from "../../app/store";

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { QuotationProps } from "../../pages/colection/Colection.component";

import productsAPI from "./productsApi";
import type { RootState } from "../../app/store";
import { names } from "../../components/category-filter/CategoryFilter.component";

export const fetchProducts = createAsyncThunk("users/fetchAll", async () => {
  const response = await productsAPI.fetchAll();
  return response;
});

interface ProductsState {
  products: QuotationProps[];
  filteredProducts: QuotationProps[];
  isLoading: boolean;
  filterBy: Filters;
}
interface Filters {
  byRating: number;
  byCategory: Array<string>;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  isLoading: true,
  filterBy: {
    byRating: 0,
    byCategory: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortProducts: (state, action) => {
      state.filteredProducts.sort((a, b) => {
        if (+action.payload === 1) {
          return a.price - b.price;
        }
        if (+action.payload === 2) {
          return b.price - a.price;
        }
        if (+action.payload === 3) {
          return a.rating.rate - b.rating.rate;
        }
        if (+action.payload === 4) {
          return a.rating.count - b.rating.count;
        }
        return 0;
      });
    },
    filter: (state, action) => {
      console.log("action ", action.payload);

      const categories = action.payload.byCategory.length
        ? action.payload.filters.byCategory
        : names;
      const ratings = action.payload.byRating;

      state.filteredProducts = state.products.filter((el: any) => {
        return el.rating.rate >= ratings && categories.includes(el.category);
      });
    },

    filterBy: (state, action) => {
      state.filterBy.byRating = action.payload.byRating;
      state.filterBy.byCategory = action.payload.byCategory;

      const categories = action.payload.byCategory.length
        ? action.payload.byCategory
        : names;
      const ratings = action.payload.byRating;

      state.filteredProducts = state.products.filter((el: any) => {
        return el.rating.rate >= ratings && categories.includes(el.category);
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setSortProducts, filter, filterBy } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const filteredProducts = (state: RootState) =>
  state.products.filteredProducts;
export const loading = (state: RootState) => state.products.isLoading;
export const filterBySelector = (state: RootState) => state.products.filterBy;
export default productsSlice.reducer;
