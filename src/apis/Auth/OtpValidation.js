import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const initialState = {
  data: {},
  loading: false,
  state: "",
  status: null,
  error: "",
};

const cookies = new Cookies();

// const api = "http://localhost:8000/main/user/reset_password"
const api = "http://192.168.1.2:8000/main/user/reset_password";

export const AdminOTP = createAsyncThunk("OTPSlice/AdminOTP", async (arg) => {
  try {
    const response = await axios.post(api, {
      email: cookies.get("email"),
      OTP: arg.Otp,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
});

const OtpSlice = createSlice({
  name: "OTPSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AdminOTP.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 403) {
        state.loading = false;
        state.data = {};
        state.state = "Success But With Errors";
        state.error = action.payload.message;
        state.status = action.payload.status;
      } else if (action.payload.status === 200) {
        state.data = action.payload.data;
        state.loading = false;
        state.state = "Success";
        state.error = "";
        state.status = action.payload.status;
      } else {
        state.data = {};
        state.loading = false;
        state.error = action.payload.message;
        state.status = action.payload.status;
        state.state = "Error";
      }
    });
    builder.addCase(AdminOTP.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload.message;
      state.status = action.payload.status;
      state.state = "Rejected";
    });
    builder.addCase(AdminOTP.pending, (state) => {
      state.loading = true;
      state.data = {};
      state.error = "";
      state.status = null;
      state.state = "Pending";
    });
  },
});

export default OtpSlice.reducer;