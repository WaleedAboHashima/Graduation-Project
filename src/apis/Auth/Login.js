import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const api = "http://localhost:8000/main/user/login";
const api = "http://192.168.1.2:8000/main/user/login";

const initialState = {
  data: {},
  state: "",
  error: null,
  status: null,
  loading: false,
};

export const AdminLogin = createAsyncThunk(
  "LoginData/AdminLogin",
  async (arg) => {
    try {
      const response = await axios.post(api, {
        email: arg.email,
        password: arg.password,
        phone: arg.phone,
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  }
);

const LoginSlice = createSlice({
  name: "LoginData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AdminLogin.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload === 403) {
        state.data = {};
        state.loading = false;
        state.status = 401;
        state.state = "Success But With Errors";
        state.error = 401;
      } else {
        state.data = action.payload;
        state.loading = false;
        state.state = "Success";
        state.error = "";
        state.status = 200;
      }
    });
    builder.addCase(AdminLogin.pending, (state) => {
      state.loading = true;
      state.data = {};
      state.state = "Pending";
      state.status = null;
      state.error = null;
    });
    builder.addCase(AdminLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.state = "Rejected";
      state.data = {};
      state.status = 500;
      state.loading = false;
    });
  },
});

export default LoginSlice.reducer;