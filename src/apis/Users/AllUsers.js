import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

// const api = "http://localhost:8000/admin/users";
const api = "http://192.168.1.2:8000/admin/users";
const cookies = new Cookies();
const initialState = {
  data: {},
  loading: false,
  error: null,
  status: null,
  state: "",
};

export const fetchallUsers = createAsyncThunk(
  "UsersData/fetchallUsers",
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

const UsersSlice = createSlice({
  name: "UsersData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchallUsers.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 401) {
        console.log("Error");
        state.status = 401;
        state.data = {};
        state.loading = false;
        state.error = action.payload.message;
      } else {
        state.data = action.payload;
        state.status = 200;
        state.loading = false;
      }
    });
    builder.addCase(fetchallUsers.rejected, (state, action) => {
      state.status = action.payload;
      state.state = "rejected";
      state.loading = false;
    });
    builder.addCase(fetchallUsers.pending, (state) => {
      state.state = "pending";
      state.loading = true;
    });
  },
});

export default UsersSlice.reducer;
