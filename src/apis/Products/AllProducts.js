import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const initialState = {
  data: {},
  loading: false,
  status: null,
  error: null,
  state: "",
};
// const api = "http://localhost:8000/main/products"
const api = "http://192.168.1.2:8000/main/products";
export const fetchAllProducts = createAsyncThunk(
  "ProductsData/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(api, {
        headers: { authorization: `Bearer ${cookies.get("token")}` },
      });
      return response.data;
    } catch (err) {
      return err.response;
    }
  }
);

const ProductsSlice = createSlice({
  name: "ProductsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 401) {
        state.error = action.payload;
        state.data = {};
        state.status = 401;
        state.loading = false;
      } else {
        state.data = action.payload;
        state.status = 200;
        state.error = null;
        state.loading = false;
      }
    });
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.state = "pending";
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload;
      state.state = "rejected";
    });
  },
});

export default ProductsSlice.reducer;
