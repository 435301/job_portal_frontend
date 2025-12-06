import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";


//  Async thunk for login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/admin/login`, credentials);
      const data = response.data;

      if (!data.status) {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }

      //  Save token and admin details to localStorage
      localStorage.setItem("adminToken", data.data.token);
      localStorage.setItem("admin", JSON.stringify(data.data));

      toast.success(data.message);
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    token: localStorage.getItem("adminToken") || null,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("employee");
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("employer");
      localStorage.removeItem("employerToken");
      toast.info("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.token = action.payload.token;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
