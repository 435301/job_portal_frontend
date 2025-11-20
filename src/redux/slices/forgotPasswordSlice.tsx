import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import { toast } from "react-toastify";

interface ForgotPasswordState {
  loading: boolean;
  status:string;
  message: string | null;
  error: string | null;
  otpVerified: boolean;
}

const initialState: ForgotPasswordState = {
  loading: false,
  status:"",
  message: null,
  error: null,
  otpVerified: false,
};

//Forgot Password
export const forgotPassword = createAsyncThunk(
  "admin/forgotPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL_JOB}/admin/forgotPassword`, {
        email,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

//  Verify OTP

export const verifyOtp = createAsyncThunk(
  "admin/verifyOtp",
  async (
    data: { email: string; otp: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL_JOB}/admin/verifyOtp`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  }
);

//  Reset Password

export const resetPassword = createAsyncThunk(
  "admin/resetPassword",
  async (
    data: { email: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`${BASE_URL_JOB}/admin/resetPassword`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Unable to reset password");
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------------- Forgot Password ----------------------
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        toast.success(action.payload.message)
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ---------------------- Verify OTP ----------------------
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.message = action.payload.message;
          toast.success(action.payload.message)
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ---------------------- Reset Password ----------------------
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
          toast.success(action.payload.message)
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
