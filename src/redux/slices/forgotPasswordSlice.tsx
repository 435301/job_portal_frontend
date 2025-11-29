import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import { toast } from "react-toastify";
import getAuthAdminHeaders from "../../utils/auth";

interface ForgotPasswordState {
  loading: boolean;
  status: string;
  message: string | null;
  error: string | null;
  otpVerified: boolean;
}

const initialState: ForgotPasswordState = {
  loading: false,
  status: "",
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
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
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
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
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
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Unable to reset password");
    }
  }
);

export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async (
    data: { oldPassword: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`${BASE_URL_JOB}/admin/changePassword`, data, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Unable to change password");
    }
  }
);

//Forgot Password
export const forgotPasswordEmployee = createAsyncThunk(
  "employees/forgotPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL_JOB}/employees/forgotPassword`, {
        email,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

//  Verify OTP

export const verifyOtpEmployee = createAsyncThunk(
  "employees/verifyOtp",
  async (
    data: { email: string; otp: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL_JOB}/employees/verifyOtp`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  }
);

//  Reset Password

export const resetPasswordEmployee = createAsyncThunk(
  "employees/resetPassword",
  async (
    data: { email: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`${BASE_URL_JOB}/employees/resetPassword`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Unable to reset password");
    }
  }
);

export const changePasswordEmployee = createAsyncThunk(
  "employees/changePassword",
  async (
    data: { oldPassword: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`${BASE_URL_JOB}/employees/changePassword`, data, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Unable to change password");
    }
  }
);

//Forgot Password
export const forgotPasswordEmployer = createAsyncThunk(
  "employer/forgotPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL_JOB}/employer/forgotPassword`, {
        email,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

//  Verify OTP

export const verifyOtpEmployer = createAsyncThunk(
  "employer/verifyOtp",
  async (
    data: { email: string; otp: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL_JOB}/employer/verifyOtp`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  }
);

//  Reset Password

export const resetPasswordEmployer = createAsyncThunk(
  "employer/resetPassword",
  async (
    data: { email: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`${BASE_URL_JOB}/employer/resetPassword`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Unable to reset password");
    }
  }
);

export const changePasswordEmployer = createAsyncThunk(
  "employer/changePassword",
  async (
    data: { oldPassword: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`${BASE_URL_JOB}/employer/changePassword`, data, getAuthAdminHeaders(false));
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response?.data?.message || "Unable to change password");
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
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(forgotPasswordEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPasswordEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ---------------------- Verify OTP ----------------------
      .addCase(verifyOtpEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.message = action.payload.message;
      })
      .addCase(verifyOtpEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ---------------------- Reset Password ----------------------
      .addCase(resetPasswordEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPasswordEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(forgotPasswordEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPasswordEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ---------------------- Verify OTP ----------------------
      .addCase(verifyOtpEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.message = action.payload.message;
      })
      .addCase(verifyOtpEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ---------------------- Reset Password ----------------------
      .addCase(resetPasswordEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPasswordEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
