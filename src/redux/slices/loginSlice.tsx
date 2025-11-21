import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL_JOB from "../../config/config";

export interface LoginData {
  id: number;
  email: string;
  lastLogin: string;
  lastLoginIp: string | null;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  data: LoginData;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginState {
  loading: boolean;
  employeeToken: string | null;
  data: LoginData | null;
  message: string;
  error: string;
}

const initialState: LoginState = {
  loading: false,
  employeeToken: null,
  data: null,
  message: "",
  error: "",
};

export const employeeLogin = createAsyncThunk<
  LoginResponse,    
  LoginPayload, { rejectValue: any }
   >(
  "employee/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_JOB}/employees/login`, {
        email,
        password,
      });
            //  Save token and admin details to localStorage
      localStorage.setItem("employeeToken", response.data.token);
      localStorage.setItem("employee", JSON.stringify(response.data.data));
      return response.data;
      
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

const loginSlice = createSlice({
  name: "employeeLogin",
  initialState,
  reducers: {
    logout: (state) => {
      state.employeeToken = null;
      state.data = null;
      localStorage.removeItem("employeeToken");
      toast.info("Logged out!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(employeeLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.message = "";
      })
      .addCase(employeeLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.employeeToken = action.payload.token;
        state.data = action.payload.data;

        // save token
        localStorage.setItem("token", action.payload.token);
        toast.success( state.message)
      })
      .addCase(employeeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ;
        toast.error(state.error);
      });
  },
});

// Export reducer + actions
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
