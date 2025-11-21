import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";

interface EmployeeProfileState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: EmployeeProfileState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchEmployeeProfile = createAsyncThunk(
  "employees/profile",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL_JOB}/employees/profile/${employeeId}`
      );
      return response.data; // {status, message, data}
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee profile"
      );
    }
  }
);


const employeeProfileSlice = createSlice({
  name: "employeeProfile",
  initialState,
  reducers: {
    clearEmployeeProfile(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; 
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployeeProfile } = employeeProfileSlice.actions;

export default employeeProfileSlice.reducer;
